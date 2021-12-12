import { inject, injectable } from "tsyringe";

import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { Product } from "@modules/products/infra/typeorm/entities/Product";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

@injectable()
class CreateProductsUseCase {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository
  ) {}

  async execute({
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    return product;
  }
}

export { CreateProductsUseCase };
