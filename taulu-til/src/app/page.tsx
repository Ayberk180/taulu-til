import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
import dotenv from "dotenv";
import { IoSearch } from "react-icons/io5";
import { CustomIcon } from "@/components/ui/custom-icon";
import SearchField from "@/components/ui/search";
import { Search } from "@/actions/searchResult";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import WordOfTheDay from "@/components/wotd";

dotenv.config();

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
  };
}) {
  const query = searchParams?.query || " ";
  console.log("query", query);
  return (
      <div>
        <section className="bg-green-600 w-full h-1/6 ">
          <MaxWidthWrapper className="pb-10 pt-10 lg:grid sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-10 xl:pt-18 lg:pb-16">
            <div className="col-span-3 px-6 lg:px-0 lg:pt-4">
              <div className="mx-auto text-center flex items-center justify-center lg:items-start">
                <div className="absolute w-28 left-0 -top-20 hidden lg:block ">
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
                </div>
                <div className="mx-auto justify-center items-center w-full gap-1 overflow-visible">
                  <SearchField />
                  <Search searchString={query} />

                  {/* <SearchComponent  /> */}
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
              <Card className="">
                <CardHeader>
                  <div className="text-center">
                    Sign up today to use to create word banks, quiz yourself,
                    and more!
                    <Link href='/signup'>
                    <Button className="w-2/3 m-2 bg-green-600 hover:bg-green-700">
                      Sign Up
                    </Button>
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            </div>
            <div className="grid md:grid-cols-3 gap-2 pt-2">
              <div className="">
                <WordOfTheDay />
              </div>
              <div className="grid gap-2">
                <Link href="/dictionary">
                  <Card className="hover:shadow-md hover:shadow-gray-300">
                    <CardHeader>
                      <CardTitle>Dictionary</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Check out over 13,000 Karachay-Balkar words with their
                        English and Turkish translations
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
                <Link href={`karacayCirla.pdf`} locale={false}>
                  <Card className="hover:shadow-md hover:shadow-gray-300">
                    <CardHeader>
                      <CardTitle>Songs</CardTitle>
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
              <div className="grid gap-2">
                <Link href="/about">
                  <Card className="hover:shadow-md hover:shadow-gray-300">
                    <CardHeader>
                      <CardTitle>About Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>
                        Learn about our mission and connect with us
                      </CardDescription>
                    </CardContent>
                    <CardFooter></CardFooter>
                  </Card>
                </Link>
                <Link href="/about">
                  <Card className="hover:shadow-md hover:shadow-gray-300">
                    <CardHeader>
                      <CardTitle>Collections (Coming Soon!)</CardTitle>
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
