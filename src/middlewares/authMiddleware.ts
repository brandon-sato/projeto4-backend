import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";


export async function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res
            .status(401)
            .json({ message: "Autorização do Header nescessária." })
    }

    const token = authHeader.replace("Bearer", "").trim()

    try {
        const JWT_SECRET = process.env.JWT_SECRET!

        verify(token, JWT_SECRET, { algorithms: ["HS256"] })

        return next();
    } catch {
        return res
        .status(401)
        .json({ message: "Token inválido"})
    }
    
}