export class OkResponse {
  constructor(
    public message: string = 'OK',
    public data: any = [],
  ) {}

  output() {
    return {
      success: true,
      message: this.message,
      data: this.data,
    };
  }
}
