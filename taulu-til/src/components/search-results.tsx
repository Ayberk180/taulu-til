"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Document } from "mongodb";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Separator } from "./ui/separator";
import { useEffect, useRef, useState } from "react";

interface SearchResultsProps {
  results: Document[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  const searchParams = useSearchParams();
  const isInputFocused = searchParams.get("isInputFocused") === "true";
  const resultsRef = useRef<HTMLDivElement>(null);
  const overflowRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const updateMaxHeight = () => {
      if (resultsRef.current) {
        const rect = resultsRef.current.getBoundingClientRect();
        const remainingHeight = window.innerHeight - rect.top - 20; // 20px buffer
        setMaxHeight(remainingHeight);
      }
    };

    updateMaxHeight();
    window.addEventListener("resize", updateMaxHeight);

    return () => {
      window.removeEventListener("resize", updateMaxHeight);
    };
  }, []);

  useEffect(() => {
    if (resultsRef.current && overflowRef.current) {
      const resultsRect = resultsRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (resultsRect.bottom > viewportHeight) {
        const overflowHeight = resultsRect.bottom - viewportHeight;
        overflowRef.current.style.height = `${overflowHeight}px`;
      } else {
        overflowRef.current.style.height = "0px";
      }
    }
  }, [results, isInputFocused]);

  if (results.length === 0 || !isInputFocused) {
    return null;
  }

  return (
    <div ref={resultsRef} className="absolute w-full z-10 bg-white rounded-lg shadow-2xl shadow-gray-900">
      <ScrollArea className="h-[200px] w-full rounded-md border p-4" style={{ maxHeight: maxHeight }}>
        <ul className="space-y-2">
          {results.map((result, index) => (
            // <li key={index} className="text-sm">{result.word}</li>
            <div>
              <Link className="w-full" href={"definition?word=" + result.word}>
                <div key={index} className="text-sm items-start flex">
                  <p className="font-bold">{result.word}</p> :{" "}
                  {result.definition.replace(/[\[\]']+/g, "")} :{" "}
                  {result.englishDefinition.replace(/[\[\]']+/g, "")}
                </div>
              </Link>
              <Separator />
            </div>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
}
