//File: src/services/accounts/getUserRole.ts
import { client } from '../../config/db';

export async function ser_getUserRole(id: string): Promise<string | null> {
  try {
    const res = await client.query(
      'SELECT role FROM users WHERE id = $1',
      [id]
    );
    return res.rows[0]?.role ?? null;
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return null;
  }
}
