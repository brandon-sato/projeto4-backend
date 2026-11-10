import bcrypt = require("bcrypt");
import { Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { User } from "../models/users";

export async function login(req: Request, res: Response) {
    const { email, password } = req.body ?? {};

    if (typeof email !== "string" || typeof password !== "string") {
        return res.status(400).json({ message: "E-mail e senha são obrigatórios." });
    }

    if (Buffer.byteLength(password, "utf8") > 72) {
        return res.status(401).json({ message: "E-mail ou senha inválidos." });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).json({ message: "E-mail ou senha inválidos." });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({ message: "Configuração de autenticação indisponível." });
    }

    const token = sign(
        { id: user.id, email: user.email, name: user.name },
        jwtSecret,
        { algorithm: "HS256", expiresIn: "1h" }
    );

    return res.json({
        user: {
            id: user.id,
            name: user.name,
            email: user.email
        },
        token
    });
}
