import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from '../../product/entites/product.entity';

@Entity()
@ObjectType()
export class ProductTag {
  @PrimaryGeneratedColumn()
  @Field(() => String)
  id: string;
  @Column()
  @Field(() => String)
  name: string;

  @ManyToMany(() => Product, (product) => product.productTags)
  @Field(() => [Product])
  products: Product[];
}
