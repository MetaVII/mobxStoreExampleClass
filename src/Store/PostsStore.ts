import { makeObservable, observable, action } from 'mobx';
import { getPosts } from 'API/PostsAPI';

import type { TPost } from 'Types/post';

export default class PostsStore {
  posts: TPost[] = [];

  constructor() {
    makeObservable<PostsStore, 'posts' | 'loadPosts'>(this, {
      posts: observable,
      loadPosts: action,
    });
  }

  loadPosts = () => {
    getPosts().then(action((result) => (this.posts = result.result)));
  };
}
