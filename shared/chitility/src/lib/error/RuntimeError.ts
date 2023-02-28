export class RuntimeError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'RuntimeError';
  }

  getMessage() {
    return this.message;
  }
}
