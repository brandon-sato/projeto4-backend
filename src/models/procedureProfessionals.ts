import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class ProcedureProfessional extends Model {
    declare public id_procedimento: number;
    declare public id_profissional: number;

    public validateProcedureProfessionalData(): string[] {
        const errors: string[] = [];

        if (!Number.isInteger(this.id_procedimento) || this.id_procedimento <= 0) {
            errors.push("O ID do procedimento deve ser um inteiro positivo.");
        }
        if (!Number.isInteger(this.id_profissional) || this.id_profissional <= 0) {
            errors.push("O ID do profissional deve ser um inteiro positivo.");
        }

        return errors;
    }
}

ProcedureProfessional.init({
    id_procedimento: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id_profissional: {
        type: DataTypes.INTEGER,
        primaryKey: true
    }
}, {
    tableName: "procedimento_profissional",
    timestamps: false,
    sequelize
});
