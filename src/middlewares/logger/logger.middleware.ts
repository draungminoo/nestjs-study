import { Injectable, NestMiddleware } from '@nestjs/common';
import { differenceInMilliseconds, format } from 'date-fns';
import { Request, Response } from 'express';
import { Collection } from 'mongodb';
import { MongodbService } from 'src/services/individual/mongodb/mongodb.service';
import { v7 as uuidv7 } from 'uuid';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logCollection!: Collection;

  constructor(private mongodbService: MongodbService) {
    this.connectToLogCollection();
  }

  async connectToLogCollection() {
    const client = await this.mongodbService.connect();
    const db = client.db('phhplatform');
    this.logCollection = db.collection('phhplatform-log');
  }

  use(req: Request, res: Response, next: () => void) {
    const startTime = new Date();
    const id = uuidv7();

    // Incoming request log
    console.log(
      `[REQUEST] METHOD:${req.method} ID: ${id} IP: ${req.ip} TIME: ${format(startTime, 'yyyy-MM-dd_HH:mm:ss')} URL: ${req.path}`,
    );
    this.logCollection.insertOne({
      operation: 'REQUEST',
      method: req.method,
      id: id,
      ip: req.ip,
      reqTime: startTime,
      url: req.url,
      user: req.user,
      headers: req.headers,
      origin: req.headers.origin,
    });

    // wrap method
    const wrapMethod = (method: any) => {
      const logCollection = this.logCollection;

      return function (this: Response, ...args: any[]) {
        const newRes = method.bind(this)(...args);

        const responseTime = new Date();

        // response log
        console.log(
          `[RESPONSE] METHOD:${method.name} ID: ${id} IP: ${req.ip} REQ_TIME: ${format(startTime, 'yyyy-MM-dd_HH:mm:ss')} RES_TIME:${format(responseTime, 'yyyy-MM-dd_HH:mm:ss')} DURATION: ${differenceInMilliseconds(responseTime, startTime)}ms STATUS:${this.statusCode}  URL: ${req.path}`,
        );
        logCollection.insertOne({
          operation: 'RESPONSE',
          method: method.name,
          id: id,
          ip: req.ip,
          reqTime: startTime,
          resTime: responseTime,
          resStatus: this.statusCode,
          resMessage: this.statusMessage,
          resDuration: differenceInMilliseconds(responseTime, startTime),
          url: req.url,
          user: req.user,
          headers: req.headers,
          origin: req.headers.origin,
        });

        return newRes;
      };
    };

    // Response
    res.json = wrapMethod(res.json);
    res.send = wrapMethod(res.send);
    res.sendFile = wrapMethod(res.sendFile);
    res.redirect = wrapMethod(res.redirect);
    res.download = wrapMethod(res.download);
    res.end = wrapMethod(res.end);

    next();
  }
}

// send
// sendFile
// json
// redirect
// download
// end
