import { Catch, ExceptionFilter, ArgumentsHost, BadRequestException } from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const validationErrors = exception.getResponse()['message'];
    response.status(400).json({
      code: 400,
      message: 'Bad Request',
      validationErrors: validationErrors,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
