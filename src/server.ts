import express from "express";
import { connectToDb } from "./database/sequelize";
import { User } from "./models/users";
import { createUser, deleteUser, findUserById, listAllUsers, updateUser } from "./controllers/user";
import { login } from "./controllers/auth";
import dotenv from "dotenv"

dotenv.config()

const app = express();

app.use(express.json());

connectToDb()
.then(()=> {
    new User();
});

app.post("/users", createUser); // C
app.post("/users/login", login);
app.get("/users", listAllUsers);  // R
app.get("/users/:id", findUserById);
app.put("/users/:id", updateUser); // U
app.delete("/users/:id", deleteUser); //D

app.listen(Number(process.env.SERVER_PORT!), () => {
    console.log("Servidor rodando!");
})