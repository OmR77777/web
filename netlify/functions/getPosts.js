import fs from 'fs';
import path from 'path';

export async function handler(event, context) {
  try {
    const filePath = path.resolve('./save.json');
    let posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    return { statusCode: 200, body: JSON.stringify({ success: true, posts }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: err.message }) };
  }
}
