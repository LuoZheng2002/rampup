import { GetStaticProps } from 'next';
import MineGrid from "components/minegrid";
import { MinesweeperWrapper } from "components/minesweeper-wrapper";
import styles from "./index.module.css";
import Image from "next/image";
import glassbox from "public/assets/glassbox.png"

import { getMarkdownContent, markdownToHtml } from 'markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // for GitHub Flavored Markdown (tables, footnotes, etc.)
import remarkMath from 'remark-math'; // for math support
import rehypeKatex from 'rehype-katex'; // for math rendering
import 'katex/dist/katex.min.css'; // KaTeX CSS for math rendering


interface HomeProps {
    content: string;
  }


export default function Home({content}: HomeProps){
    return (<div>
        <div className={styles.name}>Site owned by Zheng Luo</div>
        <div className={styles.description1}>What's better than an explainable AI?</div>
        <div className={styles.description2}>An explicit-logic explainable AI!</div>
        <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {content}
      </ReactMarkdown>
        <div className={styles.glassbox}>
            <Image
                src={glassbox}
                alt="Descriptive text for screen readers"
                layout="responsive"
                width={200}
                height={200}
            />
        </div>
        <div className={styles.description3}>But how do we achieve it?</div>
        <div className={styles.description4}>Coming soon...</div>
        <div></div>
        <h1 className={styles.title}>What about having some fun with Minesweeper first?</h1>
        <MinesweeperWrapper width={20} height={18}/>
        <div>沪ICP备2024082259号-1</div>
    </div>);
}

export const getStaticProps: GetStaticProps = async () => {
    const markdownContent = getMarkdownContent('content');
  
    return {
      props: {
        content: markdownContent
      },
    };
  };