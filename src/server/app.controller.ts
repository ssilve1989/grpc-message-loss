import { Controller, Logger } from '@nestjs/common';
import { map, range } from 'rxjs';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
class AppController {
  private readonly logger = new Logger(AppController.name);

  @GrpcMethod('GreeterService', 'StreamHello')
  streamHello({ count }) {
    this.logger.log(`streaming ${count} replies`);

    return range(0, count).pipe(
      map((_, i) => ({
        message: `Hello #${i + 1}`,
        timestamp: Date.now(),
      })),
    );
  }
}

export { AppController };
