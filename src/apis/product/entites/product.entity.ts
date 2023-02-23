import { Field, Int, ObjectType } from '@nestjs/graphql';
import { productCategory } from 'src/apis/product-category/entites/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSalselocation/entites/productSaleslocation.entity';
import { ProductTag } from 'src/apis/productTags/entites/productTag.entity';
import { User } from 'src/apis/users/entites/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column({ type: 'varchar' })
  @Field(() => String)
  name: string;
  @Column({ type: 'varchar' })
  @Field(() => String)
  description: string;
  @Column()
  @Field(() => Int)
  price: number;
  @Column({ default: false })
  @Field(() => Boolean)
  isSoldout: boolean;

  @DeleteDateColumn()
  deletedAt: Date;

  @JoinColumn()
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => productCategory)
  @Field(() => productCategory)
  productCategory: productCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @ManyToMany(() => ProductTag, (productTags) => productTags.products)
  @Field(() => [ProductTag])
  productTags: ProductTag[];
}
