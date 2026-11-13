import { Request, Response } from "express";
import {
    isRequestData,
    parseId,
    withErrorHandling
} from "./controllerUtils";
import { Appointment } from "../models/appointments";
import { Client } from "../models/clients";
import { Professional } from "../models/professionals";

type AppointmentData = Record<string, unknown> & {
    id_cliente: number;
    id_profissional: number;
    data_atendimento: string;
    valor: number;
};

function isValidAppointmentData(data: Record<string, unknown>): data is AppointmentData {
    return typeof data.id_cliente === "number"
        && typeof data.id_profissional === "number"
        && typeof data.data_atendimento === "string"
        && typeof data.valor === "number";
}

export const createAppointment = withErrorHandling(async (req: Request, res: Response) => {
    const data = req.body;
    if (!isRequestData(data) || !isValidAppointmentData(data)) {
        res.status(400).json({ message: "Dados do atendimento inválidos." });
        return;
    }

    const appointment = Appointment.build({
        id_cliente: data.id_cliente,
        id_profissional: data.id_profissional,
        data_atendimento: new Date(data.data_atendimento),
        valor: data.valor
    });
    const validationErrors = appointment.validateAppointmentData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    const [client, professional] = await Promise.all([
        Client.findByPk(data.id_cliente),
        Professional.findByPk(data.id_profissional)
    ]);
    if (!client || !professional) {
        res.status(400).json({ message: "Cliente ou profissional não encontrado." });
        return;
    }

    await appointment.save();
    res.status(201).json(appointment);
});

export const listAllAppointments = withErrorHandling(async (_req: Request, res: Response) => {
    const appointments = await Appointment.findAll();
    res.json(appointments);
});

export const findAppointmentById = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (id === null) {
        res.status(400).json({ message: "ID do atendimento inválido." });
        return;
    }

    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
        res.status(404).json({ message: "Atendimento não encontrado." });
        return;
    }

    res.json(appointment);
});

export const updateAppointment = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const data = req.body;
    if (id === null || !isRequestData(data) || !isValidAppointmentData(data)) {
        res.status(400).json({ message: "Dados do atendimento inválidos." });
        return;
    }

    const [appointment, client, professional] = await Promise.all([
        Appointment.findByPk(id),
        Client.findByPk(data.id_cliente),
        Professional.findByPk(data.id_profissional)
    ]);
    if (!appointment) {
        res.status(404).json({ message: "Atendimento não encontrado." });
        return;
    }
    if (!client || !professional) {
        res.status(400).json({ message: "Cliente ou profissional não encontrado." });
        return;
    }

    appointment.id_cliente = data.id_cliente;
    appointment.id_profissional = data.id_profissional;
    appointment.data_atendimento = new Date(data.data_atendimento);
    appointment.valor = data.valor;
    const validationErrors = appointment.validateAppointmentData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    await appointment.save();
    res.json(appointment);
});

export const deleteAppointment = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (id === null) {
        res.status(400).json({ message: "ID do atendimento inválido." });
        return;
    }

    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
        res.status(404).json({ message: "Atendimento não encontrado." });
        return;
    }

    await appointment.destroy();
    res.sendStatus(204);
});
