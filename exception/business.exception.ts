import { HttpException } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, status = 400) {
    super(message, status);
  }
}
