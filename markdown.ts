// lib/markdown.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export function getMarkdownContent(fileName: string) {
  const fullPath = path.join(contentDirectory, `${fileName}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const matterResult = matter(fileContents);

  return matterResult.content;
}

export async function markdownToHtml(markdown:string) {
  const processedContent = await remark().use(html).process(markdown);
  return processedContent.toString();
}