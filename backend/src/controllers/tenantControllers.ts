
import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export const getTenant = async (req:Request, res: Response) => {
    try {
        const { cognitoId } = req.params;
        const tenant = await prisma.tenant.findUnique({
            where: {
                cognitoId: cognitoId
            },
            include: {
                favorites: true
            }
        })

        if (tenant) {
            res.status(200).json(tenant)
        }
        if (!tenant) {
            res.status(404).json({ message: "Tenant not found" });
        }
    } catch (error:any) {
        res.status(500).json({ message: "Internal server error", error: error.message });   
    }
}


export const createTenant = async (req:Request, res: Response) => {
    try {
        const { cognitoId, name, email,phoneNumber } = req.body;
        const tenant = await prisma.tenant.create({
            data:  {
                cognitoId: cognitoId,
                name: name,
                email: email,
                phoneNumber: phoneNumber
            }
        })

        res.status(201).json(tenant);
    } catch (error:any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export const updateTentant = async (req:Request, res: Response) => {  
     try {
        const { cognitoId } = req.params;
        const {  name, email,phoneNumber } = req.body;
        const updatedTenant = await prisma.tenant.update({
            where: {
                cognitoId: cognitoId
            },
            data:  {
                
                name: name,
                email: email,
                phoneNumber: phoneNumber
            }
        })

        res.status(201).json(updatedTenant);
    } catch (error:any) {
        res.status(500).json({ message: "Internal updating tenant server error", error: error.message });
    }
  }