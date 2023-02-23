import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { productCategory } from './entites/productCategory.entity';
import { ProductCategoryService } from './product-category.service';

@Resolver()
export class ProductCategoryResolver {
  constructor(
    private readonly productCategoryService: ProductCategoryService,
  ) {}
  @Mutation(() => productCategory)
  createProductCategory(
    @Args('name') name: string, //
  ) {
    return this.productCategoryService.create({ name });
  }
}
