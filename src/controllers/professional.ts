import { Request, Response } from "express";
import {
    isRequestData,
    parseId,
    withErrorHandling
} from "./controllerUtils";
import { Professional } from "../models/professionals";

type ProfessionalData = Record<string, unknown> & {
    nome: string;
    contato?: string | null;
    dt_nasc?: string;
    sexo?: string;
    especialidade?: string | null;
};

function isValidProfessionalData(data: Record<string, unknown>): data is ProfessionalData {
    return typeof data.nome === "string"
        && (data.contato === undefined || data.contato === null || typeof data.contato === "string")
        && (data.dt_nasc === undefined || typeof data.dt_nasc === "string")
        && (data.sexo === undefined || typeof data.sexo === "string")
        && (
            data.especialidade === undefined
            || data.especialidade === null
            || typeof data.especialidade === "string"
        );
}

export const createProfessional = withErrorHandling(async (req: Request, res: Response) => {
    const data = req.body;
    if (!isRequestData(data) || !isValidProfessionalData(data)) {
        res.status(400).json({ message: "Dados do profissional inválidos." });
        return;
    }

    const professional = Professional.build({
        nome: data.nome,
        ...(data.contato !== undefined && { contato: data.contato }),
        ...(data.dt_nasc !== undefined && { dt_nasc: data.dt_nasc }),
        ...(data.sexo !== undefined && { sexo: data.sexo }),
        ...(data.especialidade !== undefined && { especialidade: data.especialidade })
    });
    const validationErrors = professional.validateProfessionalData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    await professional.save();
    res.status(201).json(professional);
});

export const listAllProfessionals = withErrorHandling(async (_req: Request, res: Response) => {
    const professionals = await Professional.findAll();
    res.json(professionals);
});

export const findProfessionalById = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (id === null) {
        res.status(400).json({ message: "ID do profissional inválido." });
        return;
    }

    const professional = await Professional.findByPk(id);
    if (!professional) {
        res.status(404).json({ message: "Profissional não encontrado." });
        return;
    }

    res.json(professional);
});

export const updateProfessional = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const data = req.body;
    if (id === null || !isRequestData(data) || !isValidProfessionalData(data)) {
        res.status(400).json({ message: "Dados do profissional inválidos." });
        return;
    }

    const professional = await Professional.findByPk(id);
    if (!professional) {
        res.status(404).json({ message: "Profissional não encontrado." });
        return;
    }

    professional.nome = data.nome;
    professional.contato = data.contato ?? null;
    professional.dt_nasc = data.dt_nasc ?? "1000-01-01";
    professional.sexo = data.sexo ?? "n";
    professional.especialidade = data.especialidade ?? null;
    const validationErrors = professional.validateProfessionalData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    await professional.save();
    res.json(professional);
});

export const deleteProfessional = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (id === null) {
        res.status(400).json({ message: "ID do profissional inválido." });
        return;
    }

    const professional = await Professional.findByPk(id);
    if (!professional) {
        res.status(404).json({ message: "Profissional não encontrado." });
        return;
    }

    await professional.destroy();
    res.sendStatus(204);
});
