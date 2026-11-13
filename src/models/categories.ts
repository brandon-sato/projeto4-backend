import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/sequelize";

export class Category extends Model {
    declare public id: number;
    declare public nome: string;
    declare public descricao: string | null;

    public validateCategoryData(): string[] {
        const errors: string[] = [];

        if (typeof this.nome !== "string" || this.nome.trim().length === 0 || this.nome.length > 100) {
            errors.push("O nome deve ter até 100 caracteres e não pode ficar vazio.");
        }
        if (
            this.descricao !== undefined
            && this.descricao !== null
            && (typeof this.descricao !== "string" || this.descricao.length > 500)
        ) {
            errors.push("A descrição deve ter até 500 caracteres.");
        }

        return errors;
    }
}

Category.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING(500),
        allowNull: true
    }
}, {
    tableName: "categoria",
    timestamps: false,
    sequelize
});
