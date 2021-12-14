import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { Order } from "../infra/typeorm/entities/Order";

interface IOrdersRepository {
  create({ customerId, products }: ICreateOrderDTO): Promise<Order>;
  findAllOrders(skip: number): Promise<Order[]>;
  findByProductId(product_id: string, skip: number): Promise<Order[]>;
  findByDate(first_date: Date): Promise<Order[]>;
  findByUpPrice(price: number): Promise<Order[]>;
  findByBelowPrice(price: number): Promise<Order[]>;
}

export { IOrdersRepository };
