"use client";

import { useState, useRef, useEffect } from "react";
import { performSearch } from "@/actions/searchBarModalCall";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Search, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import { Document } from "mongodb";
import Link from "next/link";

export default function SearchBarModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("kch");
  const [searchResults, setSearchResults] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const [debouncedQuery] = useDebounce(query, 300);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    async function search() {
      if (debouncedQuery) {
        setIsLoading(true);
        const result = await performSearch(debouncedQuery, filter);
        // console.log(result);
        setSearchResults(result);
        setIsLoading(false);
        router.refresh();
      } else {
        setSearchResults([]);
      }
    }

    search();
  }, [debouncedQuery, filter, router]);

  return (
    <div className="relative">
      <Button
        onClick={() => setIsOpen(true)}
        variant="outline"
        className="w-full justify-start text-left font-normal"
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
      </Button>
      {isOpen && (
        <div
          ref={modalRef}
          className="absolute top-0 left-0 w-full bg-background border rounded-md shadow-lg z-50"
        >
          <div className="flex items-center p-4">
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="flex-grow"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="ml-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <div className="px-4 pb-4 ">
            <div className="flex flex-col sm:flex-row sm:items-center">
              <Label className="py-2 mr-4 whitespace-nowrap text-green-600 font-semibold">
                Search Language:
              </Label>
              <RadioGroup
                value={filter}
                onValueChange={setFilter}
                className="flex"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="kch" id="kch" />
                  <Label htmlFor="kch">Karachay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tr" id="tr" />
                  <Label htmlFor="tr">Turkish</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en">English</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          {isLoading && (
            <div className="px-4 pb-4">
              <p>Searching...</p>
            </div>
          )}
          {!isLoading && searchResults && (
            <div className="px-4 pb-4">
              <h3 className="font-semibold mb-2 text-left text-green-600">Results</h3>
              <ul className="space-y-2">
                {searchResults.map((result, index) => (
                  <li key={index} className="text-sm">
                    <Link
                      href={`/definition?word=${encodeURIComponent(
                        result.word
                      )}`}
                      className="block w-full text-left hover:bg-accent hover:text-accent-foreground p-2 rounded-md transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="text-sm grid grid-cols-3 md:grid-cols-4">
                        <p className="font-bold flex text-md px-2">{result.word}</p>
                        <div className="col-span-2 ">
                          <div className="flex"><p className="font-semibold whitespace-pre">Turkish: </p> {(result.definition.replace(/[\[\]']+/g, "")).slice(0,50)}...</div>
                          <div className="flex"><p className="font-semibold whitespace-pre">English: </p> {result.englishDefinition.replace(/[\[\]']+/g, "").slice(0,50)}...</div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!isLoading && query && !searchResults && (
            <div className="px-4 pb-4">
              <p>No results found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
