"use client";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cleanParams, cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import FiltersBar from "./FiltersBar";
import FiltersFull from "./FiltersFull";
import { setFilters } from "@/state";
import Map from "./Map";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );

  useEffect(() => {
    const initialFilter = Array.from(searchParams.entries()).reduce(
      (acc: any, [key, value]) => {
        if (key === "priceRange" || key === "squareFeet") {
          acc[key] = value.split(",").map((v) => (v === "" ? null : Number(v)));
        } else if (key === "coordinates") {
          acc[key] = value.split(",").map(Number);
        } else {
          acc[key] = value === "any" ? null : value;
        }
        return acc;
      },
      {}
    );
    const cleanedFilters  = cleanParams(initialFilter);
    dispatch(setFilters(cleanedFilters))
  }, []);
  return (
    <div
      className="w-full mx-auto px-5 flex flex-col"
      style={{
        height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        marginTop: `${NAVBAR_HEIGHT}px`,
      }}
    >
      <FiltersBar />
      <div className="flex justify-between flex-1 overflow-hidden gap-3 mb-5">
        <div
          className={cn(
            "h-full overflow-auto transition-all duration-300 ease-in-out",
            isFiltersFullOpen
              ? "w-1/4 opacity-100 visible"
              : "w-0 opacity-0 invisible"
          )}
        >
          <FiltersFull />
        </div>
        <Map/>
        <div className="basis-4/12 overflow-y-auto"></div>
      </div>
    </div>
  );
};

export default SearchPage;
