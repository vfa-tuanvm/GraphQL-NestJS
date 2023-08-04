import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import Product from '../../entity/product.entity';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PageDTO } from '../../common/pagination';

@Resolver()
@UseGuards(JwtAuthGuard)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Query(() => Product)
  async getProductById(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.productService.getById(id);
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

  @Mutation((returns) => String)
  async deleteProduct(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.productService.delete(id);
  }

  @Query('getProducts')
  async getProducts(@Args('dto') dto: PageDTO) {
    return this.productService.getProducts(dto);
  }
}
