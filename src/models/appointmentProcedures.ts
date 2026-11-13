import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class AppointmentProcedure extends Model {
    declare public id_atendimento: number;
    declare public procedimento_id: number;

    public validateAppointmentProcedureData(): string[] {
        const errors: string[] = [];

        if (!Number.isInteger(this.id_atendimento) || this.id_atendimento <= 0) {
            errors.push("O ID do atendimento deve ser um inteiro positivo.");
        }
        if (!Number.isInteger(this.procedimento_id) || this.procedimento_id <= 0) {
            errors.push("O ID do procedimento deve ser um inteiro positivo.");
        }

        return errors;
    }
}

AppointmentProcedure.init({
    id_atendimento: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    procedimento_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: "atendimento_procedimento",
    timestamps: false,
    sequelize
});
