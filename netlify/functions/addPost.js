import fs from 'fs';
import path from 'path';

export async function handler(event, context) {
  try {
    const { title, content, cover, description, author } = JSON.parse(event.body);

    if (!title || !content || !author) {
      return { statusCode: 400, body: JSON.stringify({ success: false, error: "العنوان، المحتوى، والمؤلف مطلوبون." }) };
    }

    const filePath = path.resolve('./save.json');
    let posts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    const newPost = {
      id: Date.now(),
      title,
      content,
      cover: cover || '',
      description: description || '',
      author,
      created_at: new Date().toISOString()
    };

    posts.unshift(newPost);
    fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf-8');

    return { statusCode: 200, body: JSON.stringify({ success: true, post: newPost }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ success: false, error: err.message }) };
  }
}
