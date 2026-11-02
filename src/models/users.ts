import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class User extends Model {
    declare id: number;
    declare name: string;
    declare email: string;
    declare cpf: string;
    declare password: string;

    isEmailValid(): boolean {
        return typeof this.email === "string"
            && this.email.length <= 150
            && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email);
    }

    isCpfValid(): boolean {
        if (typeof this.cpf !== "string" || !/^\d{11}$/.test(this.cpf)) {
            return false;
        }

        if (/^(\d)\1{10}$/.test(this.cpf)) {
            return false;
        }

        const digits = [...this.cpf].map(Number);
        const calculateDigit = (length: number): number => {
            const sum = digits
                .slice(0, length)
                .reduce((total, digit, index) => total + digit * (length + 1 - index), 0);
            const remainder = (sum * 10) % 11;
            return remainder === 10 ? 0 : remainder;
        };

        return calculateDigit(9) === digits[9]
            && calculateDigit(10) === digits[10];
    }

    validateUserData(): string[] {
        const errors: string[] = [];

        if (!this.isEmailValid()) {
            errors.push("E-mail inválido.");
        }

        if (!this.isCpfValid()) {
            errors.push("CPF inválido. Informe um CPF válido com 11 dígitos numéricos.");
        }

        return errors;
    }
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(11),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(150),
        allowNull: true
    }
}, {
    tableName: "users",
    timestamps: true,
    sequelize: sequelize
});
