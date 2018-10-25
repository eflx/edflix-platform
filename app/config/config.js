module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.DB_HOST,
    dialect: "postgres",
    ssl: true,
    dialectOptions: {
      ssl: true
    },
    defines: {
      underscored: true
    }
  }
};
