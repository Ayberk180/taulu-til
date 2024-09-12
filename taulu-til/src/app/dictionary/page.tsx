import { Search } from "@/actions/searchResult";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Navbar from "@/components/navbar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DictionaryAccordion from "@/components/ui/dictionaryAccordion";
import SearchField from "@/components/ui/search";
import { ttDB } from "@/lib/db";
import Link from "next/link";
import React from "react";

export default async function Dictionary({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    word?: string;
  };
}) {
  const query = searchParams?.query || " ";

  return (
    <div>
      <div className="bg-slate-50 h-full w-full overflow-visible">
        <section className="bg-green-600 w-full h-1/6 overflow-visible">
          <MaxWidthWrapper className="pb-10 pt-10 lg:grid sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-10 xl:pt-10 lg:pb-24">
            <div className="w-full h-full">
              <SearchField />
              <Search searchString={query} />
            </div>
          </MaxWidthWrapper>
        </section>
        <section className="p-5">
          <MaxWidthWrapper>
            <Card>
              <CardHeader>
                <CardTitle>
                  Open the tabs below for a list of all words in alphabetical
                  order
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DictionaryAccordion/>
              </CardContent>
            </Card>
          </MaxWidthWrapper>
        </section>
      </div>
    </div>
  );
}
