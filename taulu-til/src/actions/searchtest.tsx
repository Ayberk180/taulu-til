import { ttDB } from '@/lib/db';
import React from 'react'

export default async function searchtest(query: string, filter: string) {


    const path = (filter === 'kch') ? 'word' : (filter === 'tr') ? 'keywords' : 'englishKeywords'
  
    const res = await ttDB
    .collection("tauluDictionary")
    .aggregate([
      {
        $search: {
          compound: {
            should: [
              {
                autocomplete: {
                  query: query,
                  // path: "word",
                  path: path,
                  score: {
                    boost: {
                      value: 5,
                    },
                  },
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
    return JSON.parse(JSON.stringify(res))
}
