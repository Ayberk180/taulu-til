import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth";
import { ttDB } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const user = await validateRequest();

  if (!user.user?.hasAdmin) {
    return redirect("/");
  }

  const reqs = await ttDB.collection("suggestedEdits").find().toArray();
  var complst = [];
  var suggested = [];

  for (let i = 0; i < reqs.length; i++) {
    complst.push(reqs[i]["wordid"]);
  }

  console.log(complst);

  const words = await ttDB
    .collection("tauluDictionary")
    .find({ id: { $in: complst } })
    .toArray();

  // console.log(words);

  for (let i = 0; i < reqs.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (reqs[i]["wordid"] == words[j]["id"]) {
        suggested.push({
          id: reqs[i]["wordid"],
          word: reqs[i]["word"],
          definition: reqs[i]["definition"],
          example: reqs[i]["example"],
          keywords: reqs[i]["keywords"],
          englishDefinition: reqs[i]["englishDefinition"],
          englishKeywords: reqs[i]["englishKeywords"],
          suggestedDefinition: words[j]["definition"],
          suggestedExample: words[j]["example"],
          suggestedKeywords: words[j]["keywords"],
          suggestedEnglishDefinition: words[j]["englishDefinition"],
          suggestedEnglishKeywords: words[j]["englishKeywords"],
        })
      }
    }
  }

  return (
    <div>
      <MaxWidthWrapper>
        {suggested ? (
          suggested.map((ex: any) => (
            <div>
              <Card>
                <CardTitle>{ex.word}</CardTitle>
                <CardContent>
                  <CardDescription></CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardTitle>{ex.suggestedWord }</CardTitle>
                <CardContent>
                  <CardDescription></CardDescription>
                </CardContent>
              </Card>
            </div>
          ))
        ) : (
          <div>not page</div>
        )}
      </MaxWidthWrapper>
    </div>
  );
}
