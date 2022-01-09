import { ICustomerRepository } from "@modules/customers/repositories/ICustumerRepository";
import { CustomerRepositoryInMemory } from "@modules/customers/repositories/implementations/in-memory/CustomerRepositoryInMemory";
import { CreateCustomerUseCase } from "@modules/customers/userCases/createCustomer/CreateCustomerUseCase";
import { AppError } from "@shared/errors/AppError";

describe("Customers", () => {
  let customerRepositoryInMemory: ICustomerRepository;
  let customerUserCase: CreateCustomerUseCase;

  beforeAll(() => {
    customerRepositoryInMemory = new CustomerRepositoryInMemory();
    customerUserCase = new CreateCustomerUseCase(customerRepositoryInMemory);

    expect(customerRepositoryInMemory).toBeDefined();
    expect(customerUserCase).toBeDefined();
  });

  describe("[POST] Create customer", () => {
    it("should be able to create a new customer", async () => {
      const customer = await customerRepositoryInMemory.create({
        name: "john",
        email: "john@mock.com",
        telefone: "11945058392",
      });

      expect(customer).toHaveProperty("id");
      expect(customer).toEqual({
        id: customer.id,
        name: "john",
        email: "john@mock.com",
        telefone: customer.telefone,
      });
    });

    it("should receive an error on create a new customer with an existing email", async () => {
      await expect(
        customerUserCase.execute({
          name: "john",
          email: "john@mock.com",
          telefone: "11945058392",
        })
      ).rejects.toEqual(new AppError("Customer already exist!"));
    });
  });
});
