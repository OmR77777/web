import { Client } from "@netlify/neon";

export async function handler(event, context) {
  const client = new Client({ connectionString: process.env.NETLIFY_DATABASE_URL });
  await client.connect();

  try {
    const { title, content } = JSON.parse(event.body);
    const result = await client.query(
      "INSERT INTO posts (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, post: result.rows[0] }),
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
