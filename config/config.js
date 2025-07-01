// config/config.js
require("dotenv").config(); // ← 加入這行支援 .env

module.exports = {
  development: {
    username: "root",
    password: "password",
    database: "forum",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // ← Render 的 PostgreSQL 需要這個
      },
    },
  },
};
