import { Inject, Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import path from 'path';
import {
  ClientGrpcProxy,
  ClientsModule,
  Transport,
} from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'client',
        transport: Transport.GRPC,
        options: {
          package: 'app',
          protoPath: path.join(
            __dirname,
            '..',
            'proto',
            'greeter_service.proto',
          ),
          url: 'localhost:5000',
        },
      },
    ]),
  ],
})
class AppModule implements OnApplicationBootstrap {
  private readonly service: any;
  private readonly logger = new Logger(AppModule.name);

  constructor(@Inject('client') private readonly client: ClientGrpcProxy) {
    this.service = client.getService('GreeterService');
  }

  onApplicationBootstrap() {
    const count = Number(process.env.COUNT);

    let received = 0;
    this.service.streamHello({ count }).subscribe({
      next: () => ++received,
      complete: () => {
        this.logger.log(`received ${received} replies`);
      },
    });
  }
}

export { AppModule };
