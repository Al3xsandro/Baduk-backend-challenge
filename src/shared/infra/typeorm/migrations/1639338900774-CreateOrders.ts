import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrders1639338900774 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "customerId",
            type: "uuid",
          },
          {
            name: "totalPrice",
            type: "numeric",
          },
          {
            name: "products",
            type: "varchar",
            isArray: true,
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "FKCustomer",
            referencedTableName: "customer",
            referencedColumnNames: ["id"],
            columnNames: ["customerId"],
            onDelete: "SET NULL",
            onUpdate: "SET NULL",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("orders", "FKCustomer");
    await queryRunner.dropTable("orders");
  }
}
