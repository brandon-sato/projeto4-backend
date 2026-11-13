import { Appointment } from "./appointments";
import { AppointmentProcedure } from "./appointmentProcedures";
import { Category } from "./categories";
import { Client } from "./clients";
import { Procedure } from "./procedures";
import { ProcedureProfessional } from "./procedureProfessionals";
import { Professional } from "./professionals";

export function initializeAssociations(): void {
    Appointment.belongsTo(Client, { foreignKey: "id_cliente", as: "cliente" });
    Appointment.belongsTo(Professional, { foreignKey: "id_profissional", as: "profissional" });
    Appointment.belongsToMany(Procedure, {
        through: AppointmentProcedure,
        foreignKey: "id_atendimento",
        otherKey: "procedimento_id",
        as: "procedimentos"
    });

    Procedure.belongsTo(Category, { foreignKey: "id_categoria", as: "categoria" });
    Procedure.belongsToMany(Professional, {
        through: ProcedureProfessional,
        foreignKey: "id_procedimento",
        otherKey: "id_profissional",
        as: "profissionais"
    });

    Professional.belongsToMany(Procedure, {
        through: ProcedureProfessional,
        foreignKey: "id_profissional",
        otherKey: "id_procedimento",
        as: "procedimentos"
    });
}
