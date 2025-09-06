import { Client } from "@netlify/neon";

export async function handler(event, context) {
  const client = new Client({ connectionString: process.env.NETLIFY_DATABASE_URL });
  await client.connect();

  try {
    const result = await client.query(
      "SELECT id, title, content, cover, desc, author, created_at FROM posts ORDER BY id DESC"
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, posts: result.rows }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  } finally {
    await client.end();
  }
}
