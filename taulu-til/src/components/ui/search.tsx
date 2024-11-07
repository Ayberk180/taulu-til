"use client";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ToggleGroup, ToggleGroupItem } from "./toggle-group";
import { Button } from "./button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./select";

const SearchField = () => {
  const searchParams = useSearchParams();
  const [searchParam, setSearchParam] = useState();
  const [language, setlanguage] = useState('kch');
  const pathname = usePathname();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  params.set("lang", language)

  const handleSearch = (searchTerm: string) => {
    if (searchTerm) {
      params.set("query", searchTerm);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
    const query = searchTerm;
  };

  const handleSelect = (value: string) => {
    setlanguage(value)
  }

  return (
    <div className="flex items-center w-full gap-1 bg-white rounded-xl border-white">
      <input
        type="text"
        placeholder="Search here"
        className="input w-full m-1"
        defaultValue={searchParam}
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
      ></input>
      <div className="flex px-2">
        <p className="text-sm px-2">Search Language</p>
      <Select onValueChange={handleSelect} defaultValue="kch">
      <SelectTrigger className="w-min-[100px]">
        <SelectValue placeholder="Karachay" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <button onClick={(e)=>handleSelect}>
          <SelectItem value="kch">Karachay</SelectItem>
          </button>
          <SelectItem value="tr">Turkish</SelectItem>
          <SelectItem value="en">English</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
      </div>
      {/* <button className="btn btn-square btn-outline border-2 border-white hover:border-white hover:bg-white text-white hover:text-green-600 text-xl text-">
        <IoSearch />
      </button> */}
      {/* <Search searchString={pathnam}/> */}
    </div>
  );
};

export default SearchField;
