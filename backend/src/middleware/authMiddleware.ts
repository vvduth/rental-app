import { NextFunction,Request, Response } from "express";
import jwt, { JwtPayload }  from "jsonwebtoken";

interface DecodedToken extends JwtPayload {
    sub: string; // User ID
    "custom:role": string; // User role
}

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string; // User ID from JWT
                role: string; 
            }; 
        }
    }
}

export const authMiddleware = (allowedRole: string[] ) => {
    return (req: Request, res: Response, next: NextFunction):void => {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        try {
            const decoded = jwt.decode(token) as DecodedToken;
            const userRole  = decoded["custom:role"] || "";
            req.user =  {
                id: decoded.sub,
                role: userRole,
            };
            const hasAccess = allowedRole.includes(userRole.toLowerCase());
            if (!hasAccess) {
                res.status(403).json({ message: "Forbidden" });
                return;
            }
        } catch (error) {
            console.error("JWT decoding error:", error);
            res.status(400).json({ message: "Invalid token" });
            return;
        }
        next();
    }
}