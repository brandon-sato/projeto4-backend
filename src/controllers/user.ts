import bcrypt = require("bcrypt");
import { Request, Response } from "express";
import { UniqueConstraintError } from "sequelize";
import { User } from "../models/users";

const BCRYPT_ROUNDS = 10;
const DUPLICATE_EMAIL_MESSAGE = "Este e-mail já está cadastrado.";

function isDuplicateEmailError(error: unknown): boolean {
    return error instanceof UniqueConstraintError
        && (Object.prototype.hasOwnProperty.call(error.fields, "email")
            || error.errors.some((validationError) => validationError.path === "email"));
}

async function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function createUser(req: Request, res: Response) {
    const data = req.body;

    if (
        typeof data?.name !== "string"
        || typeof data?.email !== "string"
        || typeof data?.cpf !== "string"
        || typeof data?.password !== "string"
    ) {
        return res.status(400).json({ message: "Dados de cadastro inválidos." });
    }

    if (Buffer.byteLength(data.password, "utf8") > 72) {
        return res.status(400).json({ message: "A senha deve ter no máximo 72 bytes." });
    }

    const newUser = User.build({
        name: data.name,
        email: data.email.trim().toLowerCase(),
        cpf: data.cpf,
        password: data.password
    });

    const validationErrors = newUser.validateUserData();
    if (validationErrors.length > 0) {
        return res.status(400).json({
            message: "Dados inválidos.",
            errors: validationErrors
        });
    }

    const existingUser = await User.findOne({ where: { email: newUser.email } });
    if (existingUser) {
        return res.status(409).json({ message: DUPLICATE_EMAIL_MESSAGE });
    }

    newUser.password = await hashPassword(data.password);
    try {
        await newUser.save();
    } catch (error: unknown) {
        if (isDuplicateEmailError(error)) {
            return res.status(409).json({ message: DUPLICATE_EMAIL_MESSAGE });
        }
        throw error;
    }

    return res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        cpf: newUser.cpf
    });
}

export async function listAllUsers(req: Request, res: Response) {
    const users = await User.findAll();
    return res.json(users);
}

export async function findUserById(req: Request, res: Response) {
    try {
        const data = req.params;

        const user = await User.findByPk(Number(data.id));

        if (!user) {
            return res.sendStatus(404);
        }

        return res.json(user);
    } catch {
        return res.status(500).json({ message: "Erro interno no servidor!" })
    }
}

export async function updateUser(req: Request, res: Response) {
    const data = req.body;
    const params = req.params;
    const id = Number(params.id);
    const authenticatedUserId = Number(res.locals.authUser?.id);

    if (!Number.isInteger(id) || authenticatedUserId !== id) {
        return res.status(403).json({ message: "Você só pode editar o seu próprio usuário." });
    }

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." })
    }

    if (typeof data?.password !== "string") {
        return res.status(400).json({ message: "Dados de cadastro inválidos." });
    }

    if (Buffer.byteLength(data.password, "utf8") > 72) {
        return res.status(400).json({ message: "A senha deve ter no máximo 72 bytes." });
    }

    user.name = data.name;
    if (typeof data?.email !== "string") {
        return res.status(400).json({ message: "Dados de cadastro inválidos." });
    }

    user.email = data.email.trim().toLowerCase();
    user.cpf = data.cpf;

    const validationErrors = user.validateUserData();
    if (validationErrors.length > 0) {
        return res.status(400).json({
            message: "Dados inválidos.",
            errors: validationErrors
        });
    }

    const existingUser = await User.findOne({ where: { email: user.email } });
    if (existingUser && existingUser.id !== user.id) {
        return res.status(409).json({ message: DUPLICATE_EMAIL_MESSAGE });
    }

    user.password = await hashPassword(data.password);
    try {
        await user.save();
    } catch (error: unknown) {
        if (isDuplicateEmailError(error)) {
            return res.status(409).json({ message: DUPLICATE_EMAIL_MESSAGE });
        }
        throw error;
    }

    return res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
    const params = req.params;
    const id = Number(params.id);
    const authenticatedUserId = Number(res.locals.authUser?.id);

    if (!Number.isInteger(id) || authenticatedUserId !== id) {
        return res.status(403).json({ message: "Você só pode excluir o seu próprio usuário." });
    }

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" })
    }

    await user.destroy();

    return res.sendStatus(204);
}