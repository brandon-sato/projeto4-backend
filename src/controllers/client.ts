import { Request, Response } from "express";
import {
    isRequestData,
    parseId,
    withErrorHandling
} from "./controllerUtils";
import { Client } from "../models/clients";

type ClientData = Record<string, unknown> & {
    nome: string;
    dt_nasc: string;
    sexo: string;
    contato?: string | null;
    cpf?: string | null;
};

function isValidClientData(data: Record<string, unknown>): data is ClientData {
    return typeof data.nome === "string"
        && typeof data.dt_nasc === "string"
        && typeof data.sexo === "string"
        && (data.contato === undefined || data.contato === null || typeof data.contato === "string")
        && (data.cpf === undefined || data.cpf === null || typeof data.cpf === "string");
}

export const createClient = withErrorHandling(async (req: Request, res: Response) => {
    const data = req.body;
    if (!isRequestData(data) || !isValidClientData(data)) {
        res.status(400).json({ message: "Dados do cliente inválidos." });
        return;
    }

    const client = Client.build({
        nome: data.nome,
        dt_nasc: data.dt_nasc,
        sexo: data.sexo,
        contato: data.contato ?? null,
        cpf: data.cpf ?? null
    });
    const validationErrors = client.validateClientData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    await client.save();
    res.status(201).json(client);
});

export const listAllClients = withErrorHandling(async (_req: Request, res: Response) => {
    const clients = await Client.findAll();
    res.json(clients);
});

export const findClientById = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (id === null) {
        res.status(400).json({ message: "ID do cliente inválido." });
        return;
    }

    const client = await Client.findByPk(id);
    if (!client) {
        res.status(404).json({ message: "Cliente não encontrado." });
        return;
    }

    res.json(client);
});

export const updateClient = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const data = req.body;
    if (id === null || !isRequestData(data) || !isValidClientData(data)) {
        res.status(400).json({ message: "Dados do cliente inválidos." });
        return;
    }

    const client = await Client.findByPk(id);
    if (!client) {
        res.status(404).json({ message: "Cliente não encontrado." });
        return;
    }

    client.nome = data.nome;
    client.dt_nasc = data.dt_nasc;
    client.sexo = data.sexo;
    client.contato = data.contato ?? null;
    client.cpf = data.cpf ?? null;
    const validationErrors = client.validateClientData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    await client.save();
    res.json(client);
});

export const deleteClient = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (id === null) {
        res.status(400).json({ message: "ID do cliente inválido." });
        return;
    }

    const client = await Client.findByPk(id);
    if (!client) {
        res.status(404).json({ message: "Cliente não encontrado." });
        return;
    }

    await client.destroy();
    res.sendStatus(204);
});
