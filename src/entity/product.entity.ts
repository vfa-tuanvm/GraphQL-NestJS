import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Category from './category.entity';

@ObjectType()
@Entity()
class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  public id: string;

  @Column()
  @Field()
  public name: string;

  @Column({ type: 'int' })
  @Field()
  public quantity: number;

  @Column({ type: 'mediumtext' })
  @Field()
  public description: string;

  @Column()
  @Field()
  public image: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn()
  category: Category;
}

export default Product;
