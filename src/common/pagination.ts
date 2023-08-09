import { Field, InputType } from '@nestjs/graphql';
import { Min } from 'class-validator';
@InputType()
export class PageDTO {
  @Field()
  @Min(0)
  limit: number;

  @Field()
  @Min(1)
  page: number;
}

export class PageInfo {
  totalCount: number;
  currentPage: number;
}
