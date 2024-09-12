"use client";
import React, { useState } from "react";
import * as dotenv from "dotenv";
import { IoSearch } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Autocomplete from '@mui/material/Autocomplete';
import { Search } from "@/actions/searchResult";


const SearchField = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (searchTerm: string) => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    const query=searchTerm
  };

  return (
    <div className="flex w-full gap-1" >
      <input
        type="text"
        placeholder="Search here"
        className="input input-bordered w-full"
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      />
      <button className="btn btn-square btn-outline border-2 border-white hover:border-white hover:bg-white text-white hover:text-green-600 text-xl text-">
        <IoSearch />
      </button>
      {/* <Search searchString={pathnam}/> */}
    </div>
  );
};

export default SearchField;
