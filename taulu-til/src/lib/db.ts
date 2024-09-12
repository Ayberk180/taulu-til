import { MongodbAdapter } from "@lucia-auth/adapter-mongodb";
import { Collection, MongoClient } from "mongodb";
import * as dotenv from 'dotenv'

dotenv.config()
export const client = new MongoClient(process.env.REACT_APP_MONGODBURI!);

async () => {
	await client.connect();
};

export const db = client.db("Auth");
export const ttDB = client.db("TauluTil")
export const UserCollection = db.collection("users") as Collection<UserDoc>;
export const SessionCollection = db.collection("sessions") as Collection<SessionDoc>;

 interface UserDoc {
	_id: string;
	username: string;
	email: string;
	hashed_password: string;
	hasAdmin:boolean;
}

interface SessionDoc {
	_id: string;
	expires_at: Date;
	user_id: string;
	hasAdmin:boolean;
}