import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { Customer } from "@modules/customers/infra/typeorm/entities/Custumer";
import { Product } from "@modules/products/infra/typeorm/entities/Product";

@Entity("orders")
class Order {
  @PrimaryColumn()
  id?: string;

  @Column()
  customerId: string;

  @JoinColumn({ name: "customerId" })
  @ManyToOne(() => Customer)
  customer: Customer;

  @Column()
  totalPrice: number;

  @Column("varchar", { array: true, default: [], nullable: false })
  products: Product[];

  @UpdateDateColumn()
  updated_at: Date;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Order };
