
import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export const getManager = async (req:Request, res: Response) => {
    try {
        const { cognitoId } = req.params;
        const manager = await prisma.manager.findUnique({
            where: {
                cognitoId: cognitoId
            },
        })

        if (manager) {
            res.status(200).json(manager)
        }
        if (!manager) {
            res.status(404).json({ message: "manager not found" });
        }
    } catch (error:any) {
        res.status(500).json({ message: "Internal server error", error: error.message });   
    }
}


export const createManager = async (req:Request, res: Response) => {
    try {
        const { cognitoId, name, email,phoneNumber } = req.body;
        const manager = await prisma.manager.create({
            data:  {
                cognitoId: cognitoId,
                name: name,
                email: email,
                phoneNumber: phoneNumber
            }
        })

        res.status(201).json(manager);
    } catch (error:any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}