import { Request, Response } from "express";
import {
    isRequestData,
    parseId,
    withErrorHandling
} from "./controllerUtils";
import { Category } from "../models/categories";

type CategoryData = Record<string, unknown> & {
    nome: string;
    descricao?: string | null;
};

function isCategoryData(data: Record<string, unknown>): data is CategoryData {
    return typeof data.nome === "string"
        && (data.descricao === undefined || data.descricao === null || typeof data.descricao === "string");
}

export const createCategory = withErrorHandling(async (req: Request, res: Response) => {
    const data = req.body;

    if (!isRequestData(data) || !isCategoryData(data)) {
        res.status(400).json({ message: "Dados da categoria inválidos." });
        return;
    }

    const category = Category.build({
        nome: data.nome,
        descricao: data.descricao ?? null
    });
    const validationErrors = category.validateCategoryData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    await category.save();
    res.status(201).json(category);
});

export const listAllCategories = withErrorHandling(async (_req: Request, res: Response) => {
    const categories = await Category.findAll();
    res.json(categories);
});

export const findCategoryById = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (id === null) {
        res.status(400).json({ message: "ID da categoria inválido." });
        return;
    }

    const category = await Category.findByPk(id);
    if (!category) {
        res.status(404).json({ message: "Categoria não encontrada." });
        return;
    }

    res.json(category);
});

export const updateCategory = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    const data = req.body;

    if (
        id === null
        || !isRequestData(data)
        || !isCategoryData(data)
    ) {
        res.status(400).json({ message: "Dados da categoria inválidos." });
        return;
    }

    const category = await Category.findByPk(id);
    if (!category) {
        res.status(404).json({ message: "Categoria não encontrada." });
        return;
    }

    category.nome = data.nome;
    category.descricao = data.descricao === undefined ? null : data.descricao;
    const validationErrors = category.validateCategoryData();
    if (validationErrors.length > 0) {
        res.status(400).json({ message: "Dados inválidos.", errors: validationErrors });
        return;
    }

    await category.save();
    res.json(category);
});

export const deleteCategory = withErrorHandling(async (req: Request, res: Response) => {
    const id = parseId(req.params.id);
    if (id === null) {
        res.status(400).json({ message: "ID da categoria inválido." });
        return;
    }

    const category = await Category.findByPk(id);
    if (!category) {
        res.status(404).json({ message: "Categoria não encontrada." });
        return;
    }

    await category.destroy();
    res.sendStatus(204);
});
