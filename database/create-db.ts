import { DB } from './VersatileDB';
import { join } from 'path';

const database = new DB(join(__dirname, 'pixels.db'), {
  schema: join(__dirname, 'schema.json'),
  autoinsert: true,
});

database.format();
database.read();

database.append_ignorant('a', { a: 'a' });

for (let y = 0; y < 400; y++) {
  for (let x = 0; x < 400; x++) {
    database.append_ignorant(`${x}|${y}`, {
      color: 'ffffff',
    });
  }
}

database.commit();
