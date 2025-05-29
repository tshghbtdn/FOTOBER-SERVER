// src/services/getUserPassword.ts
import { client } from '../config/db';

export async function getUserPassword(username: string): Promise<string | null> {
  try {
    const res = await client.query(
      'SELECT password FROM users WHERE username = $1',
      [username]
    );
    return res.rows[0]?.password ?? null;
  } catch (error) {
    console.error('Error in getUserPassword:', error);
    return null;
  }
}
