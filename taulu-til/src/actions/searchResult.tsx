"use server";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { validateRequest } from "@/lib/auth";
import { ttDB } from "@/lib/db";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { error } from "console";
import * as dotenv from "dotenv";
import Link from "next/link";
import { redirect } from 'next/navigation';
import React from "react";


let user = await validateRequest()  
console.log('user', user)     


export const Search = async ({ searchString }: { searchString: string }) => {
  // console.log("searchString '", searchString.replace(/\s/g,''),"'");

    const res = await ttDB
      .collection("tauluDictionary")
      .aggregate([
        {
          $search: {
            compound: {
              should: [
                {
                  autocomplete: {
                    query: searchString,
                    path: "word",
                    score: {
                      boost: {
                        value: 9,
                      },
                    },
                  },
                },
                {
                  autocomplete: {
                    query: searchString,
                    path: "keywords",
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
  console.log("search result", res);
  return (
    <div>
    {(searchString.replace(/\s/g,'') !== '') ? (
    <div className="flex gap-1">
      <ScrollArea className="bg-white rounded-md w-full shadow-xl">
        <div className="p-1">
          {/* <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4> */}
          {( res).map((res) => (
            <div>
              <Link className="w-full" href={'definition?word='+res.word}>
                <div key={res.id} className="text-sm items-start flex">
                  <p className="font-bold">{res.word}</p> : {res.definition.replace(/[\[\]']+/g,'')}
                </div>
              </Link>
            <Separator/>
            </div>
          ))}
        </div>
      </ScrollArea>
      <button className="btn btn-square btn-outline border-2 border-green text-green-600 hover:text-green-600 text-xl "/>

    </div>
          ): (<></>)}
          </div>
  );
};

