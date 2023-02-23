import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productsSalselocation/entites/productSaleslocation.entity';
import { ProductTag } from '../productTags/entites/productTag.entity';
import { Product } from './entites/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductSaleslocation, ProductTag]),
  ],
  providers: [ProductService, ProductResolver],
})
export class ProductModule {}
