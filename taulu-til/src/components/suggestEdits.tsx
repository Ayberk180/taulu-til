"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { User } from "lucia";
import { toast } from "sonner";
import { makeSave } from "../actions/makeSave";
import { useSearchParams } from "next/navigation";
import { useSession } from "@/app/SessionContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { makeSuggestion } from "@/actions/makeSuggestion";
import type { WithId, Document } from "mongodb";
import { Textarea } from "./ui/textarea";
import { useFormState } from "react-dom";

// const searchParams = useSearchParams();
// const word = searchParams.get("query")?.toString();

export default function SuggestEdits({ word }: { word: WithId<Document> }) {
  const { user } = useSession();
  let trExample = word!.example.replaceAll("'", '"');
  let trDef = JSON.parse(word!.definition.replaceAll("'", '"'));
  let engDef = JSON.parse(word!.englishDefinition.replaceAll("'", '"').replace("don\"t","don\'t").replace("~",` ${word.word} `));
  const [newTrDef, setNewTrDef] = useState<string>(trDef);
  const [newExample, setNewExample] = useState<string>(trExample);
  const [newEnDef, setNewEnDef] = useState<string>(engDef);
  console.log(user);
  
  // const initialState = {
  //   message:''
  // }
  // const [formState, formAction] = useFormState(makeSuggestion, initialState);

  async function clickHandler() {
    try {
      const rsp = await makeSuggestion({word:word.word,wordid:word.id,user:user,definition:newTrDef, example:newExample, englishDefinition:newEnDef});
      if (rsp?.isErr === 0 ) {
        toast.success(`Suggestion received for: ${rsp.message}`);
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
    <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Suggest Changes</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Edit Word: {word.word}</DialogTitle>
              <DialogDescription>
                Suggest Changes to "{word.word}" here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Turkish Definition
                </Label>
                <Textarea
                  id="trDef"
                  defaultValue={trDef}
                  className="col-span-3"
                  onChange={(e) => setNewTrDef(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Karachay-Turkish Examples
                </Label>
                <Textarea
                  id="trEx"
                  placeholder={(`Write a sentence in Karachay with the the word "${word.word}" followed by its Turkish translation`)}
                  className="col-span-3"
                  onChange={(e) => setNewExample(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  English Definition
                </Label>
                <Textarea
                  id="enDef"
                  defaultValue={engDef}
                  className="col-span-3"
                  onChange={(e) => setNewEnDef(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => clickHandler()}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>   
    // <Dialog>
    //   <DialogTrigger asChild>
    //     <Button variant="outline">Suggest Changes</Button>
    //   </DialogTrigger>
    //   <DialogContent className="sm:max-w-3xl">
    //     <DialogHeader>
    //       <DialogTitle>Edit Word: {word.word}</DialogTitle>
    //       <DialogDescription>
    //         Suggest Changes to "{word.word}" here. Click save when you're done.
    //       </DialogDescription>
    //     </DialogHeader>
    //     <form action={formAction} className="flex flex-col gap-4">
    //     <input type='hidden' name='user' value={user?.id}/>
    //     <input type='hidden' name='wordid' value={word.id}/>
    //     <input type='hidden' name='word' value={word.word}/>
    //       <label className="input input-bordered flex items-center gap-2">
    //         <Textarea
    //           className="grow"
    //           value={word.definition}
    //           id="trDef"
    //           name="trDef"
    //         />
    //       </label>
    //       <label className="input input-bordered flex items-center gap-2">
    //         <Textarea
    //           className="grow"
    //           value={word.example}
    //           id="example"
    //           name="example"
    //         />
    //       </label>
    //       <label className="input input-bordered flex items-center gap-2">
    //         <Textarea
    //           className="grow"
    //           value={word.enDef}
    //           id="enDef"
    //           name="enDef"
    //         />
    //       </label>
    //       <button className="btn btn-primary ">Sign In</button>
    //     </form>
    //     <DialogFooter>
    //       <Button type="submit" onClick={() => clickHandler()}>
    //         Save changes
    //       </Button>
    //     </DialogFooter>
    //   </DialogContent>
    // </Dialog>
  );
}
