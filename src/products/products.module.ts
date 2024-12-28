import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PRODUCTS_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Ensure ConfigModule is global
    }),
    ClientsModule.registerAsync([
      {
        imports: [ConfigModule],
        name: PRODUCTS_SERVICE,
        useFactory: async (configService: ConfigService) => {
          const host = configService.get<string>('PRODUCTS_MS_HOST');
          const port = configService.get<number>('PRODUCTS_MS_PORT');
          console.log(
            `Configuring PRODUCTS_SERVICE with host: ${host}, port: ${port}`,
          );
          return {
            transport: Transport.TCP,
            options: {
              host,
              port,
            },
          };
        },
        inject: [ConfigService],
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
