import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
import { CategoryService } from './category.service';
import Category from '../../entity/category.entity';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PageDTO } from '../../common/pagination';

@Resolver()
@UseGuards(JwtAuthGuard)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query('getCategories')
  async getCategories(@Args('dto') dto: PageDTO) {
    return this.categoryService.getCategories(dto);
  }

  @Query('getAllCategories')
  async getAllCategories() {
    return this.categoryService.getAll();
  }

  @Mutation((returns) => Category)
  async createCategory(@Args('dto') dto: CreateCategoryDTO): Promise<Category> {
    return this.categoryService.create(dto);
  }

  @Mutation((returns) => Category)
  async updateCategory(
    @Args('id', new ParseUUIDPipe()) id: string,
    @Args('dto') dto: UpdateCategoryDTO,
  ): Promise<Category> {
    return this.categoryService.update(id, dto);
  }

  @Mutation((returns) => String)
  async deleteCategory(
    @Args('id', new ParseUUIDPipe()) id: string,
  ): Promise<string> {
    return this.categoryService.delete(id);
  }
}
