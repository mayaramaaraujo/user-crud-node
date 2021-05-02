import {v4} from 'uuid';

export class IdGenerator {
  generate():string {
      return v4();
  }
}

export const idGenerator = new IdGenerator();
