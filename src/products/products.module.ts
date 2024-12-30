import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3002,
        },
      },
    ]),
  ],
})
export class ProductsModule {
  constructor() {
    console.log(
      `Connecting to PRODUCTS_SERVICE at ${process.env.PRODUCTS_MS_HOST}:${process.env.PRODUCTS_MS_PORT}`,
    );
  }
}
