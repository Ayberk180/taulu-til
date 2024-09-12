"use server"
import { lucia } from "@/lib/auth";
import { UserCollection } from "@/lib/db";
import { ActionResult } from "@/lib/form";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signin(currentState:{message:string}, formData: FormData){
	let user = formData.get("username")! as string
	let username = user.toLowerCase()

	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31 ||
		!/^[A-Za-z0-9_-]+$/.test(username.toLowerCase())
	) {
		return {
			message: "Invalid username"
		};
	}
	const password = formData.get("password");
	if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return {
			message: "Invalid password"
		};
	}

	const existingUser = await UserCollection.findOne({username});
	if (!existingUser) {
		return {
			message: "Incorrect username or password"
		};
	}

	console.log(existingUser)
	const validPassword = await verify(existingUser.hashed_password, password, {
		memoryCost: 19456,
		timeCost: 2
	});
	if (!validPassword) {
		// NOTE:
		// Returning immediately allows malicious actors to figure out valid usernames from response times,
		// allowing them to only focus on guessing passwords in brute-force attacks.
		// As a preventive measure, you may want to hash passwords even for invalid usernames.
		// However, valid usernames can be already be revealed with the signup page among other methods.
		// It will also be much more resource intensive.
		// Since protecting against this is non-trivial,
		// it is crucial your implementation is protected against brute-force attacks with login throttling, 2FA, etc.
		// If usernames are public, you can outright tell the user that the username is invalid.
		return {
			message: "Incorrect username or password"
		};
	}

	const session = await lucia.createSession(existingUser._id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
	return redirect("/");
}