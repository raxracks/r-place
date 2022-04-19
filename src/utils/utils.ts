import { DB } from 'database/VersatileDB';
import { join } from 'path';

export const data = new DB(
  join(__dirname, '..', '..', 'database', 'pixels.db'),
  {
    schema: join(__dirname, '..', '..', 'database', 'schema.json'),
    autoinsert: true,
  },
).read();

export let json = data.jsonify_fast();

export function cache() {
  json = data.jsonify_fast();
}
