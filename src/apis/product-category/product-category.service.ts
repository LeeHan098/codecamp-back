import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { productCategory } from './entites/productCategory.entity';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(productCategory)
    private readonly productCategoryRepository: Repository<productCategory>,
  ) {}
  async create({ name }): Promise<productCategory> {
    const result = await this.productCategoryRepository.save({ name });
    console.log('category', result);
    return result;
  }
}
