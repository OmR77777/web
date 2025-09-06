import fs from 'fs';
import path from 'path';

export async function handler(event, context) {
  const filePath = path.join('/tmp', 'save.json');
  let posts = [];

  // قراءة المقالات السابقة
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf-8');
      posts = JSON.parse(data);
    }
  } catch (err) {
    console.error('خطأ في قراءة save.json:', err);
  }

  try {
    const { title, content, cover, description, author } = JSON.parse(event.body);
    const newPost = {
      id: Date.now(),
      title,
      content,
      cover: cover || '',
      description: description || '',
      author: author || 'زائر',
      created_at: new Date().toISOString()
    };

    posts.unshift(newPost);

    // كتابة المقالات في الملف
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, post: newPost }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message }),
    };
  }
}
