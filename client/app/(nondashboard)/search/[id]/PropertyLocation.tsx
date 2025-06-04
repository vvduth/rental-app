import { useGetPropertyQuery } from "@/state/api";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Compass, MapPin } from "lucide-react";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY! || "";

const PropertyLocation = ({ propertyId }: PropertyDetailsProps) => {
  const {
    data: property,
    isError,
    isLoading,
  } = useGetPropertyQuery(propertyId);
  const mapContainerref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading || isError || !property) return;
    const map = new mapboxgl.Map({
      container: mapContainerref.current!,
      style: "mapbox://styles/ducthai/ckz1wbwkz000u16r7a2chombb",

      center: [
        property.location.coordinates.longitude,
        property.location.coordinates.latitude,
      ],
      zoom: 14,
    });

    const marker = new mapboxgl.Marker().setLngLat([
      property.location.coordinates.longitude,
      property.location.coordinates.latitude,
    ]).addTo(map);

    const markerElement = marker.getElement();
    const path = markerElement.querySelector(
      "path[fill='#3Fb1ce']"
    ) as SVGPathElement;
    if (path) {
      path.setAttribute("fill", "#000000");
    }

    return () => map.remove();
  }, [isLoading, isError, property]);

  if (isLoading) return <>Loading...</>;
  if (isError || !property) {
    return <>Property not Found</>;
  }
  return (
     <div className="py-16">
      <h3 className="text-xl font-semibold text-primary-800 dark:text-primary-100">
        Map and Location
      </h3>
      <div className="flex justify-between items-center text-sm text-primary-500 mt-2">
        <div className="flex items-center text-gray-500">
          <MapPin className="w-4 h-4 mr-1 text-gray-700" />
          Property Address:
          <span className="ml-2 font-semibold text-gray-700">
            {property.location?.address || "Address not available"}
          </span>
        </div>
        <a
          href={`https://maps.google.com/?q=${encodeURIComponent(
            property.location?.address || ""
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex justify-between items-center hover:underline gap-2 text-primary-600"
        >
          <Compass className="w-5 h-5" />
          Get Directions
        </a>
      </div>
      <div
        className="relative mt-4 h-[300px] rounded-lg overflow-hidden"
        ref={mapContainerref}
      />
    </div>
  );
};

export default PropertyLocation;
