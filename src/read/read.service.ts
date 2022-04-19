import { Injectable } from '@nestjs/common';
import data from 'src/utils/utils';

@Injectable()
export class ReadService {
  getBoard() {
    return data.jsonify();
  }

  getPixel(x, y) {
    return data.get(`${x}|${y}`);
  }

  getUser(x, y) {
    return this.getPixel(x, y).user;
  }
}
