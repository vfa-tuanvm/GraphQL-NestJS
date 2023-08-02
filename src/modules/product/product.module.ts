import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { CategoryModule } from '../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Product from '../../entity/product.entity';

@Module({
  imports: [
    CloudinaryModule,
    CategoryModule,
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
