import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
const prisma = new PrismaClient();
export const getTenant = async (req: Request, res: Response) => {
  try {
    const { cognitoId } = req.params;
    const tenant = await prisma.tenant.findUnique({
      where: {
        cognitoId: cognitoId,
      },
      include: {
        favorites: true,
      },
    });

    if (tenant) {
      res.status(200).json(tenant);
    }
    if (!tenant) {
      res.status(404).json({ message: "Tenant not found" });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const createTenant = async (req: Request, res: Response) => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;
    const tenant = await prisma.tenant.create({
      data: {
        cognitoId: cognitoId,
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      },
    });

    res.status(201).json(tenant);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const updateTentant = async (req: Request, res: Response) => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;
    const updatedTenant = await prisma.tenant.update({
      where: {
        cognitoId: cognitoId,
      },
      data: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
      },
    });

    res.status(201).json(updatedTenant);
  } catch (error: any) {
    res.status(500).json({
      message: "Internal updating tenant server error",
      error: error.message,
    });
  }
};

export const getTenantProperties = async (req: Request, res: Response) => {
  try {
    const { cognitoId } = req.params;

    const properties = await prisma.property.findMany({
      where: {
        tenants: { some: { cognitoId } },
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
      message: "Error fetching tenants properties",
      error: error.message,
    });
  }
};

export const addFavoriteProperty = async (req: Request, res: Response) => {
  try {
    const { cognitoId, propertyId } = req.params;
    const tenant = await prisma.tenant.findUnique({
      where: { cognitoId: cognitoId },
      include: { favorites: true },
    });

    const propertyIdNumber = Number(propertyId);
    const existingFavorites = tenant?.favorites || [];

    if (!existingFavorites.some((fav) => fav.id === propertyIdNumber)) {
      const updatedTenant = await prisma.tenant.update({
        where: { cognitoId: cognitoId },
        data: {
          favorites: {
            connect: { id: propertyIdNumber },
          },
        },
        include: { favorites: true },
      });
      res.status(200).json({
        message: "Property already in favorites",
        favorites: updatedTenant.favorites,
      });
    } else {
      res.status(409).json({
        message: "Property already in favorites",
      });
    }
  } catch (error: any) {
    res.sendStatus(500).json({
      message: "Error adding favorite property",
      error: error.message,
    });
  }
};

export const removeFavoriteProperty = async (req: Request, res: Response) => {
  try {
    const { cognitoId, propertyId } = req.params;
    const propertyIdNumber = Number(propertyId);

    const updatedTenant = await prisma.tenant.update({
      where: { cognitoId },
      data: {
        favorites: {
          disconnect: { id: propertyIdNumber },
        },
      },
      include: { favorites: true },
    });

    res.json(updatedTenant);
  } catch (err: any) {
    res
      .status(500)
      .json({ message: `Error removing favorite property: ${err.message}` });
  }
};
