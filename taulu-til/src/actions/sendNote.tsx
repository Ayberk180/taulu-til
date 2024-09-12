"use server";
import { User } from "lucia";
import { ttDB } from "@/lib/db";

export async function sendNote({
  user,
  email,
  name,
  message,
}: {
  user: User | null;
  email: string;
  name: string;
  message: string;
}) {
  // const searchParams = useSearchParams();
  // const word = searchParams.get("query")?.toString()
  try {
      const res = await ttDB
        .collection("messages")
        .insertOne({
          userid: user?.id,
          email: email,
          name: name,
          message: message,
        });
      // const res = await db.collection("suggestedEdits").insertOne({userid:formData.get("user"), wordid:formData.get("wordid"), word:formData.get("word"), definition:formData.get("trDef"),example:formData.get("example"),enDef:formData.get("enDef")});
      return {
        isErr: 0
        // message: formData.get("word"),
      };
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        isErr: 1,
        message: err.message,
      };
    }
  }
}
