import { OrdersRepositoryInMemory } from "@modules/orders/repositories/implementations/in-memory/OrdersRepositoryInMemory";
import { IOrdersRepository } from "@modules/orders/repositories/IOrdersRepository";

describe("Orders", () => {
  let ordersRepositoryInMemory: IOrdersRepository;

  beforeAll(() => {
    ordersRepositoryInMemory = new OrdersRepositoryInMemory();

    expect(ordersRepositoryInMemory).toBeDefined();
  });

  describe("[POST] /orders", () => {
    it("should to create a new order", async () => {
      const order = await ordersRepositoryInMemory.create({
        customerId: "1c13f099-30d0-4ef1-8f57-b95030c737da",
        totalPrice: 150,
        products: [
          {
            id: "934f20bf-39b7-4510-951d-0417ce8b21cd",
            quantity: 100,
          },
        ],
      });

      expect(order).toHaveProperty("id");
      expect(order).toEqual({
        id: order.id,
        customerId: "1c13f099-30d0-4ef1-8f57-b95030c737da",
        totalPrice: 150,
        products: [
          {
            id: "934f20bf-39b7-4510-951d-0417ce8b21cd",
            quantity: 100,
          },
        ],
      });
    });
  });
});
