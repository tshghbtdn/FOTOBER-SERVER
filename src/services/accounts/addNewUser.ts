//File: src/services/accounts/addNewUser.ts
import { client } from "../../config/db";
import { hash } from "bcryptjs";

const BCRYPT_SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS || '8');

if (!BCRYPT_SALT_ROUNDS) {
    throw new Error("Missing BCRYPT_SALT_ROUNDS in environment variables.");
}

export const ser_addNewUser = async (
    username: string,
    email: string,
    password: string,
    name: string,
    role: string
): Promise<void> => {
    const hashedPassword = await hash(password, BCRYPT_SALT_ROUNDS);
    try{
        const query = `
            INSERT INTO users (username, password, name, email, role)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id;
        `

        const values = [username, hashedPassword, name, email, role];
        await client.query(query, values);
    }
    catch(err: any){
        if (err.code === 11000){
            // Duplicate key error (unique field conflict)
            const field = Object.keys(err.keyPattern)[0];
            throw new Error(`${field} is already taken. Please try another one.`);
        } else{
            throw err;
        }
    }
}