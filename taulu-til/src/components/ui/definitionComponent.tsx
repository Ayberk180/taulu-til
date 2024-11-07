import React from "react";
import * as dotenv from "dotenv";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";
import { Copy } from "lucide-react";
import ShareButton from "../shareButton";
import SaveDefinition from "../saveDefinition";
import { validateRequest } from "@/lib/auth";
import { toast } from "sonner";
import SuggestEdits from "../suggestEdits";
import { ttDB } from "@/lib/db";


export default async function DefinitionCard({ word }: { word: string }) {
  const queryWord = word;
  console.log(word)
  // console.log("Definition query", queryWord);
  
  const res = JSON.parse(JSON.stringify(await ttDB.collection("tauluDictionary").findOne({ id: Number(word)  })));
console.log('RES', res)
  // let id = res?.id
  // let str = '';
  // let def = '';
  // let engDef = '';
  try {
    var str:string = res!.example.replaceAll("'", '"').replaceAll("~",` ${res.word} `);
  } catch (e) {
    var str = '[{"":"error"}]'
  }
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

  // let json = str.replace(/[^ \[\]]+/g, '"$&"').replace(/ +/g, ",");
  // console.log(str);
  let arr = JSON.parse(str);
  // console.log(arr);

  return (
    <div className="">
      {res ? (
        <Card className="h-full">
          <CardHeader>
            <CardTitle className="text-4xl">{res.word}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardTitle>Turkish Definition</CardTitle>
            <CardDescription>
              {def[0].charAt(0).toUpperCase() + def[0].slice(1)}
            </CardDescription>
            <CardTitle className="pt-4">Karachay - Turkish Examples</CardTitle>
            {!arr ? (
              <>
                <CardDescription>No Examples</CardDescription>
              </>
            ) : (
              arr[0].map((ex: any) => (
                <>
                  <CardDescription>
                    {ex[0].charAt(0).toUpperCase() + ex[0].slice(1)} - {ex[1]}
                  </CardDescription>
                </>
              ))
            )}
            <CardTitle className="pt-4">English Definition</CardTitle>
            <CardDescription>
              {engDef[0].charAt(0).toUpperCase() + engDef[0].slice(1)}
            </CardDescription>
          </CardContent>
          <CardFooter className="justify-end space-x-1">
            {/* <SaveDefinition word={queryWord} id={id}/> */}
            <SuggestEdits word={res}/>
            
            <ShareButton />
            {/* <Button>Share</Button> */}
          </CardFooter>
        </Card>
      ) : (
        <>Word Not Found</>
      )}
    </div>
  );
}

// db.collection("taulu-dictionary").updateMany({}, {$rename: {"English Definition": "english-def"}})

// db."taulu-dictionary".updateMany(
//   { "English Definition": { $ne: null } },
//   { $rename: { "English Definition": "english-def" } }
// );
