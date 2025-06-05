//File: src/services/accounts/getUserId.ts
import { client } from '../../config/db';

export async function ser_getUserId(username: string): Promise<string | null> {
  try {
    const res = await client.query(
      'SELECT id FROM users WHERE username = $1',
      [username]
    );
    return res.rows[0]?.id ?? null;
  } catch (error) {
    console.error('Error in getUserId:', error);
    return null;
  }
}
