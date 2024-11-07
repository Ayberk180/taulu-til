import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import ContactUs from "@/components/contactUs";
import SearchBarModal from "@/components/searchBarModal";

export default function page() {
  return (
    <div className="overflow-hidden">
      <section className="bg-green-600 w-full h-1/6 overflow-visible">
        <MaxWidthWrapper className="pb-10 pt-10 lg:grid sm:pb-32 lg:gap-x-0 xl:gap-x-8 lg:pt-10 xl:pt-18 lg:pb-16">
          <div className="col-span-3 px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto text-center flex items-center justify-center lg:items-start">
              <div className="absolute w-28 left-0 -top-20 hidden lg:block ">
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t via-slate-50/50 from-slate-50 h-28" />
              </div>
              <div className="mx-auto justify-center items-center w-full gap-1 overflow-visible">
              <SearchBarModal/>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section>
        <MaxWidthWrapper>
          <Card className="flex flex-col m-10">
            <CardHeader>
              <CardTitle className="text-5xl text-center">About Us</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col text-center w-3/4 mx-auto">
              <p className="pb-10">
                TauluTil was created in an effort to increase exposure of the
                Karachay-Balkar language in hopes of increasing literacy among
                its general population. The data and resources found throughout
                this site was gathered from multiple free sources on the
                internet. TauluTil is grateful for the efforts made by previous
                generations that allowed us to provide more resources to reach a
                broader audience. Linked below are the resources we used to
                bring you TauluTil
              </p>
              <Link
                href={"http://www.elbrusoid.org/"}
                className="text-blue-600 underline"
              >
                Elbrusoid
              </Link>
              <Link
                href={"http://www.yilmaznevruz.net/"}
                className=" text-blue-600 underline"
              >
                The works of Yilmaz Nevruz
              </Link>
            </CardContent>
            <CardFooter className="mx-auto">
              <ContactUs />
            </CardFooter>
          </Card>
        </MaxWidthWrapper>
      </section>
    </div>
  );
}
