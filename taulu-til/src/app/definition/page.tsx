import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import SearchBarModal from "@/components/searchBarModal";
import { Card, CardTitle } from "@/components/ui/card";
import DefinitionCard from "@/components/ui/definitionComponent";
import React from "react";



export default function Page({
  searchParams,
}: {
  searchParams?: {
    [key: string]: string | string[] | undefined,
    word?: string;
  };
}) {
  const word = searchParams?.word || " ";
  return (
    <div>
      <div className="bg-slate-50 h-full w-full sticky overflow-visible">
        <section className="bg-green-600 w-full h-1/6 overflow-visible">
          <MaxWidthWrapper className="pb-10 pt-10 lg:grid sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-10 xl:pt-10 lg:pb-24">
            <SearchBarModal/>
          </MaxWidthWrapper>
        </section>
        <section className="p-5">
          <MaxWidthWrapper>
            <DefinitionCard word={word} />
          </MaxWidthWrapper>
        </section>
      </div>
    </div>
  );
}
