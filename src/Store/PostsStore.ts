import { makeObservable, observable, action } from 'mobx';
import { getPosts } from 'API/PostsAPI';

import type { TPost, PostSortFieldsEnum } from 'Types/post';

export default class PostsStore {
  posts: TPost[] = [];

  constructor() {
    makeObservable<PostsStore, 'posts' | 'loadPosts'>(this, {
      posts: observable,
      loadPosts: action,
      sortPosts: action,
    });
  }

  loadPosts = () => {
    getPosts().then(action((result) => (this.posts = result.result)));
  };

  sortPosts = (sortFieldName: PostSortFieldsEnum) => {
    switch (sortFieldName) {
      case 'date':
        this.posts.sort(
          (a, b) =>
            new Date(a.dateRFC).getTime() - new Date(b.dateRFC).getTime()
        );
        break;
      case 'rating':
        this.posts.sort((a, b) => a.likes?.summ - b.likes?.summ);
        break;
      default:
        break;
    }
  };
}
