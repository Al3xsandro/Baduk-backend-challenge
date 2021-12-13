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

  async findOne(product_id: string): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: {
        id: product_id,
      },
    });

    return product;
  }

  async updateQuantity(id: string, quantity: number): Promise<Product> {
    const product = await this.productsRepository.findOne(id);

    product.quantity = quantity;

    await this.productsRepository.save(product);

    return product;
  }
}

export { ProductsRepository };
