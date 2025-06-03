import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
const prisma = new PrismaClient();
export const getManager = async (req: Request, res: Response) => {
  try {
    const { cognitoId } = req.params;
    const manager = await prisma.manager.findUnique({
      where: {
        cognitoId: cognitoId,
      },
    });

    if (manager) {
      res.status(200).json(manager);
    }
    if (!manager) {
      res.status(404).json({ message: "manager not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const createManager = async (req: Request, res: Response) => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;
    const manager = await prisma.manager.create({
      data: {
        cognitoId: cognitoId,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      },
    });

    res.status(201).json(manager);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateManager = async (req: Request, res: Response) => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;
    const updatedManager = await prisma.manager.update({
      where: {
        cognitoId: cognitoId,
      },
      data: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      },
    });

    res.status(200).json(updatedManager);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const getManagerProperties = async (req: Request, res: Response) => {
  try {
    const { cognitoId } = req.params;

    const properties = await prisma.property.findMany({
      where: {
        managerCognitoId: cognitoId,
      },
      include: {
        location: true,
      },
    });

    const propertiesWithFormattedLocation = await Promise.all(
      properties.map(async (property) => {
        const coordinates: { coordinates: string }[] =
          await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;
        const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
        const longtitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        return {
          ...property,
          location: {
            ...property.location,
            coordinates: {
              longitude: longtitude,
              latitude: latitude,
            },
          },
        };
      })
    );
    res.json(propertiesWithFormattedLocation);
  } catch (error: any) {
    res.sendStatus(500).json({
      message: "Error fetching manager properties",
        error: error.message,
    });
  }
};
