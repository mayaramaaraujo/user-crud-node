import { BaseError } from './BaseError';

export class CharacterSizeError extends BaseError {
  constructor(message: string) {
    super(message, 400)
  }
}