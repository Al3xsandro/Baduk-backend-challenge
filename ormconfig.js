require("dotenv/config");

const devEnv = {
  name: "default",
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: 5432,
  username: process.env.TYPEORM_USERNAME || "docker",
  password: process.env.TYPEORM_PASSWORD || "docker",
  database: process.env.TYPEORM_DATABASE || "baduk_test",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/infra/typeorm/entities/*.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations",
    entitiesDir: "./src/modules/**/infra/typeorm/entities/*.ts"
  }
}

 const prodEnv = {
  name: "default",
  type: 'postgres',
  host: process.env.TYPEORM_HOST || 'localhost',
  port: 5432,
  username: process.env.TYPEORM_USERNAME || "docker",
  password: process.env.TYPEORM_PASSWORD || "docker",
  database: process.env.TYPEORM_DATABASE || "baduk",
  migrations: ["dist/shared/infra/typeorm/migrations/*.js"],
  entities: ["dist/modules/**/infra/typeorm/entities/*.js"],
  cli: {
    migrationsDir: "dist/shared/infra/typeorm/migrations",
    entitiesDir: "dist/modules/**/infra/typeorm/entities/*.js"
  }
}

 module.exports = process.env.NODE_ENV === 'test' ? devEnv : prodEnv;