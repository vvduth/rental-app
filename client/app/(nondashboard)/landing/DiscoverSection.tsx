"use client";
import React from "react";
import { motion, stagger } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.2 },
  },
};

const itemsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}
const DiscoverSection = () => {
  return <motion.div
    initial="hidden"
    whileInView={"visible"}
    viewport={{ once: true, amount: 0.8 }}
    variants={containerVariants}
    className="py-12 bg-white mb-16"
  >
    <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
            variants={itemsVariants}
            className="my-12 text-center"
        >
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
                Discovers
            </h2>
            <p className="mt-4 text-lg text-gray-600">
                Find your dream rental property with our easy-to-use search engine today!
            </p>
            <p className="mt-2 text-gray-500 max-w-3xl mx-auto">
                Browse thousands of listings, compare features, and connect directly with property owners or agents. Whether you're looking for a cozy apartment, a spacious house, or a unique rental experience, our platform makes it simple and convenient to discover your next home.
            </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 text-center">
           {
           [
            {
            imageSrc: "/landing-icon-wand.png",
            title: "Explore Local Listings",
            description: "Discover a wide range of rental properties in your area, from apartments to houses.",
           },
             {
            imageSrc: "/landing-icon-calendar.png",
            title: "Book your rental",
            description: "Easily schedule viewings or book your rental property directly through our platform.",
           },
            {
            imageSrc: "/landing-icon-heart.png",
            title: "Enjoy your new home",
            description: "Move in and start enjoying your new rental property with ease.",
           },
           ].map((item, index) => (
            <motion.div
                key={index}
                variants={itemsVariants}>
                    <DiscoverCard 
                imageSrc={item.imageSrc}
                title={item.title}
                description={item.description}
                    />
                </motion.div>
           ))
           }
        </div>
    </div>
  </motion.div>;
};

const DiscoverCard = ({
    imageSrc,
    title,
    description,
    
} : {
    imageSrc: string;
    title: string;
    description: string;
    
}) => {
    return (
        <div className="px-4 py-12 shadow-lg rounded-lg bg-white md:h-72">
            <div className="bg-gray-900 p-[0.6rem] rounded-full mb-4 h-10 w-10 mx-auto">
                <Image
                    src={imageSrc}
                    width={400}
                    height={400}
                    className="w-full h-full"
                    alt={title}
                />
            </div>
            <h3 className="mt-4 text-xl font-medium text-gray-800">{title}</h3>
            <p className="mb-4">
                {description}
            </p>
            
        </div>
    );
}
export default DiscoverSection;
