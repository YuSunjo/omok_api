export class ApiResponse<T> {
  private data: T;
  private result: string;
  private message: string;

  constructor(data: T, result: string, message: string) {
    this.data = data;
    this.result = result;
    this.message = message;
  }

  static ok(): ApiResponse<string> {
    return new ApiResponse<string>('', '00000', 'OK');
  }

  static success<T>(data: T): ApiResponse<T> {
    return new ApiResponse<T>(data, '00000', 'OK');
  }

  static error(result: string, message: string): ApiResponse<any> {
    return new ApiResponse<any>('', result, message);
  }
}
