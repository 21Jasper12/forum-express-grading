module.exports = {
  development: {
    username: "postgres",
    password: "password",
    database: "forum",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  // production: {
  //   username: process.env.DB_USER,
  //   password: process.env.DB_PASS,
  //   database: process.env.DB_NAME,
  //   host: process.env.DB_HOST,
  //   port: 5432,
  //   dialect: "postgres",
  //   dialectOptions: {
  //     ssl: {
  //       require: true,
  //       rejectUnauthorized: false,
  //     },
  //   },
  // },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // 必須為 false，否則會出現 SSL 認證錯誤
      },
    },
  },
};
