import dotenv from 'dotenv';

dotenv.config();

const add = (a: number, b: number) => {
  return a + b;
};

console.log(add(34, 2));
