import { Request, Response } from "express";
import { container } from "tsyringe";

import { IFindOrderDTO } from "@modules/orders/dtos/IFindOrderDTO";

import { FindOrdersUseCase } from "./FindOrdersUseCase";

class FindOrdersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { product_id, up_price, below_price, date, page }: IFindOrderDTO =
      request.query;

    const findOrdersUseCase = container.resolve(FindOrdersUseCase);

    const orders = await findOrdersUseCase.execute({
      product_id,
      up_price,
      below_price,
      date,
      page,
    });

    return response.json(orders);
  }
}

export { FindOrdersController };
