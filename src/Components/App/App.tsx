import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from 'Store/RootStateContext';
import Post from 'Components/Post/Post';

import styles from './app.module.css';

const App = observer(() => {
  const { postsStore } = useRootStore();
  const { loadPosts, posts } = postsStore;

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <ul className={styles.listContainer}>
      {posts.map((post) => (
        <li key={post.id} className={styles.postContainer}>
          <Post post={post} />
        </li>
      ))}
    </ul>
  );
});

export default App;
