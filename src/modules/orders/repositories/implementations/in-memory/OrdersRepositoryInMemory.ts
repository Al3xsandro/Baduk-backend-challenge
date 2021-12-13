import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
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

  async findByProductId(product_id: string): Promise<Order[]> {
    const allOrders = [];
    const orders = this.ordersRepository;

    orders.map((order) => {
      const parseProductsToString = JSON.stringify(order.products.toString());
      const productOrders = parseProductsToString.includes(product_id);

      if (productOrders) {
        return allOrders.push(productOrders);
      }

      return [];
    });

    return allOrders;
  }

  findByDate(first_date: Date): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  findByUpPrice(price: number): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
  findByBelowPrice(price: number): Promise<Order[]> {
    throw new Error("Method not implemented.");
  }
}

export { OrdersRepositoryInMemory };
