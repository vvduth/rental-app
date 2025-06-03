"use client";
import React from "react";
import { motion, stagger } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
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
const FeatureSection = () => {
  return <motion.div
    initial="hidden"
    whileInView={"visible"}
    viewport={{ once: true, amount: 0.2 }}
    variants={containerVariants}
    className="py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-white"
  >
    <div className="max-w-4xl xl:max-w-6xl mx-auto">
        <motion.h2
            variants={itemsVariants}
            className="text-3xl font-bold text-center 
            mb-12 w-full sm:w-2/3 mx-auto"
        >
            Quickly find your next rental property using our advanced search features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
            {[1, 2, 3].map((item,index) => (
                <motion.div
                    key={index}
                    variants={itemsVariants}
                    >
                            <FeatureCard
                                imageSrc={`/landing-search${3-index}.png`}
                                title={
                                    [
                                        "Search by Location",
                                        "Filter by Amenities",
                                        "View Property Details"
                                    ][index]
                                }
                                description={
                                    [
                                        "Find properties in your desired area with ease.",
                                        "Narrow down your options with filters for amenities like pools, parking, and more.",
                                        "Get detailed information about each property including photos, descriptions, and pricing."
                                    ][index]
                                }
                                linkText={
                                    [
                                        "Explore Locations",
                                        "Search Amenities",
                                        "Discover"
                                    ][index]
                                }
                                linkHref={
                                    [
                                        "/search/location",
                                        "/search/amenities",
                                        "/properties/details"
                                    ][index]
                                }
                                />
                    </motion.div>
            ))}
        </div>
    </div>
  </motion.div>;
};

const FeatureCard = ({
    imageSrc,
    title,
    description,
    linkText,
    linkHref,
} : {
    imageSrc: string;
    title: string;
    description: string;
    linkText: string;
    linkHref: string;
}) => {
    return (
        <div className="text-center">
            <div className="p-4 rounded-lg mb-4 flex items-center justify-center h48">
                <Image
                    src={imageSrc}
                    width={400}
                    height={400}
                    className="w-full h-full object-contain"
                    alt={title}
                />
            </div>
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="mb-4">
                {description}
            </p>
            <Link
                href={linkHref}
                className="inline-block border border-gray-300 rounded px-4 py-2
                hover:bg-gray-100"
            >{linkText}</Link>
        </div>
    );
}
export default FeatureSection;
