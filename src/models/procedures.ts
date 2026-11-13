import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Procedure extends Model {
    declare public id: number;
    declare public nome: string;
    declare public descricao: string | null;
    declare public duracaoMinutos: number;
    declare public preco: number;
    declare public id_categoria: number;

    private isNameValid(): boolean {
        return typeof this.nome === "string"
            && this.nome.trim().length > 0
            && this.nome.length <= 150;
    }

    private isDescriptionValid(): boolean {
        return this.descricao === undefined
            || this.descricao === null
            || (typeof this.descricao === "string" && this.descricao.length <= 500);
    }

    private isDurationValid(): boolean {
        return Number.isInteger(this.duracaoMinutos) && this.duracaoMinutos > 0;
    }

    private isPricePositive(): boolean {
        const price = Number(this.preco);
        if (!Number.isFinite(price) || price <= 0 || price > 99999999.99) {
            return false;
        }

        const cents = price * 100;
        return Math.abs(cents - Math.round(cents)) < 0.0000001;
    }

    private isCategoryIdValid(): boolean {
        return Number.isInteger(this.id_categoria) && this.id_categoria > 0;
    }

    public validateProcedureData(): string[] {
        const errors: string[] = [];

        if (!this.isNameValid()) {
            errors.push("O nome deve ter até 150 caracteres e não pode ficar vazio.");
        }
        if (!this.isDescriptionValid()) {
            errors.push("A descrição deve ter até 500 caracteres.");
        }
        if (!this.isDurationValid()) {
            errors.push("A duração deve ser um número inteiro positivo.");
        }
        if (!this.isPricePositive()) {
            errors.push("O preço deve ser positivo e ter no máximo duas casas decimais.");
        }
        if (!this.isCategoryIdValid()) {
            errors.push("A categoria informada é inválida.");
        }

        return errors;
    }
}

Procedure.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(500),
        allowNull: true
    },
    duracaoMinutos: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    preco: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    id_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: "procedimento",
    timestamps: false,
    sequelize
});
