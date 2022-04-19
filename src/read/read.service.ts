import { Injectable } from '@nestjs/common';
import { data, json, cache } from 'src/utils/utils';

@Injectable()
export class ReadService {
  getBoard() {
    setTimeout(() => {
      cache();
    });

    return json;
  }

  getPixel(x, y) {
    return data.get(`${x}|${y}`);
  }

  getUser(x, y) {
    return this.getPixel(x, y).user;
  }
}
