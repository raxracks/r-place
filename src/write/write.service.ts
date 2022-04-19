import { Injectable } from '@nestjs/common';
import data from 'src/utils/utils';

setInterval(() => {
  setTimeout(() => {
    data.commit();
  });
}, 10000);

@Injectable()
export class WriteService {
  setPixel(x, y, color, user) {
    data.create('pixel', {
      pos: `${x}|${y}`,
      color,
      user,
    });
  }
}
