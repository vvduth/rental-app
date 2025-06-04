"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setFilters } from "@/state";
const HeroSection = () => {
  const dispatch = useDispatch();
  const [searchQuery, setsearchQuery] = useState("");
  const router = useRouter();

  const handleSearchLocation = async () => {
     try {
      const trimmedQuery = searchQuery.trim();
      if (!trimmedQuery) return;

      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          trimmedQuery
        )}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_API_KEY!}&fuzzyMatch=true`
      );
      const data = await response.json();
      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        dispatch(
          setFilters({
            location: trimmedQuery,
            coordinates: [lat, lng],
          })
        );
        const params = new URLSearchParams({
          location: trimmedQuery,
          lat: lat.toString(),
          lng: lng,
        });
        router.push(`/search?${params.toString()}`);
      }
    } catch (error) {
      console.error("error search location:", error);
    }
  };
  return (
    <div className="relative h-screen">
      <Image
        src={"/landing-splash.jpg"}
        alt="rental app landing page hero photo"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gray-800/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-1/3 transform -translate-x-1/2 
            -translate-y-1/2 left-1/2 text-center w-full"
        >
          <div className="max-w-4xl mx-auto px-16 sm:px-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Start your rental journey with us
            </h1>
            <p className="text-xl text-white mb-8">
              Explore a wide range of rental properties tailored to your needs
              and lifestyle.
            </p>
            <div className="flex justify-center">
              <Input
                type="text"
                value={searchQuery}
                className="w-full bg-white h-12 max-w-lg rounded-none rounded-l-xl border-none"
                onChange={(e) => setsearchQuery(e.target.value)}
                placeholder="Search for properties, locations, or amenities"
              />
              <Button
                onClick={handleSearchLocation}
                className="bg-rose-500 text-white rounded-none rounded-r-xl border-none
                    hover:bg-rose-600 transition-colors
                    h-12"
              >
                Search
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
