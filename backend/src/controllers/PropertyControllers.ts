import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";
import { Upload } from "@aws-sdk/lib-storage";
import { S3Client } from "@aws-sdk/client-s3";

const prisma = new PrismaClient();
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  // credentials: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  // },
})

export const getProperties = async (req: Request, res: Response) => {
  try {
    const {
      favoriteIds,
      priceMin,
      priceMax,
      beds,
      baths,
      propertyType,
      squareFeetMin,
      squareFeetMax,
      amenities,
      availableFrom,
      latitude,
      longitude,
    } = req.query;

    let whereConditions: Prisma.Sql[] = [];
    if (favoriteIds) {
      const favIdsArray = (favoriteIds as string).split(",").map(Number);
      whereConditions.push(Prisma.sql`p.id IN (${Prisma.join(favIdsArray)})`);
    }

    if (priceMin) {
      whereConditions.push(
        Prisma.sql`p."pricePerMonth" >= ${Number(priceMin)}`
      );
    }
    if (priceMax) {
      whereConditions.push(
        Prisma.sql`p."pricePerMonth" <= ${Number(priceMax)}`
      );
    }
    if (beds && beds !== "any") {
      whereConditions.push(Prisma.sql`p.beds = ${Number(beds)}`);
    }
    if (baths && baths !== "any") {
      whereConditions.push(Prisma.sql`p.baths = ${Number(baths)}`);
    }
    if (squareFeetMin) {
      whereConditions.push(
        Prisma.sql`p."squareFeet" >= ${Number(squareFeetMin)}`
      );
    }
    if (squareFeetMax) {
      whereConditions.push(
        Prisma.sql`p."squareFeet" <= ${Number(squareFeetMax)}`
      );
    }
    if (propertyType && propertyType !== "any") {
      whereConditions.push(
        Prisma.sql`p."propertyType" = ${propertyType}::"PropertyType"`
      );
    }
    if (amenities && amenities !== "any") {
      const amenitiesArray = (amenities as string).split(",");
      whereConditions.push(Prisma.sql`p.amenities @> ${amenitiesArray}`);
    }

    if (availableFrom && availableFrom !== "any") {
      const availableFromDate =
        typeof availableFrom === "string" ? availableFrom : null;
      if (availableFromDate) {
        const date = new Date(availableFromDate);
        if (!isNaN(date.getTime())) {
          whereConditions.push(
            Prisma.sql`EXISTS (
              SELECT 1 FROM "Lease" l 
              WHERE l."propertyId" = p.id 
              AND l."startDate" <= ${date.toISOString()}
            )`
          );
        }
      }
    }

    if (latitude && longitude) {
      const lat = parseFloat(latitude as string);
      const lng = parseFloat(longitude as string);
      const radiusInKilometers = 1000;
      const degrees = radiusInKilometers / 111; // Converts kilometers to degrees

      whereConditions.push(
        Prisma.sql`ST_DWithin(
          l.coordinates::geometry,
          ST_SetSRID(ST_MakePoint(${lng}, ${lat}), 4326),
          ${degrees}
        )`
      );
    }
    const completeQuery = Prisma.sql`
      SELECT 
        p.*,
        json_build_object(
          'id', l.id,
          'address', l.address,
          'city', l.city,
          'state', l.state,
          'country', l.country,
          'postalCode', l."postalCode",
          'coordinates', json_build_object(
            'longitude', ST_X(l."coordinates"::geometry),
            'latitude', ST_Y(l."coordinates"::geometry)
          )
        ) as location
      FROM "Property" p
      JOIN "Location" l ON p."locationId" = l.id
      ${
        whereConditions.length > 0
          ? Prisma.sql`WHERE ${Prisma.join(whereConditions, " AND ")}`
          : Prisma.empty
      }
    `;

    const properties = await prisma.$queryRaw(completeQuery);

    res.json(properties);
  } catch (error: any) {
    res.sendStatus(500).json({
      message: "Error fetching properties",
    });
  }
};

export const getProperty = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await prisma.property.findUnique({
      where: { id: Number(id) },
      include: {
        location: true,
      },
    });
    if (property) {
      const coordinates: { coordinates: string }[] =
        await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;
      const geoJSON : any = wktToGeoJSON(coordinates[0]?.coordinates||'');
      const longtitude = geoJSON.coordinates[0]
      const latitude = geoJSON.coordinates[1];

      const propertyWithCoordinates = {
        ...property,
        location: {
          ...property.location,
          coordinates: {
            longitude: longtitude,
            latitude: latitude,
          },
        },
      }
      res.json(propertyWithCoordinates);
    }
  } catch (error:any) {
    res.sendStatus(500).json({
      message: "Error fetching property",})
  }
};

export const createProperty = async (req: Request, res: Response) => {
  try {
    const files = req.files as Express.Multer.File[];
    const {
      address,
      city,
      state,
      country,
      postalCode,
      managerCognitoId,
      ...propertyData
    } = req.body;

    const photoUrls = await Promise.all(
      files.map(async (file) => {
        const uploadParams = {
          Bucket: process.env.AWS_S3_BUCKET_NAME!,
          Key: `properties/${Date.now()}-${file.originalname}`,
          Body: file.buffer,
          ContentType: file.mimetype,
        }

        const uploadResult = await new Upload({
          client: s3Client, 
          params: uploadParams,
        }).done();
        return uploadResult.Location;
      })
    )
  } catch (error:any) {
    res.status(500).json({
      message: "Error creating property",
    });
    
  }
};
