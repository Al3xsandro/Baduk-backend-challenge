import { ICustomerRepository } from "@modules/customers/repositories/ICustomerRepository";
import { CustomerRepositoryInMemory } from "@modules/customers/repositories/implementations/in-memory/CustomerRepositoryInMemory";
import { CreateCustomerUseCase } from "@modules/customers/userCases/createCustomer/CreateCustomerUseCase";

describe("Customers", () => {
  let customerRepositoryInMemory: ICustomerRepository;
  let customerUserCase: CreateCustomerUseCase;

  beforeAll(() => {
    customerRepositoryInMemory = new CustomerRepositoryInMemory();
    customerUserCase = new CreateCustomerUseCase(customerRepositoryInMemory);

    expect(customerRepositoryInMemory).toBeDefined();
    expect(customerUserCase).toBeDefined();
  });

  describe("[GET] Get all customers", () => {
    it("should be able to receive all customers created", async () => {
      await customerRepositoryInMemory.create({
        name: "john",
        email: "john@mock.com",
        telefone: "11945058392",
      });

      const customers = await customerRepositoryInMemory.find();

      expect(customers).toEqual(customers);
      expect(customers[0]).toHaveProperty("id");
    });
  });
});
