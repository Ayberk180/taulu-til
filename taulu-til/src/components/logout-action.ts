"use server";

import { lucia, validateRequest } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function logoutAction(formData:FormData) {
    
    const {session}  = await validateRequest();

    if(!session) {
        return redirect("/login");
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();

    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return redirect("/")

}
