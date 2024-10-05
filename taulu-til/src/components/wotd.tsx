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
  let word = res?.word;
  let def = JSON.parse(res!.definition.replaceAll("'", '"'));
  let engDef = JSON.parse(
    res!.englishDefinition.replaceAll("'", '"').replace('don"t', "don't")
  );

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
