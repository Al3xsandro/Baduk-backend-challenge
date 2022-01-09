import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { IFindOrderDTO } from "@modules/orders/dtos/IFindOrderDTO";
import { Order } from "@modules/orders/infra/typeorm/entities/Order";

import { IOrdersRepository } from "../../IOrdersRepository";

class OrdersRepositoryInMemory implements IOrdersRepository {
  constructor(private ordersRepository: Order[] = []) {}
  async create({
    customerId,
    products,
    totalPrice,
  }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, {
      customerId,
      products,
      totalPrice,
    });

    this.ordersRepository.push(order);

    return order;
  }
  async findAllOrders(): Promise<Order[]> {
    return this.ordersRepository;
  }

  find({
    below_price,
    date,
    page,
    product_id,
    up_price,
  }: IFindOrderDTO): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}

export { OrdersRepositoryInMemory };
