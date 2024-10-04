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
import { sendNote } from "@/actions/sendNote";

// const searchParams = useSearchParams();
// const word = searchParams.get("query")?.toString();

export default function ContactUs() {
  const { user } = useSession();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>('');
  const [message, setMessage] = useState<string>();
  // console.log(user);

  async function clickHandler() {
    try {
        if (email) {
            const rsp = await sendNote({user:user,email:email!, name:name, message:message!});
            if (rsp?.isErr === 0 ) {
              toast.success(`Suggestion received for: ${rsp.message}`);
              setOpen(false);
            } else {
              throw new Error(rsp?.message)
            }
        }else{
            throw new Error("Must provide an email")
        }
    } catch (e) {
      const error = e as Error;
      toast(`An error occured: ${error.message}`);
      return;
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button  className="bg-green-600 text-white hover:bg-green-700">Get in touch with us</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-3xl">
            <DialogHeader>
              <DialogTitle>Send us a message</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                Name (optional)
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right flex flex-row-reverse">
                <p className="text-red-600 px-1">*</p>Email 
                </Label>
                <Input
                  id="email"
                  className="col-span-3"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Message
                </Label>
                <Textarea
                  id="enDef"
                  className="col-span-3"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-green-600 text-white hover:bg-green-700" onClick={() => clickHandler()}>Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>   
  );
}
