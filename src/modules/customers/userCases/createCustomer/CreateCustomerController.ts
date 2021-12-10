import { Request, Response } from "express";
import { container } from "tsyringe";

import { ICreateCustumerDTO } from "../../dtos/ICreateCustomer.dto";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, telefone }: ICreateCustumerDTO = request.body;

    const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

    const customer = await createCustomerUseCase.execute({
      name,
      telefone,
      email,
    });

    return response.json(customer);
  }
}

export { CreateCustomerController };
