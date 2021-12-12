import { ProductRepositoryInMemory } from "@modules/products/repositories/implementations/in-memory/ProductsRepositoryInMemory";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

describe("Products", () => {
  let productsRepositoryInMemory: IProductsRepository;

  beforeAll(() => {
    productsRepositoryInMemory = new ProductRepositoryInMemory();

    expect(productsRepositoryInMemory).toBeDefined();
  });

  describe("[GET] Products", () => {
    it("should receive all products", async () => {
      await productsRepositoryInMemory.create({
        name: "Apples",
        price: 95,
        quantity: 200,
      });

      const products = await productsRepositoryInMemory.find();

      expect(products[0]).toHaveProperty("id");
      expect(products).toEqual([
        {
          id: products[0].id,
          name: "Apples",
          price: 95,
          quantity: 200,
        },
      ]);
    });
  });
});
