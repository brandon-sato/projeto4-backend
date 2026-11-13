import { Request, Response } from "express";
import {
    isRequestData,
    parseId,
    withErrorHandling
} from "./controllerUtils";
import { Category } from "../models/categories";
import { Procedure } from "../models/procedures";

type ProcedureData = Record<string, unknown> & {
    nome: string;
    descricao?: string | null;
    duracaoMinutos: number;
    preco: number;
    id_categoria: number;
};

function isValidProcedureData(data: Record<string, unknown>): data is ProcedureData {
    return typeof data.nome === "string"
        && (data.descricao === undefined || data.descricao === null || typeof data.descricao === "string")
        && typeof data.duracaoMinutos === "number"
        && typeof data.preco === "number"
        && typeof data.id_categoria === "number";
}

export const createProcedure = withErrorHandling(async (req: Request, res: Response) => {
    const data = req.body;
    if (!isRequestData(data) || !isValidProcedureData(data)) {
        res.status(400).json({ message: "Dados do procedimento inválidos." });
        return;
    }

    const procedure = Procedure.build({
        nome: data.nome,
        descricao: data.descricao ?? null,
        duracaoMinutos: data.duracaoMinutos,
        preco: data.preco,
        id_categoria: data.id_categoria
    });
    const validationErrors = procedure.validateProcedureData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    const category = await Category.findByPk(data.id_categoria);
    if (!category) {
        res.status(400).json({ message: "Categoria não encontrada." });
        return;
    }

    await procedure.save();
    res.status(201).json(procedure);
});

export const listAllProcedures = withErrorHandling(async (_req: Request, res: Response) => {
    const procedures = await Procedure.findAll();
    res.json(procedures);
});

export const findProcedureById = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (id === null) {
        res.status(400).json({ message: "ID do procedimento inválido." });
        return;
    }

    const procedure = await Procedure.findByPk(id);
    if (!procedure) {
        res.status(404).json({ message: "Procedimento não encontrado." });
        return;
    }

    res.json(procedure);
});

export const updateProcedure = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const data = req.body;
    if (id === null || !isRequestData(data) || !isValidProcedureData(data)) {
        res.status(400).json({ message: "Dados do procedimento inválidos." });
        return;
    }

    const [procedure, category] = await Promise.all([
        Procedure.findByPk(id),
        Category.findByPk(data.id_categoria)
    ]);

    if (!procedure) {
        res.status(404).json({ message: "Procedimento não encontrado." });
        return;
    }
    if (!category) {
        res.status(400).json({ message: "Categoria não encontrada." });
        return;
    }

    procedure.nome = data.nome;
    procedure.descricao = data.descricao ?? null;
    procedure.duracaoMinutos = data.duracaoMinutos;
    procedure.preco = data.preco;
    procedure.id_categoria = data.id_categoria;
    const validationErrors = procedure.validateProcedureData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    await procedure.save();
    res.json(procedure);
});

export const deleteProcedure = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (id === null) {
        res.status(400).json({ message: "ID do procedimento inválido." });
        return;
    }

    const procedure = await Procedure.findByPk(id);
    if (!procedure) {
        res.status(404).json({ message: "Procedimento não encontrado." });
        return;
    }

    await procedure.destroy();
    res.sendStatus(204);
});
