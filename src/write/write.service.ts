import { Injectable } from '@nestjs/common';
import { data, cache } from 'src/utils/utils';

setInterval(() => {
  setTimeout(() => {
    data.commit();
  });
}, 2000);

setInterval(() => {
  setTimeout(() => {
    cache();
  });
}, 4000);

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
