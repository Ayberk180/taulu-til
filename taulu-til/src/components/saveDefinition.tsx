"use client";
import React from "react";
import { Button } from "./ui/button";
import { User } from "lucia";
import { toast } from "sonner";
import { makeSave } from "../actions/makeSave";
import { useSearchParams } from "next/navigation";
import { useSession } from "@/app/SessionContext";

// const searchParams = useSearchParams();
// const word = searchParams.get("query")?.toString();

export default function SaveDefinition({ word,id }: { word: string, id:number }) {
  const { user } = useSession()
    // console.log(user)
  async function clickHandler() {
    // console.log("user", user);

    

    try {
      const rsp = await makeSave({word:word,id:id,user:user});
      if (rsp?.isErr === 0 ) {
        toast.success(`Saved word to your collection: ${rsp.message}`);
      } else {
        throw new Error(rsp?.message)
      }
    } catch (e) {
      const error = e as Error;
      toast(`An error occured: ${error.message}`);
      return;
    }
  }

  //   if (rsp) {
  //     toast("Success!", {
  //       description: "User Found",
  //     });
  //   } else {
  //     // console.log("Not Exists")
  //     toast("Uh oh! Something went wrong.",{
  //       description: "No User",
  //     });
  //   }
  // };

  return (
    <Button variant="outline" onClick={() => clickHandler()}>
      Save
    </Button>
  );
}
