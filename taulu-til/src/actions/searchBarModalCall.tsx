"use server";

import { ttDB } from "@/lib/db";

export async function performSearch(query: string, filter: string) {
  const path =
    filter === "kch"
      ? "word"
      : filter === "tr"
      ? "keywords"
      : "englishKeywords";

  const res = await ttDB
    .collection("tauluDictionary")
    .aggregate([
      {
        $search: {
          index: "default",
          compound: {
            should: [
              {
                phrase: { /// <--- Score boosting on exact match
                  query: query,
                  path: path,
                  score: { 
                    constant: {
                      value: 10 
                    } 
                  }, 
                },
              },
              {
                autocomplete: {
                  query: query,
                  path: path,
                },
              },
            ],
          },
        },
      },
      { $limit: 5 },
    ])
    .toArray();

  console.log(res)
  // return [`${filter} Result 1 for ${query}`, `${filter} Result 2 for ${query}`, `${filter} Result 3 for ${query}`]
  return JSON.parse(JSON.stringify(res));
}
