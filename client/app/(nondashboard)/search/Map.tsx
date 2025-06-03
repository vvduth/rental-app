"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAppSelector } from "@/state/redux";
import { useGetPropertiesQuery } from "@/state/api";
import { Property } from "@/types/prismaTypes";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY! || "";
const Map = () => {
  const mapContainerref = useRef<HTMLDivElement>(null);
  const filters = useAppSelector((state) => state.global.filters);
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );

  const {
    data: properties,
    isLoading,
    isError,
  } = useGetPropertiesQuery(filters);
  useEffect(() => {
    if (isLoading || isError || !properties ) return;
    const map = new mapboxgl.Map({
      container: mapContainerref.current!,
      style: "mapbox://styles/ducthai/ckz1wbwkz000u16r7a2chombb",
      
      center: filters.coordinates || [-74.5, 40],
      zoom:9
    });

    properties.forEach((property: Property) => {
        const marker  = createPropertyMarker(property, map);
        const markerElement = marker.getElement();
        const path = markerElement.querySelector("path[fill='#3Fb1ce']") as SVGPathElement; 
        if (path) {
          path.setAttribute("fill", "#3Fb1ce");
        }
    })

    const resizeMap = () => setTimeout(() => {
        map.resize();
    }, 700);
    resizeMap();

    return () => map.remove();
  });
  if (isLoading) return <div>Loading...</div>;
    if (isError || !properties) return <div>Error loading map</div>;

  return (
    <div className="basis-5/12 grow relative rounded-xl">
      <div
        className="map-container rounded-xl"
        ref={mapContainerref}
        style={{
          height: "100%",
          width: "100%",
        }}
      ></div>
    </div>
  );
};

const createPropertyMarker = (property: Property, map: mapboxgl.Map) => {
  const marker = new mapboxgl.Marker()
    .setLngLat([
      property.location.coordinates.longitude,
      property.location.coordinates.latitude,
    ])
    .setPopup(
      new mapboxgl.Popup().setHTML(
        `
         <div class="rounded-lg bg-white">
          <div class="marker-popup-image"></div>
          <div>
            <a href="/search/${property.id}" target="_blank" class="text-gray-900 font-semibold">${property.name}</a>
            <p class="text-lg font-bold text-sky-600">
              $${property.pricePerMonth}
              <span class="text-xs text-gray-500 font-normal ml-1"> / month</span>
            </p>
          </div>
        </div>
        `
      )
    )
    .addTo(map);
  return marker;
};


export default Map;
