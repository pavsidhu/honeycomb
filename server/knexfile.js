const { knexSnakeCaseMappers } = require("objection");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  ...knexSnakeCaseMappers(),

  development: {
    client: "postgresql",
    connection: { database: "honeycomb", timezone: "utc" },
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
    debug: true,
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
      timezone: "utc",
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
      timezone: "utc",
    },
    pool: { min: 2, max: 10 },
    migrations: { tableName: "knex_migrations" },
  },
};
