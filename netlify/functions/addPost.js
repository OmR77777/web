import { Client } from "@netlify/neon";

export async function handler(event, context) {
  const client = new Client({ connectionString: process.env.NETLIFY_DATABASE_URL });
  await client.connect();

  try {
    const { title, content, cover, desc, author } = JSON.parse(event.body);

    // حقل author افتراضي إذا لم يُرسل
    const postAuthor = author || "زائر";

    const result = await client.query(
      `INSERT INTO posts (title, content, cover, desc, author) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, content, cover || null, desc || null, postAuthor]
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
