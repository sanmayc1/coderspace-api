export class CustomError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public filed?: string
  ) {
    super(message);
    this.name = 'Customer Error';
  }
}
