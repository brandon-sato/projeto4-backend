import { createHash, timingSafeEqual } from "crypto";
import { Request, Response } from "express";
import { User } from "../models/users";

function hashPassword(password: string): string {
    return createHash("sha256").update(password, "utf8").digest("hex");
}

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !/^[a-f0-9]{64}$/i.test(user.password)) {
        return res.status(401).json({ message: "E-mail ou senha inválidos." });
    }

    const submittedHash = Buffer.from(hashPassword(password), "hex");
    const storedHash = Buffer.from(user.password, "hex");
    if (!timingSafeEqual(submittedHash, storedHash)) {
        return res.status(401).json({ message: "E-mail ou senha inválidos." });
    }

    return res.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        }
    });
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

    const newUser = User.build({
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        password: hashPassword(data.password)
    });

    const validationErrors = newUser.validateUserData();
    if (validationErrors.length > 0) {
        return res.status(400).json({
            message: "Dados inválidos.",
            errors: validationErrors
        });
    }

    await newUser.save();
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

    const user = await User.findByPk(Number(params.id));

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado." })
    }

    user.name = data.name;
    user.email = data.email;
    user.cpf = data.cpf;
    user.password = hashPassword(data.password);

    const validationErrors = user.validateUserData();
    if (validationErrors.length > 0) {
        return res.status(400).json({
            message: "Dados inválidos.",
            errors: validationErrors
        });
    }

    await user.save();

    return res.json(user);
}

export async function deleteUser(req: Request, res: Response) {
    const params = req.params;
    const id = Number(params.id);

    const user = await User.findByPk(id);

    if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" })
    }

    await user.destroy();

    return res.sendStatus(204);
}