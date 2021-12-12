import { Request, Response } from "express";
import { container } from "tsyringe";
import validator from "validator";

import { ICreateProductDTO } from "@modules/products/dtos/ICreateProductDTO";
import { AppError } from "@shared/errors/AppError";

import { CreateProductsUseCase } from "./CreateProductUseCase";

class CreateProductController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity }: ICreateProductDTO = request.body;

    if (validator.isEmpty(name)) {
      throw new AppError("Invalid name");
    }

    if (!validator.isInt(price.toString())) {
      throw new AppError("Invalid price");
    }

    if (!validator.isInt(quantity.toString())) {
      throw new AppError("Invalid quantity");
    }

    const createProductUseCase = container.resolve(CreateProductsUseCase);

    const product = await createProductUseCase.execute({
      name,
      price,
      quantity,
    });

    return response.json(product);
  }
}

export { CreateProductController };
