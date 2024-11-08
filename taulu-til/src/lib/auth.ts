import { Lucia, Session, User } from "lucia";
import { SessionCollection, UserCollection } from "./db";
import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { cache } from "react";
import { cookies } from "next/headers";

const adapter = new MongodbAdapter(SessionCollection, UserCollection);

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: process.env.NODE_ENV === "production"
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username,
			hasAdmin: attributes.hasAdmin
		}
	},
});

export const validateRequest = cache(async(): Promise<{user:User; session:Session} | {user:null; session:null}> => {
	const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
	if (!sessionId) {
		return {
			user:null, session:null
		}
	}

	const result= await lucia.validateSession(sessionId);

	try{
		if (result.session && result.session.fresh) {
			const sessionCookie = lucia.createSessionCookie(result.session.id);
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		} else {
			const sessionCookie = lucia.createBlankSessionCookie();
			cookies().set(
				sessionCookie.name,
				sessionCookie.value,
				sessionCookie.attributes
			);
		}
	} catch (err) {}

	return result;
})

// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
	interface DatabaseUserAttributes {
		username: string,
		hasAdmin: boolean,
		email: string,
		hashed_password: string,
	}
}
