import { Request, Response } from "express";
import {
    isRequestData,
    parseId,
    withErrorHandling
} from "./controllerUtils";
import { Appointment } from "../models/appointments";
import { AppointmentProcedure } from "../models/appointmentProcedures";
import { Procedure } from "../models/procedures";

export const createAppointmentProcedure = withErrorHandling(async (req: Request, res: Response) => {
    const data = req.body;
    if (
        !isRequestData(data)
        || typeof data.id_atendimento !== "number"
        || typeof data.procedimento_id !== "number"
    ) {
        res.status(400).json({ message: "Dados do procedimento do atendimento inválidos." });
        return;
    }

    const relation = AppointmentProcedure.build({
        id_atendimento: data.id_atendimento,
        procedimento_id: data.procedimento_id
    });
    const validationErrors = relation.validateAppointmentProcedureData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    const [appointment, procedure] = await Promise.all([
        Appointment.findByPk(data.id_atendimento),
        Procedure.findByPk(data.procedimento_id)
    ]);
    if (!appointment || !procedure) {
        res.status(400).json({ message: "Atendimento ou procedimento não encontrado." });
        return;
    }

    await relation.save();
    res.status(201).json(relation);
});

export const listAllAppointmentProcedures = withErrorHandling(async (_req: Request, res: Response) => {
    const relations = await AppointmentProcedure.findAll();
    res.json(relations);
});

export const findAppointmentProcedure = withErrorHandling(async (req: Request, res: Response) => {
    const idAtendimento = parseId(req.params.idAtendimento);
    const procedimentoId = parseId(req.params.procedimentoId);
    if (idAtendimento === null || procedimentoId === null) {
        res.status(400).json({ message: "IDs da associação inválidos." });
        return;
    }

    const relation = await AppointmentProcedure.findOne({
        where: { id_atendimento: idAtendimento, procedimento_id: procedimentoId }
    });
    if (!relation) {
        res.status(404).json({ message: "Associação não encontrada." });
        return;
    }

    res.json(relation);
});

export const deleteAppointmentProcedure = withErrorHandling(async (req: Request, res: Response) => {
    const idAtendimento = parseId(req.params.idAtendimento);
    const procedimentoId = parseId(req.params.procedimentoId);
    if (idAtendimento === null || procedimentoId === null) {
        res.status(400).json({ message: "IDs da associação inválidos." });
        return;
    }

    const relation = await AppointmentProcedure.findOne({
        where: { id_atendimento: idAtendimento, procedimento_id: procedimentoId }
    });
    if (!relation) {
        res.status(404).json({ message: "Associação não encontrada." });
        return;
    }

    await relation.destroy();
    res.sendStatus(204);
});
