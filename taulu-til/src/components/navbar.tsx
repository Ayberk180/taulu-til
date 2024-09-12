"use client"

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/dist/server/api-utils";
import { logoutAction } from "./logout-action";
import { useSession } from "@/app/SessionContext";

const  Navbar =  () => {
  const { user } =  useSession();
  console.log("USER",user)

  // const user = await validateRequest();
  if ( user != null) {
    console.log(user);
  }
  const isAdmin = user?.hasAdmin;
  console.log(isAdmin);

  return (
    <nav className="sticky z-[100] h-14 inset-x-0 top-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-b border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            Taulu<span className="text-green-600">Til</span>
          </Link>
          <div className="h-full flex items-center space-x-4">
            {user?.username ? (
              <>
                <form action={logoutAction}>
                  <button>Sign out</button>
                </form>
                {isAdmin ? (
                  <Link
                    href="/dashboard"
                    className={buttonVariants({
                      size: "sm",
                      variant: "ghost",
                    })}
                  >
                    Dashboard ✨
                  </Link>
                ) : null}
              </>
            ) : (
              <>
                
                {/* <div className="h-8 w-px bg-zinc-200 hidden sm:block" /> */}
                <Link
                  href="login"
                  // className={buttonVariants({size: "sm"})}
                  className=""
                >
                  <Button className= "bg-green-600 hover:bg-green-700">Log in/Sign up</Button>
                </Link>

              </>
            )}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export default Navbar;
