import { inject, injectable } from "tsyringe";
import validator from "validator";

import { IFindOrderDTO } from "@modules/orders/dtos/IFindOrderDTO";
import { Order } from "@modules/orders/infra/typeorm/entities/Order";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class FindOrdersUseCase {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrdersRepository
  ) {}

  async execute({
    product_id,
    up_price,
    below_price,
    date,
    page,
  }: IFindOrderDTO): Promise<Order[]> {
    if (product_id) {
      if (!validator.isUUID(product_id)) {
        throw new AppError("Invalid product_id");
      }
    }

    const orders = await this.ordersRepository.find(
      page,
      product_id,
      below_price,
      up_price,
      date
    );

    return orders;
  }
}

export { FindOrdersUseCase };
