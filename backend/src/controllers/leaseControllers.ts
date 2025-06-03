import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();
// Get all leases
export const getLeases = async (req: Request, res: Response): Promise<void> => {
    try {
        const leases = await prisma.lease.findMany({
            include: {
                tenant: true,
                property: true
            }
        })
        res.status(200).json(leases);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leases', error });
    }
};

// Get lease by ID
export const getLeasePayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const payments = await prisma.payment.findMany({
            where: { leaseId: Number(id) },
        })
        
        if (!payments || payments.length === 0) {
            res.status(404).json({ message: 'Payments not found for this lease' });
          
            return;
        }
        
        res.status(200).json(payments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching  payment', error });
    }
};

// Create new lease
export const createLease = async (req: Request, res: Response): Promise<void> => {
    try {
        
    } catch (error) {
        res.status(400).json({ message: 'Error creating lease', error });
    }
};

// Update lease
export const updateLease = async (req: Request, res: Response): Promise<void> => {
    try {
        
    } catch (error) {
        res.status(400).json({ message: 'Error updating lease', error });
    }
};

// Delete lease
export const deleteLease = async (req: Request, res: Response): Promise<void> => {
    try {
      
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lease', error });
    }
};