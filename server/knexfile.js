module.exports = {
  development: {
    client: "pg",
    connection:
      process.env.DATABASE_URL ||
      `postgres://${process.env.USER}@127.0.0.1:5432/truckstop`,
    searchPath: "public",
    migrations: {
      directory: "./migrations",
    },
    useNullAsDefault: true,
  },
};
