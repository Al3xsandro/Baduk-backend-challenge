import { getRepository, Repository } from "typeorm";

import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";

import { Order } from "../../entities/Order";

class OrdersRepository implements IOrdersRepository {
  private repository: Repository<Order>;

  constructor() {
    this.repository = getRepository(Order);
  }

  async create({
    customerId,
    totalPrice,
    products,
  }: ICreateOrderDTO): Promise<Order> {
    const order = this.repository.create({
      customerId,
      totalPrice,
      products,
    });

    await this.repository.save(order);

    return order;
  }
  async findByProductId(product_id: string): Promise<Order[]> {
    const product = await this.repository.find({
      where: {
        products: [
          {
            id: product_id,
          },
        ],
      },
    });

    return product;
  }
  async findByDate(first_date: Date, last_date: Date): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  async findByUpPrice(price: string): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  async findByBelowPrice(price: string): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}

export { OrdersRepository };
