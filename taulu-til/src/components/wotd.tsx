import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import listJSON from "../assets/list.json";
import { ttDB } from "@/lib/db";
import Link from "next/link";

export default async function WordOfTheDay() {
  let lst = listJSON["list"].split(",");
  let date1 = new Date("09/12/2024");
  let date2 = new Date();

  let differenceInTime = date2.getTime() - date1.getTime();

  let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

  let wordId = Number(lst[differenceInDays]);

  const res = await ttDB.collection("tauluDictionary").findOne({ id: wordId });

  const word = res?.word

  try {
    var def:string = JSON.parse(res!.definition.replaceAll("'", '"'));
  } catch (e) {
    var def = '[{"":"error"}]'
  }
  try {
    var engDef:string = JSON.parse(res!.englishDefinition.replaceAll("don\'t","do not").replaceAll("'", '"'));
  } catch (e) {
    var engDef = '[{"":"error"}]'
  }

  return (
    <Link href={`/definition?word=` + wordId}>
      <Card className="w-full hover:shadow-md h-full flex flex-col justify-between">
        <CardHeader>
          <CardTitle className="text-center text-green-800">Word of the Day</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-5xl">{word}</p>
        </CardContent>
        <CardFooter className="flex flex-col ">
          <CardDescription className="w-full pb-4 text-center">
            <span className="font-semibold">English:</span> {engDef}
          </CardDescription>
          <CardDescription className="w-full text-center">
            <span className="font-semibold">Turkish:</span> {def}
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  );
}
