import React from 'react';
import { observer } from 'mobx-react';
import type { TPost } from 'Types/post';

import styles from './post.module.css';

type TProps = {
  post: TPost;
};

const Post = observer(({ post }: TProps) => (
  <a className={styles.container} href={post.url}>
    <h2 className={styles.title}>{post.title || post.intro}</h2>
    <span
      className={styles.image}
      style={{
        backgroundImage: `url(${post.cover?.thumbnailUrl})`,
      }}
    />
    <div className={styles.footer}>
      <span
        className={`${styles.rating} ${
          post.likes?.summ < 0 ? styles.ratingNegative : ''
        }`}
      >
        {post.likes?.summ}
      </span>
      <span className={styles.date}>
        {new Date(post.dateRFC).toLocaleString()}
      </span>
    </div>
  </a>
));

export default Post;
