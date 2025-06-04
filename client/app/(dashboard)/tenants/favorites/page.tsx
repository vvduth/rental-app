"use client";
import Card from "@/components/Card";
import Header from "@/components/Header";
import Loading from "@/components/Loading";
import {
  useGetAuthUserQuery,
  useGetPropertiesQuery,
  useGetTenantQuery,
} from "@/state/api";
import { Property } from "@/types/prismaTypes";
import { skip } from "node:test";
import React from "react";

const TenantFavortiesPage = () => {
  const { data: authUser } = useGetAuthUserQuery();
  const { data: tenant } = useGetTenantQuery(
    authUser?.cognitoInfo.userId || "",
    {
      skip: !authUser?.cognitoInfo.userId,
    }
  );

  const {
    data: favorites,
    isLoading,
    isError,
  } = useGetPropertiesQuery(
    {
      favoriteIds: tenant?.favorites.map((fav: { id: number }) => fav.id),
    },
    { skip: !tenant?.favorites || tenant.favorites.length === 0 }
  );

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  if (isError || !favorites) {
    return <div>Error loading favorites</div>;
  }

  return (
    <div className="p-4">
      <Header
        title="Your Favorites"
        subtitle="Here are your favorite properties"
      />
      <div
        className="grid grid-cols-1 md:grid-cols-2 
    lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {favorites.map((property) => (
          <Card
            key={property.id}
            property={property}
            isFavorite={
              tenant?.favorites.some(
                (fav: Property) => fav.id === property.id
              ) || false
            }
            propertyLink={`/tenants/residences/${property.id}`}
            onFavoriteToggle={() => {}}
          />
        ))}
      </div>
      {( !favorites || favorites.length === 0) && (
        <div className="text-center text-gray-500 mt-4">
          You have no favorite properties yet.
        </div>
      )}
    </div>
  );
};

export default TenantFavortiesPage;
