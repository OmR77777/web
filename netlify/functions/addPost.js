import fs from 'fs';
import path from 'path';

const SAVE_PATH = '/tmp/save.json';

export async function handler(event, context) {
  try {
    const { title, content, cover = '', description = '', author = 'زائر' } = JSON.parse(event.body);

    // قراءة البيانات الحالية
    let posts = [];
    if (fs.existsSync(SAVE_PATH)) {
      const data = fs.readFileSync(SAVE_PATH, 'utf-8');
      posts = JSON.parse(data);
    }

    // إنشاء مقال جديد
    const newPost = {
      id: Date.now(),
      title,
      content,
      cover,
      description,
      author,
      created_at: new Date().toISOString()
    };

    posts.unshift(newPost);

    // كتابة المقالات في الملف
    fs.writeFileSync(SAVE_PATH, JSON.stringify(posts, null, 2), 'utf-8');

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, post: newPost })
    };

  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: err.message })
    };
  }
}
