import { DB } from 'database/VersatileDB';
import { join } from 'path';

const data = new DB(join(__dirname, '..', '..', 'database', 'pixels.db'), {
  schema: join(__dirname, '..', '..', 'database', 'schema.json'),
  autoinsert: true,
});

export default data;
