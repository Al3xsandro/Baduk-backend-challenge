import { Request, Response } from "express";
import { container } from "tsyringe";
import validator from "validator";

import { ICreateOrderDTO } from "@modules/orders/dtos/ICreateOrderDTO";
import { AppError } from "@shared/errors/AppError";

import { CreateOrderUseCase } from "./CreateOrderUseCase";

class CreateOrderController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { customerId, totalPrice, products }: ICreateOrderDTO = request.body;

    if (!validator.isUUID(customerId)) {
      throw new AppError("Invalid customerId");
    }

    if (!validator.isInt(totalPrice.toString())) {
      throw new AppError("Invalid totalPrice");
    }

    if (validator.isEmpty(products.toString())) {
      throw new AppError("Invalid products");
    }

    const createOrderUseCase = container.resolve(CreateOrderUseCase);

    const order = await createOrderUseCase.execute({
      customerId,
      totalPrice,
      products,
    });

    return response.json(order);
  }
}

export { CreateOrderController };
