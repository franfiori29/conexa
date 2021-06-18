module.exports = [{
  name: "default",
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  // subscribers: ["src/subscribers/**/*.ts"],
  logging: process.env.DB_LOGGING === "true",
  cli: {
    entitiesDir: "src/entities",
    subscribersDir: "src/subscribers",
    migrationsDir: "src/migrations"
  }
}];
