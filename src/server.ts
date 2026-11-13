import express from "express";
import { connectToDb } from "./database/sequelize";
import { User } from "./models/users";
import { createUser, deleteUser, findUserById, listAllUsers, updateUser } from "./controllers/user";
import { login } from "./controllers/auth";
import dotenv from "dotenv"
import { authMiddleware } from "./middlewares/authMiddleware";
import { initializeAssociations } from "./models/associations";
import {
    createCategory,
    deleteCategory,
    findCategoryById,
    listAllCategories,
    updateCategory
} from "./controllers/category";
import {
    createClient,
    deleteClient,
    findClientById,
    listAllClients,
    updateClient
} from "./controllers/client";
import {
    createProfessional,
    deleteProfessional,
    findProfessionalById,
    listAllProfessionals,
    updateProfessional
} from "./controllers/professional";
import {
    createProcedure,
    deleteProcedure,
    findProcedureById,
    listAllProcedures,
    updateProcedure
} from "./controllers/procedure";
import {
    createAppointment,
    deleteAppointment,
    findAppointmentById,
    listAllAppointments,
    updateAppointment
} from "./controllers/appointment";
import {
    createAppointmentProcedure,
    deleteAppointmentProcedure,
    findAppointmentProcedure,
    listAllAppointmentProcedures
} from "./controllers/appointmentProcedure";
import {
    createProcedureProfessional,
    deleteProcedureProfessional,
    findProcedureProfessional,
    listAllProcedureProfessionals
} from "./controllers/procedureProfessional";

dotenv.config()

const app = express();

app.use(express.json());

initializeAssociations();

connectToDb()
.then(()=> {
    new User();
});

app.post("/users", createUser); // C
app.post("/users/login", login);

app.use(authMiddleware);


app.get("/users", listAllUsers);  // R
app.get("/users/:id", findUserById);
app.put("/users/:id", updateUser); // U
app.delete("/users/:id", deleteUser); //D

app.get("/clients", listAllClients);
app.get("/clients/:id", findClientById);
app.post("/clients", createClient);
app.put("/clients/:id", updateClient);
app.delete("/clients/:id", deleteClient);

app.get("/professionals", listAllProfessionals);
app.get("/professionals/:id", findProfessionalById);
app.post("/professionals", createProfessional);
app.put("/professionals/:id", updateProfessional);
app.delete("/professionals/:id", deleteProfessional);

app.get("/categories", listAllCategories);
app.get("/categories/:id", findCategoryById);
app.post("/categories", createCategory);
app.put("/categories/:id", updateCategory);
app.delete("/categories/:id", deleteCategory);

app.get("/procedures", listAllProcedures);
app.get("/procedures/:id", findProcedureById);
app.post("/procedures", createProcedure);
app.put("/procedures/:id", updateProcedure);
app.delete("/procedures/:id", deleteProcedure);

app.get("/appointments", listAllAppointments);
app.get("/appointments/:id", findAppointmentById);
app.post("/appointments", createAppointment);
app.put("/appointments/:id", updateAppointment);
app.delete("/appointments/:id", deleteAppointment);

app.get("/appointment-procedures", listAllAppointmentProcedures);
app.get("/appointment-procedures/:idAtendimento/:procedimentoId", findAppointmentProcedure);
app.post("/appointment-procedures", createAppointmentProcedure);
app.delete("/appointment-procedures/:idAtendimento/:procedimentoId", deleteAppointmentProcedure);

app.get("/procedure-professionals", listAllProcedureProfessionals);
app.get("/procedure-professionals/:idProcedimento/:idProfissional", findProcedureProfessional);
app.post("/procedure-professionals", createProcedureProfessional);
app.delete("/procedure-professionals/:idProcedimento/:idProfissional", deleteProcedureProfessional);

app.listen(Number(process.env.SERVER_PORT!), () => {
    console.log("Iniciando servidor!");
})