import fs from 'fs';
import path from 'path';

const SAVE_PATH = '/tmp/save.json';

export async function handler(event, context) {
  try {
    let posts = [];
    if (fs.existsSync(SAVE_PATH)) {
      const data = fs.readFileSync(SAVE_PATH, 'utf-8');
      posts = JSON.parse(data);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, posts })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
}
