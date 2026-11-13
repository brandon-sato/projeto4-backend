import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Professional extends Model {
    declare public id: number;
    declare public nome: string;
    declare public contato: string | null;
    declare public dt_nasc: string;
    declare public sexo: string;
    declare public especialidade: string | null;

    private isNameValid(): boolean {
        return typeof this.nome === "string"
            && this.nome.trim().length > 0
            && this.nome.length <= 100;
    }

    private isContactValid(): boolean {
        return this.contato === undefined
            || this.contato === null
            || /^\d{11}$/.test(this.contato);
    }

    private isBirthDateValid(): boolean {
        if (typeof this.dt_nasc !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(this.dt_nasc)) {
            return false;
        }

        const date = new Date(`${this.dt_nasc}T00:00:00.000Z`);
        return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === this.dt_nasc;
    }

    private isSexValid(): boolean {
        return typeof this.sexo === "string" && this.sexo.length === 1;
    }

    private isSpecialtyValid(): boolean {
        return this.especialidade === undefined
            || this.especialidade === null
            || (typeof this.especialidade === "string" && this.especialidade.length <= 100);
    }

    public validateProfessionalData(): string[] {
        const errors: string[] = [];

        if (!this.isNameValid()) {
            errors.push("O nome deve ter até 100 caracteres e não pode ficar vazio.");
        }
        if (!this.isContactValid()) {
            errors.push("O contato deve conter 11 dígitos numéricos.");
        }
        if (!this.isBirthDateValid()) {
            errors.push("A data de nascimento é inválida.");
        }
        if (!this.isSexValid()) {
            errors.push("O sexo deve conter um caractere.");
        }
        if (!this.isSpecialtyValid()) {
            errors.push("A especialidade deve ter até 100 caracteres.");
        }

        return errors;
    }
}

Professional.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    contato: {
        type: DataTypes.STRING(11),
        allowNull: true
    },
    dt_nasc: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: "1000-01-01"
    },
    sexo: {
        type: DataTypes.CHAR(1),
        allowNull: false,
        defaultValue: "n"
    },
    especialidade: {
        type: DataTypes.STRING(100),
        allowNull: true
    }
}, {
    tableName: "profissional",
    timestamps: false,
    sequelize
});
