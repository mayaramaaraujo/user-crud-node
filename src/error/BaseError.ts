export class BaseError extends Error {
  constructor(message: string, public customErrorCode: number) {
    super(message);
  }
}