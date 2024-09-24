"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { debounce } from "lodash";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface SearchFormProps {
  initialQuery?: string;
  initialFilter?: string;
}

export default function SearchForm({
  initialQuery = "",
  initialFilter = "kch",
}: SearchFormProps) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState(initialFilter);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedSearch = useCallback(
    debounce((newQuery: string, newFilter: string) => {
      const params = new URLSearchParams();
      if (newQuery) params.set("query", newQuery);
      params.set("filter", newFilter);
      if (isInputFocused) params.set("isInputFocused", "true");
      router.push(`?${params.toString()}`, { scroll: false });
    }, 300),
    [router, isInputFocused]
  );

  useEffect(() => {
    debouncedSearch(query, filter);
  }, [query, filter, debouncedSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsInputFocused(false);
        debouncedSearch(query, filter);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [query, filter, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  return (
    <div className="flex items-center w-full gap-1 rounded-lg ">
      <Input
        ref={inputRef}
        type="search"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        className="w-full bg-white outline outline-white"
      />
      <div className="flex px-1 items-center bg-white rounded-lg">
        <p className="text-sm px-1">Search Language</p>
        <Select
          // type="single"
          value={filter}
          onValueChange={(value) => value && setFilter(value)}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select a fruit"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="kch" aria-label="Toggle kch">
                Karachay
              </SelectItem>
              <SelectItem value="tr" aria-label="Toggle tr">
                Turkish
              </SelectItem>
              <SelectItem value="en" aria-label="Toggle en">
                English
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
