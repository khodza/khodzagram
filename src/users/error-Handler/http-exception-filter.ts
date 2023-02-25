// import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
// import { HttpException } from '@nestjs/common/exceptions/http.exception';
// import { Response } from 'express';

// @Catch(HttpException)
// export class HttpExceptionFilter implements ExceptionFilter {
//     catch(exception: HttpException, host: ArgumentsHost) {
//         const ctx = host.switchToHttp();
//         const response = ctx.getResponse<Response>();
//         const status = exception.getStatus();
//         const message =exception.message
//         response.status(status).json({
//         statusCode: status,
//         message,
//     });
//     }
// }
