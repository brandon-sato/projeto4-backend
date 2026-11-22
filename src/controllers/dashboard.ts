import { Request, Response } from "express";
import { QueryTypes } from "sequelize";
import { sequelize } from "../database/sequelize";
import { withErrorHandling } from "./controllerUtils";

type SummaryRow = {
    appointment_count: number | string;
    total_received: number | string;
    period_start: Date | string;
    period_end: Date | string;
};

type LeaderRow = {
    id: number | string;
    name: string;
    appointment_count: number | string;
};

export const getDashboard = withErrorHandling(async (_req: Request, res: Response) => {
    const [summary, topProcedure, topProfessional] = await Promise.all([
        sequelize.query<SummaryRow>(
            `SELECT COUNT(*) AS appointment_count,
                    COALESCE(SUM(valor), 0) AS total_received,
                    DATE_SUB(NOW(), INTERVAL 30 DAY) AS period_start,
                    NOW() AS period_end
             FROM atendimento
             WHERE data_atendimento >= DATE_SUB(NOW(), INTERVAL 30 DAY)
               AND data_atendimento <= NOW()`,
            { type: QueryTypes.SELECT },
        ),
        sequelize.query<LeaderRow>(
            `SELECT p.id, p.nome AS name, COUNT(*) AS appointment_count
             FROM atendimento a
             INNER JOIN atendimento_procedimento ap ON ap.id_atendimento = a.id
             INNER JOIN procedimento p ON p.id = ap.procedimento_id
             WHERE a.data_atendimento >= DATE_SUB(NOW(), INTERVAL 30 DAY)
               AND a.data_atendimento <= NOW()
             GROUP BY p.id, p.nome
             ORDER BY appointment_count DESC, p.nome ASC
             LIMIT 1`,
            { type: QueryTypes.SELECT },
        ),
        sequelize.query<LeaderRow>(
            `SELECT p.id, p.nome AS name, COUNT(*) AS appointment_count
             FROM atendimento a
             INNER JOIN profissional p ON p.id = a.id_profissional
             WHERE a.data_atendimento >= DATE_SUB(NOW(), INTERVAL 30 DAY)
               AND a.data_atendimento <= NOW()
             GROUP BY p.id, p.nome
             ORDER BY appointment_count DESC, p.nome ASC
             LIMIT 1`,
            { type: QueryTypes.SELECT },
        ),
    ]);
    const summaryRow = summary[0];
    if (!summaryRow) {
        throw new Error("Não foi possível calcular os indicadores do dashboard.");
    }

    res.json({
        periodStart: new Date(summaryRow.period_start).toISOString(),
        periodEnd: new Date(summaryRow.period_end).toISOString(),
        appointmentCount: Number(summaryRow.appointment_count),
        totalReceived: Number(summaryRow.total_received),
        mostPerformedProcedure: topProcedure[0]
            ? {
                id: Number(topProcedure[0].id),
                name: topProcedure[0].name,
                appointmentCount: Number(topProcedure[0].appointment_count),
            }
            : null,
        topProfessional: topProfessional[0]
            ? {
                id: Number(topProfessional[0].id),
                name: topProfessional[0].name,
                appointmentCount: Number(topProfessional[0].appointment_count),
            }
            : null,
    });
});