import { getRepository, Repository } from "typeorm";

import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

import { Product } from "../../entities/Product";

class ProductsRepository implements IProductsRepository {
  private productsRepository: Repository<Product>;

  constructor() {
    this.productsRepository = getRepository(Product);
  }

  async create({ name, price, quantity }: ICreateProductDTO): Promise<Product> {
    const product = this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await this.productsRepository.save(product);

    return product;
  }

  async find(): Promise<Product[]> {
    const products = await this.productsRepository.find();

    return products;
  }
}

export { ProductsRepository };
