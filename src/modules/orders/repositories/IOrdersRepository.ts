import { ICreateOrderDTO } from "../dtos/ICreateOrderDTO";
import { Order } from "../infra/typeorm/entities/Order";

interface IOrdersRepository {
  create({ customerId, products }: ICreateOrderDTO): Promise<Order>;
  find(
    page?: number,
    product_id?: string,
    below_price?: number,
    up_price?: number,
    date?: Date
  ): Promise<Order[]>;
}

export { IOrdersRepository };
