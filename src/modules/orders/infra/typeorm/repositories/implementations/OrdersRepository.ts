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

  async find(
    page?: number,
    product_id?: string,
    below_price?: number,
    up_price?: number,
    date?: Date
  ): Promise<Order[]> {
    const ordersQuery = this.repository.createQueryBuilder("orders");

    if (page) {
      ordersQuery.offset(Number(page));
    }

    if (below_price) {
      ordersQuery.andWhere("orders.totalPrice <= :below_price", {
        below_price,
      });
    }

    if (up_price) {
      ordersQuery.andWhere("orders.totalPrice >= :up_price", { up_price });
    }

    if (date) {
      ordersQuery.andWhere("orders.created_at = :date", {
        date,
      });
    }

    const orders = await ordersQuery.getMany();

    return orders;
  }
}

export { OrdersRepository };
