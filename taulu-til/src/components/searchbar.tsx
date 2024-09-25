import { Suspense } from "react";
import SearchForm from "./search-input";
import SearchResults from "./search-results";
import searchtest from "@/actions/searchtest";
// import { searchAPI } from './actions'

export default async function SearchBar({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined },word?: string;
}) {
  const query =
    typeof searchParams?.query === "string" ? searchParams.query : "";
  const filter =
    typeof searchParams?.filter === "string" ? searchParams.filter : "kch";

  const results = query ? await searchtest(query, filter) : [];

  return (
    <div className="w-full mx-auto relative">
        <SearchForm initialQuery={query} initialFilter={filter} searchParams={searchParams} />
        <Suspense fallback={<div>Loading...</div>}>
          <SearchResults results={results} />
        </Suspense>
    </div>
  );
}
