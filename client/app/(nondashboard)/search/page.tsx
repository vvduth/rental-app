"use client";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/state/redux";
import { useSearchParams } from "next/navigation";
import React from "react";
import FiltersBar from "./FiltersBar";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const isFiltersFullOpen = useAppSelector(
    (state) => state.global.isFiltersFullOpen
  );
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
            {/* filter full */}
        </div>
        {/* map */}
        <div className="basis-4/12 overflow-y-auto"></div>
      </div>
    </div>
  );
};

export default SearchPage;
