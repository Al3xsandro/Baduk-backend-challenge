import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindProductsUseCase } from "./FindProductsUseCase";

class FindProductsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const findProductsUseCase = container.resolve(FindProductsUseCase);

    const products = await findProductsUseCase.execute();

    return response.json(products);
  }
}

export { FindProductsController };
