import { makeObservable, observable, action } from 'mobx';
import { getPosts } from 'API/PostsAPI';

type TPost = {
  id: number;
  title: string;
};

export default class PostsStore {
  posts: TPost[] = [];

  constructor() {
    makeObservable<PostsStore, 'posts' | 'loadPosts'>(this, {
      posts: observable,
      loadPosts: action,
    });
  }

  loadPosts = () => {
    getPosts().then((result) => (this.posts = result.result));
  };
}
