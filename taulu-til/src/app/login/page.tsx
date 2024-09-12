import Link from "next/link";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Form } from "@/lib/form";
import type { ActionResult } from "@/lib/form";
import { UserCollection } from "@/lib/db";
import { SignInForm } from "@/components/ui/signInForm";

export default async function Page() {
  return (
    <div className="bg-slate-50 h-screen w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-12 pt-12">
        <h1 className="text-2xl">Sign In</h1>
        <div className="flex items-center justify-center flex-col gap-10 border-2 shadow-lg p-12 rounded-xl ">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
