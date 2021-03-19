import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from 'Store/RootStateContext';

const App = observer(() => {
  const { postsStore } = useRootStore();
  const { loadPosts, posts } = postsStore;

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <ul>
      {posts.map((post) => (
        <li>{`${post.id} ${post.title}`}</li>
      ))}
    </ul>
  );
});

export default App;
