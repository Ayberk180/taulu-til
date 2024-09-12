"use server"
import { lucia } from "@/lib/auth";
import { UserCollection } from "@/lib/db";
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signup(currentState:{message:string}, formData: FormData) {
    const e = formData.get('email')! as string
    let email = e.toLowerCase()
    if (typeof email !== "string" ||
        !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)
    ){
        return {
            message: "Invalid email"
        }
    } else if (await UserCollection.findOne({ email })) 
        {
            return {
                message: "There is already an account associated with this email"
            };
        }
    const user = formData.get('username')! as string;
    let username = user.toLowerCase()
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[A-Za-z0-9_-]+$/.test(username)
    ) {
        return {
            message: "Invalid username"
        };
    } else if (await UserCollection.findOne({ username })) 
        {
            return {
                message: "Username Already Exists"
            };
        }
    const password = formData.get('password');
    const confpassword = formData.get('confpassword');
    console.log('password', password, 'confpassword', confpassword)
    if (password !== confpassword){
        return {
            message: "Passwords do not match"
        };
    }
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {
            message: "Invalid password"
        };
    }

    const passwordHash = await hash(password, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });
    const userId = generateIdFromEntropySize(15);

    console.log(formData)
    try {
        UserCollection.insertOne({
            _id: userId,
            username: username,
            email: email,
            hashed_password: passwordHash,
            hasAdmin: false
        });

        const session = await lucia.createSession(userId, {});
        const sessionCookie = lucia.createSessionCookie(session.id);
        cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);
    } catch (e) {
        return {
            message: "Error occurred"
        };
    }

    return redirect("/");
}

// export async function signup(formData: FormData){
//     console.log('formdata', {formData})
// }