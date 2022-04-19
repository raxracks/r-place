import { Injectable } from '@nestjs/common';
import data from 'src/utils/utils';

@Injectable()
export class ReadService {
  getBoard() {
    // console.log(data.jsonify_fast());
    return data.jsonify_fast();
  }

  getPixel(x, y) {
    return data.get(`${x}|${y}`);
  }

  getUser(x, y) {
    return this.getPixel(x, y).user;
  }
}