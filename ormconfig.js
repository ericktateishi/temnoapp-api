module.exports = [
  {
    name: "default",
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
    synchronize: true,
    entities: [
      `./${process.env.APP_BASE_PATH}/providers/database/typeorm/**/schemas/*`
    ]
  }
];
