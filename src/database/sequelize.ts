import { Sequelize } from "sequelize";
import dotenv from "dotenv"

dotenv.config()

export const sequelize = new Sequelize({
    dialect: "mysql",
    database: process.env.MYSQL_DATABASE!,
    username: process.env.MYSQL_USERNAME!,
    password: process.env.MYSQL_PASSWORD!,
    port: Number(process.env.MYSQL_PORT!),
    host: process.env.MYSQL_HOST!
});

export async function connectToDb() {2
    try {
        await sequelize.authenticate();
    
        console.log("Conectado ao banco de dados com sucesso!");
    
        await sequelize.sync();
    
    }catch (err) {
        console.error(err)
        console.log("")
    }
}