export class OkResponse {
  constructor(
    public message: string = 'the request has succeeded',
    public data: any = [],
  ) {}

  output() {
    return {
      success: true,
      data: this.data,
    };
  }
}
