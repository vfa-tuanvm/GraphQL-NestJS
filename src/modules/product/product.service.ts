import { Injectable } from '@nestjs/common';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import * as Upload from 'graphql-upload/Upload.js';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import Product from '../../entity/product.entity';
import { CategoryService } from '../category/category.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GraphQLError } from 'graphql';
import { NOT_FOUND } from '../../constance/error-code';
import { PageDTO, PageInfo } from '../../common/pagination';

@Injectable()
export class ProductService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private categoryService: CategoryService,
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(dto: CreateProductDTO): Promise<Product> {
    const category = await this.categoryService.findById(dto.categoryId);

    const newProduct = this.productRepository.create({
      name: dto.name,
      category,
      description: dto.description,
      quantity: dto.quantity,
    });

    const product = await this.productRepository.save(newProduct);

    product.category = category;

    return product;
  }

  async update(id: string, dto: UpdateProductDTO): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new GraphQLError('Product not found.', {
        extensions: {
          code: NOT_FOUND,
        },
      });
    }

    const queryBuider = this.productRepository.createQueryBuilder().update();

    if (dto.name) {
      queryBuider.set({ name: dto.name });
    }

    if (dto.categoryId) {
      const category = await this.categoryService.findById(dto.categoryId);
      queryBuider.set({ category });
    }

    if (dto.description) {
      queryBuider.set({ description: dto.description });
    }

    if (dto.quantity) {
      queryBuider.set({ quantity: dto.quantity });
    }

    await queryBuider.where('id = :id', { id }).execute();

    const result = await this.productRepository.findOne({
      relations: {
        category: true,
      },
      where: { id },
    });

    return result;
  }

  async delete(id: string): Promise<string> {
    const product = await this.productRepository.findOneBy({ id });

    if (!product) {
      throw new GraphQLError('Product not found', {
        extensions: {
          code: NOT_FOUND,
        },
      });
    }

    await this.productRepository.delete(id);

    return id;
  }

  async getById(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      relations: {
        category: true,
      },
      where: {
        id,
      },
    });

    if (!product) {
      throw new GraphQLError('Product not found', {
        extensions: {
          code: NOT_FOUND,
        },
      });
    }

    return product;
  }

  async getProducts(dto: PageDTO) {
    const total = await this.productRepository.count();
    const products = await this.productRepository.find({
      relations: {
        category: true,
      },
      take: dto.limit,
      skip: (dto.page - 1) * dto.limit,
    });

    const pageInfo: PageInfo = {
      totalCount: total,
      currentPage: dto.page,
    };

    return { data: products, pageInfo };
  }
}
