import {HttpException} from "@nestjs/common";

export class BusinessException extends HttpException {

    constructor(message: string, status: number = 400) {
        super(message, status);
    }

}