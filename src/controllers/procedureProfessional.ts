import { Request, Response } from "express";
import {
    isRequestData,
    parseId,
    withErrorHandling
} from "./controllerUtils";
import { Procedure } from "../models/procedures";
import { ProcedureProfessional } from "../models/procedureProfessionals";
import { Professional } from "../models/professionals";

export const createProcedureProfessional = withErrorHandling(async (req: Request, res: Response) => {
    const data = req.body;
    if (
        !isRequestData(data)
        || typeof data.id_procedimento !== "number"
        || typeof data.id_profissional !== "number"
    ) {
        res.status(400).json({ message: "Dados da associação inválidos." });
        return;
    }

    const relation = ProcedureProfessional.build({
        id_procedimento: data.id_procedimento,
        id_profissional: data.id_profissional
    });
    const validationErrors = relation.validateProcedureProfessionalData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    const [procedure, professional] = await Promise.all([
        Procedure.findByPk(data.id_procedimento),
        Professional.findByPk(data.id_profissional)
    ]);
    if (!procedure || !professional) {
        res.status(400).json({ message: "Procedimento ou profissional não encontrado." });
        return;
    }

    await relation.save();
    res.status(201).json(relation);
});

export const listAllProcedureProfessionals = withErrorHandling(async (_req: Request, res: Response) => {
    const relations = await ProcedureProfessional.findAll();
    res.json(relations);
});

export const findProcedureProfessional = withErrorHandling(async (req: Request, res: Response) => {
    const idProcedimento = parseId(req.params.idProcedimento);
    const idProfissional = parseId(req.params.idProfissional);
    if (idProcedimento === null || idProfissional === null) {
        res.status(400).json({ message: "IDs da associação inválidos." });
        return;
    }

    const relation = await ProcedureProfessional.findOne({
        where: {
            id_procedimento: idProcedimento,
            id_profissional: idProfissional
        }
    });
    if (!relation) {
        res.status(404).json({ message: "Associação não encontrada." });
        return;
    }

    res.json(relation);
});

export const deleteProcedureProfessional = withErrorHandling(async (req: Request, res: Response) => {
    const idProcedimento = parseId(req.params.idProcedimento);
    const idProfissional = parseId(req.params.idProfissional);
    if (idProcedimento === null || idProfissional === null) {
        res.status(400).json({ message: "IDs da associação inválidos." });
        return;
    }

    const relation = await ProcedureProfessional.findOne({
        where: {
            id_procedimento: idProcedimento,
            id_profissional: idProfissional
        }
    });
    if (!relation) {
        res.status(404).json({ message: "Associação não encontrada." });
        return;
    }

    await relation.destroy();
    res.sendStatus(204);
});
