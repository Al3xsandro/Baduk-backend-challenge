/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { inject, injectable } from "tsyringe";

import { ICustomerRepository } from "@modules/customers/repositories/ICustumerRepository";
import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { Order } from "@modules/orders/infra/typeorm/entities/Order";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateOrderUseCase {
  constructor(
    @inject("OrdersRepository")
    private createOrderRepository: IOrdersRepository,

    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,

    @inject("CustomerRepository")
    private customersRepository: ICustomerRepository
  ) {}

  async execute({
    customerId,
    totalPrice,
    products,
  }: ICreateOrderDTO): Promise<Order> {
    const customer = await this.customersRepository.findById(customerId);

    if (!customer) {
      throw new AppError("Customer does not exists!");
    }

    for (const product of products) {
      const productQuantity = await this.productsRepository.findOne(product.id);

      const newQuantity =
        Number(productQuantity.quantity) - Number(product.quantity);

      await this.productsRepository.updateQuantity(product.id, newQuantity);
    }

    const order = await this.createOrderRepository.create({
      customerId,
      totalPrice,
      products,
    });

    return order;
  }
}

export { CreateOrderUseCase };
