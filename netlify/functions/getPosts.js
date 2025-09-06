import fs from 'fs';
import path from 'path';

export async function handler(event, context) {
  const filePath = path.join('/tmp', 'save.json');
  let posts = [];

  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      posts = JSON.parse(data);
    }
  } catch (err) {
    console.error('خطأ في قراءة save.json:', err);
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, posts }),
  };
}
