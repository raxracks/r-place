import { Injectable } from '@nestjs/common';
import { data, cache } from 'src/utils/utils';

data.format();

data.append_ignorant('a', { a: 'a' });

for (let y = 0; y < 1000; y++) {
  for (let x = 0; x < 1000; x++) {
    data.append_ignorant(`${x}|${y}`, {
      color: 'ffffff',
    });
  }
}

data.commit();

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
