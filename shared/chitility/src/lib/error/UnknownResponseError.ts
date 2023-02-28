export class UnknownResponseError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'UnknownResponseError';
  }

  getMessage() {
    return this.message;
  }
}
