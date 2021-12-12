import { ICreateProductDTO } from "../dtos/ICreateProductDTO";
import { Product } from "../infra/typeorm/entities/Product";

interface IProductsRepository {
  create({ name, price, quantity }: ICreateProductDTO): Promise<Product>;
  find(): Promise<Product[]>;
}

export { IProductsRepository };
