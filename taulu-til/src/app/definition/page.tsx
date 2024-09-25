import { Search } from "@/actions/searchResult";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SearchBar from "@/components/searchbar";
import DefinitionCard from "@/components/ui/definitionComponent";
import SearchField from "@/components/ui/search";
import { useSearchParams } from "next/navigation";
import React from "react";



export default function Page({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined,
    query?: string;
    word?: string;
  };
}) {
  const query = searchParams?.query || " ";
  const word = searchParams?.word || " ";

  return (
    <div>
      <div className="bg-slate-50 h-screen w-full sticky overflow-visible">
        <section className="bg-green-600 w-full h-1/6 overflow-visible">
          <MaxWidthWrapper className="pb-10 pt-10 lg:grid sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-10 xl:pt-10 lg:pb-24">
            <div className="w-full h-full">
              {/* <SearchField />
              <Search searchString={query} /> */}
                              <SearchBar searchParams={searchParams} />

            </div>
          </MaxWidthWrapper>
        </section>
        <section className="pt-5">
          <MaxWidthWrapper>
            <DefinitionCard word={word} />
          </MaxWidthWrapper>
        </section>
      </div>
    </div>
  );
}
