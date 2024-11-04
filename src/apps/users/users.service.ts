import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';

// get users from db
const users = [
  {
    id: 1,
    name: 'Aung Min Oo',
    username: 'aungminoo',
    password: 'Amo@121',
  },
  {
    id: 2,
    name: 'Aung Min Oo 2',
    username: 'aungminoo2',
    password: 'Amo@122',
  },
  {
    id: 3,
    name: 'Aung Min Oo 3',
    username: 'aungminoo3',
    password: 'Amo@123',
  },
  {
    id: 4,
    name: 'Aung Min Oo 4',
    username: 'aungminoo4',
    password: 'Amo@124',
  },
];

@Injectable()
export class UsersService {
  getUsers() {
    return users;
  }

  findUserByUsername(username: string) {
    return new Promise<any>((res, rej) => {
      try {
        let result: any = null;

        for (let i = 0; i < users.length; i++) {
          const user = users[i];
          if (user.username == username) {
            result = user;
            break;
          }
        }

        res(result);
      } catch (error) {
        rej(error);
      }
    });
  }

  findUserById(id: number) {
    let result: any = null;

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.id === id) {
        result = user;
        break;
      }
    }

    return result;
  }

  async signinUser(username: string, password: string) {
    const user = await this.findUserByUsername(username);

    const message = 'Incorrect username or password';

    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException(message);
    }

    if (user.password !== password) {
      console.log('Incorrect password');
      throw new UnauthorizedException(message);
    }

    return user;
  }

  async updateRecord(name: string, username: string) {
    const user = await this.findUserByUsername(username);
    console.log(user);
    user.name = name;
    return user;
  }
}
