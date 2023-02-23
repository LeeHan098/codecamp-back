import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { productCategory } from './entites/productCategory.entity';
import { ProductCategoryResolver } from './product-category.resolver';
import { ProductCategoryService } from './product-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([productCategory])],
  providers: [
    ProductCategoryResolver, //
    ProductCategoryService,
  ],
})
export class ProductCategoryModule {}
