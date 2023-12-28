export class AppError extends Error {
  private _noRetry: boolean | undefined;

  setNoRetry(noRetry: boolean = true) {
    this._noRetry = noRetry;
  }

  noRetry() {
    return this._noRetry === true;
  }
}
