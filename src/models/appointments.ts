import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Appointment extends Model {
    declare public id: number;
    declare public id_cliente: number;
    declare public id_profissional: number;
    declare public data_atendimento: Date;
    declare public valor: number;

    private areRelatedIdsValid(): boolean {
        return Number.isInteger(this.id_cliente)
            && this.id_cliente > 0
            && Number.isInteger(this.id_profissional)
            && this.id_profissional > 0;
    }

    private isDateValid(): boolean {
        return this.data_atendimento instanceof Date
            && !Number.isNaN(this.data_atendimento.getTime());
    }

    private isAmountPositive(): boolean {
        const amount = Number(this.valor);
        if (!Number.isFinite(amount) || amount <= 0 || amount > 99999999.99) {
            return false;
        }

        const cents = amount * 100;
        return Math.abs(cents - Math.round(cents)) < 0.0000001;
    }

    public validateAppointmentData(): string[] {
        const errors: string[] = [];

        if (!this.areRelatedIdsValid()) {
            errors.push("Cliente e profissional devem ser IDs inteiros positivos.");
        }
        if (!this.isDateValid()) {
            errors.push("A data do atendimento é inválida.");
        }
        if (!this.isAmountPositive()) {
            errors.push("O valor do atendimento deve ser positivo e ter no máximo duas casas decimais.");
        }

        return errors;
    }
}

Appointment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_cliente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_profissional: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_atendimento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    valor: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
}, {
    tableName: "atendimento",
    timestamps: false,
    sequelize
});
