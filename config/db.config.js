
module.exports = {
    HOST: "localhost",
    USER: process.env.USER,
    PASSWORD: process.env.PASSWORD,
    DB: "ddd_app",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
