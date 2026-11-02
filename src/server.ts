import express from "express";
import { connectToDb } from "./database/sequelize";
import { User } from "./models/users";
import { createUser, deleteUser, findUserById, listAllUsers, loginUser, updateUser } from "./controllers/user";

const app = express();

app.use(express.json());

connectToDb()
.then(()=> {
    new User();
});

app.post("/users", createUser); // C
app.post("/users/login", loginUser);
app.get("/users", listAllUsers);  // R
app.get("/users/:id", findUserById);
app.put("/users/:id", updateUser); // U
app.delete("/users/:id", deleteUser); //D

app.listen(3001, () => {
    console.log("Servidor rodando em http://localhost:3001");
})