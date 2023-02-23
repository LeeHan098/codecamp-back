import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entites/productSaleslocation.entity';
@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {}
