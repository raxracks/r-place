import { data } from 'src/utils/utils';

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
