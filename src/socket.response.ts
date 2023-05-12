export class SocketResponse<T> {
  private data: T;
  private result: string;
  private message: string;

  constructor(data: T, result: string, message: string) {
    this.data = data;
    this.result = result;
    this.message = message;
  }

  static ok(): SocketResponse<string> {
    return new SocketResponse<string>('', '00000', 'OK');
  }

  static success<T>(data: T): SocketResponse<T> {
    return new SocketResponse<T>(data, '00000', 'OK');
  }

  static error(result: string, message: string): SocketResponse<any> {
    return new SocketResponse<any>('', result, message);
  }
}
