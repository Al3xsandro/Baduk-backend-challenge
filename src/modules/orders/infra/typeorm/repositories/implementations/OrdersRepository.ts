import {
  getRepository,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from "typeorm";

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

  async findAllOrders(skip: number): Promise<Order[]> {
    const orders = await this.repository.find({
      skip: !skip ? 1 : Number(skip),
      take: 10,
      cache: 60000,
      order: {
        totalPrice: "DESC",
        created_at: "DESC",
      },
    });

    return orders;
  }

  async findByProductId(product_id: string): Promise<Order[]> {
    const allOrders = [];

    const orders = await this.repository.find({
      take: 5,
    });

    orders.map((order) => {
      const parseProductsToString = JSON.stringify(order.products.toString());
      const productOrders = parseProductsToString.includes(product_id);

      const product = productOrders;

      if (product) {
        return allOrders.push(orders);
      }

      return [];
    });

    return allOrders;
  }

  async findByDate(date: Date): Promise<Order[]> {
    const orders = await this.repository.find({
      order: {
        totalPrice: "DESC",
        created_at: "DESC",
      },
      where: {
        created_at: MoreThanOrEqual(date),
      },
    });

    return orders;
  }

  async findByUpPrice(price: number): Promise<Order[]> {
    const orders = await this.repository.find({
      order: {
        totalPrice: "DESC",
        created_at: "DESC",
      },
      where: {
        totalPrice: MoreThanOrEqual(price),
      },
    });

    return orders;
  }

  async findByBelowPrice(price: number): Promise<Order[]> {
    const orders = await this.repository.find({
      order: {
        totalPrice: "DESC",
        created_at: "DESC",
      },
      where: {
        totalPrice: LessThanOrEqual(price),
      },
    });

    return orders;
  }
}

export { OrdersRepository };
