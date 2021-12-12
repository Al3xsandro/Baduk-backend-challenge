import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { Product } from "@modules/products/infra/typeorm/entities/Product";

import { IProductsRepository } from "../../IProductsRepository";

class ProductRepositoryInMemory implements IProductsRepository {
  constructor(private productRepository: Product[] = []) {}

  async create({ name, price, quantity }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      name,
      price,
      quantity,
    });

    this.productRepository.push(product);

    return product;
  }

  async find(): Promise<Product[]> {
    return this.productRepository;
  }
}

export { ProductRepositoryInMemory };
