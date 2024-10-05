import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import dotenv from "dotenv";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import WordOfTheDay from "@/components/wotd";
import CallToAction from "@/components/CallToAction";
import SearchBarModal from "@/components/searchBarModal";
import MakeARequest from "./request/page";
import { useState } from "react";

dotenv.config();

function getNum() {
  const expt=[0,1691,2777,4629,4889,5248,5288,5631,6087,6469,6475,8478,8526,9069,9613,9716,9748,11068,12672,13091,13099,4009,5621,6250,9432,10786,12966]
  let randomNum = Math.floor(Math.random() * (13223 - 1)) + 1
  if (expt.includes(randomNum)) {
    return getNum()
  }
   return randomNum
}

export default function Home() {
  return (
    <div className="overflow-visible">
      <section className="bg-green-600 w-full h-1/6">
        <MaxWidthWrapper className="pb-10 pt-10 lg:grid sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-10 xl:pt-18 lg:pb-16">
          <div className="col-span-3 px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto text-center flex items-center justify-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
              </div>
              <div className="mx-auto justify-center items-center w-full gap-1">
                <SearchBarModal />
              </div>
              {/* <h1 className="relative w-full tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                    Learn the Karachay Language{" "}
                    <span className="bg-green-600 px-2 text-white">
                      Coming Soon
                    </span>{" "}
                  </h1> */}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <div className="pt-16">
            <CallToAction />
          </div>
          <div className="grid sm:grid-cols-1 sm:grid-rows-7 md:grid-cols-3 md:grid-rows-3 gap-2 pt-2">
            <div className=" md:row-span-2">
              <WordOfTheDay />
            </div>
            <div className="md:row-start-1 md:col-start-2">
              <Link href="/dictionary">
                <Card className="hover:shadow-md hover:shadow-gray-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-green-800">Dictionary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Check out over 13,000 Karachay-Balkar words with their
                      English and Turkish translations
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            </div>
            <div className=" md:col-start-3 md:row-start-1">
                <Card className="hover:shadow-md hover:shadow-gray-300 h-full">
                <MakeARequest/>
                </Card>
            </div>
            <div className="md:col-start-3 md:row-start-2">
              <Link href={`/definition?word=${getNum()}`}>
                <Card className="hover:shadow-md hover:shadow-gray-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-green-800">Random Word</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Click here to visit a random word
                    </CardDescription>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </Link>
            </div>
            <div className="md:col-start-2 md:row-start-2">
              <Link href={`karacayCirla.pdf`} locale={false}>
                <Card className="hover:shadow-md hover:shadow-gray-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-green-800">Songs</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Explore the Karachay-Balkar tongue via Folk songs
                    </CardDescription>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </Link>
            </div>
            {/* In development */}
            {/* <div className="md:col-start-1 md:row-start-3">
              <Link href="/saved">
                <Card className="hover:shadow-md hover:shadow-gray-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-green-800">My Saved Words</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Check out on the all words you have saved
                    </CardDescription>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </Link>
            </div> */}
            <div className="md:col-start-1 md:row-start-3">
              <Link href="/about">
                <Card className="hover:shadow-md hover:shadow-gray-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-green-800">About Us</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Learn about our mission and connect with us
                    </CardDescription>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </Link>
            </div>
            <div className="md:col-start-2 md:row-start-3">
              <Link href="/">
                <Card className="hover:shadow-md hover:shadow-gray-300 h-full">
                  <CardHeader>
                    <CardTitle className="text-green-800">Collections (Coming Soon!)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      Create flashcard sets, quizzes, and more with the words
                      you save
                    </CardDescription>
                  </CardContent>
                  <CardFooter></CardFooter>
                </Card>
              </Link>
            </div>
            
          </div>
        </MaxWidthWrapper>
      </section>
      {/* <section>
          <MaxWidthWrapper className="pb-24 pt-10 lg:grid sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-24 xl:pt-32 lg:pb-52 min-h-screen outline ">
            <div className="col-span-3 px-6 lg:px-0 lg:pt-4 outline-dashed ">
              <div className="mx-auto text-center flex items-center justify-center lg:items-start outline-dotted">
                <div className="absolute w-28 left-0 -top-20 hidden lg:block ">
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t outline-double via-slate-50/50 from-slate-50 h-28" />
                </div>
                  <div className="mx-auto flex justify-center items-center w-full  gap-1">
                    <input
                      type="text"
                      placeholder="Search here"
                      className="input input-bordered w-3/4"
                    />
                    <button className="btn btn-square btn-outline hover:border-green-600 hover:bg-green-600 ">
                      <IoSearch/>
                    </button>
                  </div>
                  <h1 className="relative w-full tracking-tight text-balance mt-16 font-bold !leading-tight text-gray-900 text-5xl md:text-6xl lg:text-7xl">
                    Learn the Karachay Language{" "}
                    <span className="bg-green-600 px-2 text-white">
                      Coming Soon
                    </span>{" "}
                  </h1>
              </div>
            </div>
          </MaxWidthWrapper>
        </section> */}
    </div>
  );
}


