import { SignUpForm } from "@/components/ui/signUpForm";
import { hash } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { lucia } from "@/lib/auth";
import { redirect } from "next/navigation";
import { generateId, generateIdFromEntropySize } from "lucia";
import { db, UserCollection } from "@/lib/db";
import { signup } from "@/actions/signUp";
// import { SignUpForm } from "@/components/ui/signUpForm"

export default async function Page() {
  return (
    <div className="bg-slate-50 h-screen w-full overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-12 pt-12">
        <h1 className="text-2xl">Create an Account</h1>
        <div className="flex items-center justify-center flex-col gap-10 border-2 shadow-lg p-12 rounded-xl h-full ">
          <SignUpForm />
        </div>
      </div>
    </div>
  );
}

// async function signup(_: any, formData: FormData): Promise<ActionResult> {
//     "use server";
//     const username = formData.get("username");
//     // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
//     // keep in mind some database (e.g. mysql) are case insensitive
//     if (
//         typeof username !== "string" ||
//         username.length < 3 ||
//         username.length > 31 ||
//         !/^[a-z0-9_-]+$/.test(username)
//     ) {
//         return {
//             error: "Invalid username"
//         };
//     }
//     const password = formData.get("password");
//     if (typeof password !== "string" || password.length < 6 || password.length > 255) {
//         return {
//             error: "Invalid password"
//         };
//     }

//     const passwordHash = await hash(password, {
//         // recommended minimum parameters
//         memoryCost: 19456,
//         timeCost: 2,
//         outputLen: 32,
//         parallelism: 1
//     });
//     const userId = generateIdFromEntropySize(15);

//     try {
//         UserCollection.insertOne({
//             _id:userId,
//             username: username,
//             hashed_password: passwordHash
//         });

//         const session = await lucia.createSession(userId, {});
//         const sessionCookie = lucia.createSessionCookie(session.id);
//         cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
//     } catch (e) {
//         return {
//             error: "Error occurred"
//         };
//     }

//     return redirect("/");
// }

interface ActionResult {
  error: string;
}
