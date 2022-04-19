import { Injectable } from '@nestjs/common';
import data from 'src/utils/utils';

data.format();

data.append_ignorant('a', { a: 'a' });

for (let y = 0; y < 500; y++) {
  for (let x = 0; x < 500; x++) {
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
}, 1000);

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
