"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {
  useGetAuthUserQuery,
  useGetCurrentResidencesQuery,
  useGetPropertiesQuery,
  useGetTenantQuery,
} from "@/state/api";
import { Property } from "@/types/prismaTypes";
import React from "react";

const TenantResidencePage = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo.userId || "",
    {
      skip: !authUser?.cognitoInfo.userId,
    }
  );

  const {
    data: cuurentResidences,
    isLoading,
    isError,
  } = useGetCurrentResidencesQuery(authUser?.cognitoInfo.userId || "", {
    skip: !authUser?.cognitoInfo.userId,
  });

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError || !cuurentResidences) {
    return <div>Error loading cuurent Residences</div>;
  }

  return (
    <div className="p-4">
      <Header title="Your Residences" subtitle="View and manage your current residences" />
      <div
        className="grid grid-cols-1 md:grid-cols-2 
    lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {cuurentResidences.map((property: Property) => (
          <Card
            key={property.id}
            property={property}
            showFavoriteButton={false}
            onFavoriteToggle={() => {}}
            isFavorite={
              tenant?.favorites.some((fav: Property) => fav.id === property.id)
            }
          />
        ))}
      </div>
        {cuurentResidences.length === 0 && (
            <div className="text-center text-gray-500 mt-4">
            You have no current residences.
            </div>
        )}
    </div>
  );
};

export default TenantResidencePage;
