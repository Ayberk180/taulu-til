"use server";
import { User } from "lucia";
import { ttDB } from "@/lib/db";


export async function makeSave({
  word,
  id,
  user,
}: {
  word: string;
  id:number;
  user: User | null;
}) {
  // const searchParams = useSearchParams();
  // const word = searchParams.get("query")?.toString()
  try {
    if (user?.username != null) {
      const res = await ttDB.collection("savedWords").insertOne({userid:user?.id, wordid:id});
      return {
        isErr: 0,
        message: word,
      };
    } else {
      throw new Error("Must be signed in to save words");
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
