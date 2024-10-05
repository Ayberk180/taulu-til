"use server";
import { User } from "lucia";
import { ttDB } from "@/lib/db";


export async function makeSuggestion(
  {
    word,
    wordid,
    user,
    definition,
    example,
    englishDefinition
  }: {
    word: string;
    wordid:number;
    user: User | null;
    definition:string;
    example:string,
    englishDefinition:string
  }){
  // const searchParams = useSearchParams();
  // const word = searchParams.get("query")?.toString()
  try {
    if (user?.id != null) {
      // if (formData.get("user") != null) {
      const res = await ttDB.collection("suggestedEdits").insertOne({userid:user?.id, wordid:wordid, word:word, definition:definition,example:example,englishDefinition:englishDefinition});
      // const res = await db.collection("suggestedEdits").insertOne({userid:formData.get("user"), wordid:formData.get("wordid"), word:formData.get("word"), definition:formData.get("trDef"),example:formData.get("example"),enDef:formData.get("enDef")});
      return {
        isErr: 0,
        message: word,
        // message: formData.get("word"),
      };
    } else {
      throw new Error("Must be signed in to suggest edits");
    }
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        isErr: 1,
        message: err.message
      };
    }
  }
}
