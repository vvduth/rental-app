'use client'
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
const HeroSection = () => {
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
                Explore a wide range of rental properties tailored to your needs and lifestyle.
            </p>
            <div className="flex justify-center">
                <Input type="text"
                value={'searchquery'} 
                 className="w-full bg-white h-12 max-w-lg rounded-none rounded-l-xl border-none"  
                onChange={() => {}}
                    placeholder="Search for properties, locations, or amenities"
                />
                <Button onClick={() => {}} 
                    className="bg-rose-500 text-white rounded-none rounded-r-xl border-none
                    hover:bg-rose-600 transition-colors
                    h-12">Search</Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
