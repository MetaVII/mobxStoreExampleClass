import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from 'Store/RootStateContext';
import Post from 'Components/Post/Post';
import Toolbar from 'Components/Toolbar/Toolbar';

import styles from './app.module.css';

const App = observer(() => {
  const { postsStore } = useRootStore();
  const { loadPosts, posts } = postsStore;

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className={styles.appContainer}>
      <Toolbar />
      <ul className={styles.listContainer}>
        {posts.map((post) => (
          <li key={post.id} className={styles.postContainer}>
            <Post post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
});

export default App;
