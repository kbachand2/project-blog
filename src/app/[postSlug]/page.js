import React from 'react';

import BlogHero from '@/components/BlogHero';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { MDXRemote } from 'next-mdx-remote/rsc';

import { BLOG_TITLE, PAGE_VISITS } from '@/constants';
import COMPONENT_MAP from '@/helpers/mdx-components';
import { incrementHits } from '@/db/queries';
import IncrementHits from '@/app/sql-function';

export async function generateMetadata({ params }) {
  const { frontmatter } = await loadBlogPost(params.postSlug);
  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }){
  const { frontmatter, content } = await loadBlogPost(params.postSlug);
  return (
    <article className={styles.wrapper}>
      <BlogHero
        title={frontmatter.title}
        publishedOn={frontmatter.publishedOn}
      />
      <div className={styles.page}>
      <MDXRemote 
        source ={content}
        components={COMPONENT_MAP}
        />
      </div>
      <IncrementHits slug={params.postSlug}/>
    </article>
  );
}



export default BlogPost;
