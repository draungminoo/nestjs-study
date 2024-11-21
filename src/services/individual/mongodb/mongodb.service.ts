import { Injectable } from '@nestjs/common';
import { MongoClient } from 'mongodb';

@Injectable()
export class MongodbService {
  private url = 'mongodb://localhost:27017';

  constructor() {}

  async connect() {
    const mongodbClient = new MongoClient(this.url);
    await mongodbClient.connect();
    return mongodbClient;
  }
}
