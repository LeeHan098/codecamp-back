import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException) {
    const status = exception.getStatus();
    const message = exception.message;

    console.log('========================');
    console.log('exception!!!');
    console.log('exception:', message);
    console.log('code:', status);
    console.log('========================');

    if (status === 500) {
      return new HttpException('서버문제', 500);
    }
  }
}
