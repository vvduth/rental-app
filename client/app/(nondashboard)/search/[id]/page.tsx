"use client";
import { useGetAuthUserQuery, useGetPropertyQuery } from "@/state/api";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import ImagePreviews from "./ImagePreviews";
import PropertyOverview from "./PropertyOverview";
import PropertyDetails from "./PropertyDetails";
import PropertyLocation from "./PropertyLocation";
import ContactWidget from "./ContactWidget";
import ApplicationModal from "./ApplicationModal";
import { Property } from "@/types/prismaTypes";

const SingleListing = () => {
  const { id } = useParams();
  const propertyId = Number(id);
  const { data: authUser } = useGetAuthUserQuery();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {data: propertyData } = useGetPropertyQuery(propertyId)

  return (
    <div>
      <ImagePreviews
        images={propertyData.imagesUrl}
      />
      <div
        className="flex flex-col md:flex-row justify-center gap-10 mx-10 md:w-2/3 md:mx-auto
    mt-1"
      >
        <div className="order-2 md:order-1">
          <PropertyOverview propertyId={propertyId} />
          <PropertyDetails propertyId={propertyId} />
          <PropertyLocation propertyId={propertyId} />
        </div>
        <div className="order-1 md:order-2">
          <ContactWidget onOpenModal={() => setIsModalOpen(!isModalOpen)} />
        </div>
      </div>
      {authUser &&  (
        <ApplicationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          propertyId={propertyId}
          
        />
      )}
    </div>
  );
};

export default SingleListing;
