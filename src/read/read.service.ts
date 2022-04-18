import { Injectable } from '@nestjs/common';
import { DB } from 'database/VersatileDB';
import { join } from 'path';

const data = new DB(join(__dirname, '..', '..', 'database', 'packages.db'), {
  schema: join(__dirname, '..', '..', 'database', 'schema.json'),
  autoinsert: false,
}).read();

@Injectable()
export class ReadService {
  getBoard() {
    return data.read_and_jsonify();
  }

  getPixel(x, y) {
    return data.read_and_get(`${x}|${y}`);
  }

  getUser(x, y) {
    return this.getPixel(x, y).user;
  }
}
