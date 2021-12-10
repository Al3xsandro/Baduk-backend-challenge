import { Request, Response } from "express";
import { container } from "tsyringe";
import validator from "validator";

import { AppError } from "../../../../shared/errors/AppError";
import { ICreateCustumerDTO } from "../../dtos/ICreateCustomer.dto";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

class CreateCustomerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, telefone }: ICreateCustumerDTO = request.body;

    if (!validator.isEmail(email)) {
      throw new AppError("Invalid e-mail");
    }

    if (!validator.isMobilePhone(telefone)) {
      throw new AppError("Invalid phone number");
    }

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
