import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Category from '../../entity/category.entity';
import { Not, Repository } from 'typeorm';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
import { GraphQLError } from 'graphql';
import { CONFLICT, NOT_FOUND } from '../../constance/error-code';
import { PageDTO, PageInfo } from '../../common/pagination';
import Product from '../../entity/product.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getCategories(dto: PageDTO) {
    const total = await this.categoryRepository.count();

    const categories = await this.categoryRepository.find({
      relations: {
        products: true,
      },
      take: dto.limit,
      skip: (dto.page - 1) * dto.limit,
    });

    const pageInfo: PageInfo = {
      totalCount: total,
      currentPage: dto.page,
    };

    return { data: categories, pageInfo };
  }

  async create(dto: CreateCategoryDTO): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({
      name: dto.name,
    });

    if (category) {
      throw new GraphQLError('Category name has been used.', {
        extensions: {
          code: CONFLICT,
        },
      });
    }

    const newCategory = this.categoryRepository.create(dto);

    return this.categoryRepository.save(newCategory);
  }

  async update(id: string, dto: UpdateCategoryDTO): Promise<Category> {
    const category = await this.categoryRepository.findOneBy({ id: id });

    if (!category) {
      throw new GraphQLError('Category not found.', {
        extensions: {
          code: NOT_FOUND,
        },
      });
    }

    const checkName = (await this.categoryRepository.findOneBy({
      id: Not(id),
      name: dto.name,
    }))
      ? true
      : false;

    if (checkName) {
      throw new GraphQLError('Category name has been used.', {
        extensions: {
          code: CONFLICT,
        },
      });
    }

    await this.categoryRepository.update(id, dto);
    return this.categoryRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<string> {
    const category = await this.categoryRepository.findOne({
      relations: {
        products: true,
      },
      where: {
        id: id,
      },
    });

    if (!category) {
      throw new GraphQLError('Category not found', {
        extensions: {
          code: NOT_FOUND,
        },
      });
    }

    if (category.products.length > 0) {
      throw new GraphQLError('Category is used by products', {
        extensions: {
          code: CONFLICT,
        },
      });
    }

    await this.categoryRepository.delete(id);

    return id;
  }

  async findById(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      relations: { products: true },
      where: { id },
    });

    if (!category) {
      throw new GraphQLError('Category not found', {
        extensions: {
          code: NOT_FOUND,
        },
      });
    }

    return category;
  }

  async getAll(): Promise<Category[]> {
    const categories = await this.categoryRepository.find({
      relations: {
        products: true,
      },
    });

    return categories;
  }
}
