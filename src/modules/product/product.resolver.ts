import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import * as Upload from 'graphql-upload/Upload.js';
import { ProductService } from './product.service';
import Product from '../../entity/product.entity';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver()
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }

  @Mutation((returns) => Product)
  async createProduct(
    @Args('dto')
    dto: CreateProductDTO,
  ) {
    return this.productService.create(dto);
  }

  @Mutation((returns) => Product)
  async updateProduct(
    @Args('id', new ParseUUIDPipe()) id: string,
    @Args('dto') dto: UpdateProductDTO,
  ) {
    return this.productService.update(id, dto);
  }
}
