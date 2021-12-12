import { AppError } from "../../../../shared/errors/AppError";
import { ICustomerRepository } from "../../repositories/ICustumerRepository";
import { CustomerRepositoryInMemory } from "../../repositories/implementations/in-memory/CustomerRepositoryInMemory";
import { CreateCustomerUseCase } from "./CreateCustomerUseCase";

describe("Customers", () => {
  let customerRepositoryInMemory: ICustomerRepository;
  let customerUserCase: CreateCustomerUseCase;

  beforeAll(() => {
    customerRepositoryInMemory = new CustomerRepositoryInMemory();
    customerUserCase = new CreateCustomerUseCase(customerRepositoryInMemory);

    expect(customerRepositoryInMemory).toBeDefined();
    expect(customerUserCase).toBeDefined();
  });

  describe("[POST] Create custumer", () => {
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
      ).rejects.toEqual(new AppError("Customer already exists!"));
    });
  });

  describe("[GET] Get all customers", () => {
    it("should be able to receive all customers", async () => {
      const customers = await customerRepositoryInMemory.find();

      expect(customers).toEqual(customers);
      expect(customers[0]).toHaveProperty("id");
    });
  });
});
