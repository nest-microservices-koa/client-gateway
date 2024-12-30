import {
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, Payload, RpcException } from '@nestjs/microservices';
import { envs, PRODUCTS_SERVICE } from 'src/config';
import { Logger } from '@nestjs/common';
import { PaginationDto } from 'src/common';
import { catchError } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  private readonly logger = new Logger(ProductsController.name);

  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy,
  ) {
    this.initialize();
  }

  private async initialize() {
    this.logger.log(
      `Connecting to PRODUCTS_SERVICE at ${envs.productsMsHost}:${envs.productsMSPort}`,
    );
    await this.productsClient.connect();
  }

  @Post()
  createProduct(@Payload() createProductDto: CreateProductDto) {
    return this.productsClient.send(
      { cmd: 'create-product' },
      createProductDto,
    );
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'find-all' }, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'find-one-product' }, { id }).pipe(
      catchError((error) => {
        throw new RpcException(error);
      }),
    );
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete-product' }, { id });
  }

  @Patch()
  updateProduct(@Payload() updateProductDto: UpdateProductDto) {
    return this.productsClient.send(
      { cmd: 'update-product' },
      updateProductDto,
    );
  }
}
