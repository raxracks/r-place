import { Injectable } from '@nestjs/common';
import { DB } from 'database/VersatileDB';
import { join } from 'path';

const data = new DB(join(__dirname, '..', '..', 'database', 'pixels.db'), {
  schema: join(__dirname, '..', '..', 'database', 'schema.json'),
  autoinsert: true,
}).read();

// data.format();

// data.append_ignorant('a', { a: 'a' });

// for (let y = 0; y < 500; y++) {
//   for (let x = 0; x < 500; x++) {
//     data.append_ignorant(`${x}|${y}`, {
//       color: 'ffffff',
//     });
//   }
// }

// data.commit();

@Injectable()
export class WriteService {
  setPixel(x, y, color, user) {
    data.read();
    data.create_and_commit('pixel', {
      pos: `${x}|${y}`,
      color,
      user,
    });
  }
}
