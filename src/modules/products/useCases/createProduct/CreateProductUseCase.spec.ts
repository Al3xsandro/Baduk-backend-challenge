import { ProductRepositoryInMemory } from "@modules/products/repositories/implementations/in-memory/ProductsRepositoryInMemory";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";

describe("Products", () => {
  let productsRepository: IProductsRepository;

  beforeAll(() => {
    productsRepository = new ProductRepositoryInMemory();

    expect(productsRepository).toBeDefined();
  });

  it("should be able to create a new product", async () => {
    const product = await productsRepository.create({
      name: "Apples",
      price: 95,
      quantity: 200,
    });

    expect(product).toHaveProperty("id");
    expect(product).toEqual({
      id: product.id,
      name: "Apples",
      price: 95,
      quantity: 200,
    });
  });
});
