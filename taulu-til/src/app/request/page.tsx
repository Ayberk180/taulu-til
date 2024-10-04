"use client";
import React, { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { sendNote } from "@/actions/sendNote";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { sendRequest } from "@/actions/sendRequest";

export default function MakeARequest() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("tr");
  const [word, setWord] = useState<string>("");
  const [trans, setTrans] = useState<string>("");

  async function clickHandler() {
    try {
      if (word) {
        const rsp = await sendRequest({
          language: lang!,
          word: word,
          trans: trans,
        });
        if (rsp?.isErr === 0) {
          toast.success(`Request received for: ${word}`);
          setOpen(false);
        } else {
          throw new Error(rsp?.message);
        }
      } else {
        throw new Error("Must enter a word");
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
        <div>
          <CardHeader>
            <CardTitle>Request a Translation</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Can't find a word you are looking for? Submit a request!
            </CardDescription>
          </CardContent>
          <CardFooter></CardFooter>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Request a Translation</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Word
            </Label>
            <Input
              id="name"
              className="col-span-3"
              onChange={(e) => setWord(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label
              htmlFor="username"
              className="text-right flex flex-row-reverse"
            >
              Language
            </Label>
            <RadioGroup value={lang} onValueChange={setLang} className="flex">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tr" id="tr" />
                <Label htmlFor="tr">Turkish</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="en" id="en" />
                <Label htmlFor="en">English</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Karachay Translation (optional)
            </Label>
            <Textarea
              id="enDef"
              className="col-span-3"
              onChange={(e) => setTrans(e.target.value)}
              placeholder="Already know the translation? Give us a hand to speed up the process :)"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="bg-green-600 text-white hover:bg-green-700"
            onClick={() => clickHandler()}
          >
            Send Request
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
