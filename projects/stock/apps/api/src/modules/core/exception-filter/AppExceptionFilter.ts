import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';

export class AppExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message: any;

    let errorName = 'UnknownError';

    if (exception instanceof HttpException) {
      try {
        errorName = exception.constructor.name;
      } catch {
        // ignore
      }

      message = exception.getResponse();
    }

    if (message === undefined && exception instanceof Error) {
      message = exception.message;
    } else if (message === undefined) {
      message = 'Internal server error';
    }

    response.status(status).json({
      success: false,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      error: errorName,
      statusCode: undefined,
    });
  }
}
