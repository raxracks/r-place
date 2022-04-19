import { DB } from 'database/VersatileDB';
import { join } from 'path';

const database = new DB(join(__dirname, '..', '..', 'database', 'pixels.db'), {
  schema: join(__dirname, '..', '..', 'database', 'schema.json'),
  autoinsert: true,
});

database.format();
database.read();

database.append_ignorant('a', { a: 'a' });

for (let y = 0; y < 1000; y++) {
  for (let x = 0; x < 1000; x++) {
    database.append_ignorant(`${x}|${y}`, {
      color: 'ffffff',
    });
  }
}

database.commit();
