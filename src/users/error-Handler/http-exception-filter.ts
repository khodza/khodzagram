import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Response } from 'express';
interface MongoseErr extends HttpException{
    code:number |string;
    cause: any |Error
}
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: MongoseErr, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status = exception.getStatus();
    let message =exception.message
    if(exception.message.startsWith('E11000 duplicate key error collection')){
        message =`User with ${Object.keys(exception.cause.keyValue)} is already exist` ;
    }

    response.status(status).json({
        statusCode: status,
        message,
    });
    }
}