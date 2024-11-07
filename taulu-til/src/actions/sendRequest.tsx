"use server";
import { User } from "lucia";
import { ttDB } from "@/lib/db";

export async function sendRequest({
  language,
  word,
  trans,
}: {
  language: string;
  word: string;
  trans: string;
}) {
  try {
      const res = await ttDB
        .collection("requests")
        .insertOne({
          lang: language,
          word: word,
          trans: trans,
        });
      return {
        isErr: 0
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
