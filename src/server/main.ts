import { NestFactory } from '@nestjs/core';
import path from 'node:path';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<GrpcOptions>(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'app',
      protoPath: path.join(__dirname, '..', 'proto', 'greeter_service.proto'),
      url: 'localhost:5000',
    },
  });

  await app.listen();
}

bootstrap();
