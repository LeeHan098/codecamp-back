import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSalselocation/entites/productSaleslocation.entity';
import { ProductTag } from '../productTags/entites/productTag.entity';
import { Product } from './entites/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(ProductSaleslocation)
    private readonly productSalesRepository: Repository<ProductSaleslocation>,
    @InjectRepository(ProductTag)
    private readonly productTagRepository: Repository<ProductTag>,
  ) {}
  async findAll() {
    return await this.productRepository.find({
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }
  async findOne(id) {
    return await this.productRepository.findOne({
      where: { id },
      relations: ['productSaleslocation', 'productCategory', 'productTags'],
    });
  }

  async create({ createProductInput }) {
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput;
    const location = await this.productSalesRepository.save({
      ...productSaleslocation,
    });

    const tagResult = [];
    for (let i = 0; i < productTags.length; i++) {
      const tagName = productTags[i].replace('#', '');
      const prevTag = await this.productTagRepository.findOne({
        where: { name: tagName },
      });
      if (prevTag) {
        tagResult.push(prevTag);
      } else {
        const newTag = await this.productTagRepository.save({ name: tagName });
        tagResult.push(newTag);
      }
    }

    const newProduct = await this.productRepository.save({
      ...product,
      productSaleslocation: location,
      productCategory: { id: productCategoryId },
      productTags: tagResult,
    });
    console.log(newProduct);
    return newProduct;
  }
  async update({ productId, updateProductInput }) {
    await this.checkSoldout(productId);
    const myProduct = await this.productRepository.findOne({
      where: { id: productId },
    });
    console.log(myProduct);
    return await this.productRepository.save({
      ...myProduct,
      id: productId,
      ...updateProductInput,
    });
  }
  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new UnprocessableEntityException(
        `this product is empty: ${productId}`,
      );
    } else if (product.isSoldout) {
      throw new UnprocessableEntityException(
        `this product is soldout: ${productId}`,
      );
    }
  }
  async delete(productId) {
    //1. 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    //2. soft delete (직접구현) - isDeleted
    // this.productRepository.update({ id: productId }, { isDeleted: true });
    //3 soft delete (직접구현) - deletedAt

    //this.productRepository.update({ id: productId }, { deletedAt: new Date() });
    // 4. TypeOrm - soft deleted 다른조건 사용가능, soft remove: id로만 삭제
    const result = await this.productRepository.softDelete({ id: productId });
    return result.affected ? true : false;
  }
}
