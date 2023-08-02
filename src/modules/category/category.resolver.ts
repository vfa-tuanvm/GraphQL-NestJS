import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateCategoryDTO, UpdateCategoryDTO } from './category.dto';
import { CategoryService } from './category.service';
import Category from '../../entity/category.entity';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver()
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query((type) => [Category])
  async getAllCategory(): Promise<Category[]> {
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
