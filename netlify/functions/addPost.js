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

    // إضافة مقال جديد
    const newPost = {
      id: Date.now(),
      title,
      content,
      cover,
      description,
      author,
      created_at
