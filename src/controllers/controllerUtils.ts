import { NextFunction, Request, RequestHandler, Response } from "express";
import {
    ForeignKeyConstraintError,
    UniqueConstraintError,
    ValidationError
} from "sequelize";

export type RequestData = Record<string, unknown>;

type AsyncController = (req: Request, res: Response) => Promise<void>;

export function withErrorHandling(controller: AsyncController): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await controller(req, res);
        } catch (error) {
            console.error("Erro ao acessar o banco de dados:", error);

            if (res.headersSent) {
                return next(error);
            }

            if (error instanceof UniqueConstraintError) {
                res.status(409).json({ message: "Já existe um registro com esses dados." });
                return;
            }

            if (error instanceof ForeignKeyConstraintError) {
                res.status(409).json({ message: "O registro está relacionado a outros dados." });
                return;
            }

            if (error instanceof ValidationError) {
                res.status(400).json({ message: "Dados inválidos." });
                return;
            }

            res.status(500).json({ message: "Erro interno no servidor." });
        }
    };
}

export function isRequestData(value: unknown): value is RequestData {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function isText(value: unknown, maxLength: number): value is string {
    return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

export function isNullableText(value: unknown, maxLength: number): value is string | null {
    return value === null || (typeof value === "string" && value.length <= maxLength);
}

export function isPositiveInteger(value: unknown): value is number {
    return typeof value === "number" && Number.isInteger(value) && value > 0;
}

export function parseId(value: unknown): number | null {
    if (typeof value !== "string" || !/^\d+$/.test(value)) {
        return null;
    }

    const id = Number(value);
    return isPositiveInteger(id) ? id : null;
}

export function isDateOnly(value: unknown): value is string {
    if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const parsedDate = new Date(`${value}T00:00:00.000Z`);
    return !Number.isNaN(parsedDate.getTime())
        && parsedDate.toISOString().slice(0, 10) === value;
}

export function isDateTime(value: unknown): value is string {
    return typeof value === "string"
        && value.length > 0
        && !Number.isNaN(Date.parse(value));
}

export function isNonNegativeNumber(value: unknown): value is number {
    return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

export function isCurrencyAmount(value: unknown): value is number {
    if (!isNonNegativeNumber(value) || value > 99999999.99) {
        return false;
    }

    const cents = value * 100;
    return Math.abs(cents - Math.round(cents)) < 0.0000001;
}
