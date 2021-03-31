import { makeObservable, observable, action, runInAction } from 'mobx';
import { getPosts } from 'API/PostsAPI';

import type { TPost, PostSortFieldsEnum } from 'Types/post';

export default class PostsStore {
  posts: TPost[] = [];

  constructor() {
    makeObservable<PostsStore, 'posts' | 'loadPosts'>(this, {
      posts: observable,
      loadPosts: action,
      sortPosts: action,
      loadMorePosts: action,
    });
  }

  loadPosts = async (offset?: number) => {
    const result = await getPosts(offset);
    runInAction(() => {
      if (offset) {
        this.posts = Array.from(new Set([...this.posts, ...result.result]));
      } else {
        this.posts = result.result;
      }
    });
  };

  loadMorePosts = () => {
    this.loadPosts(this.posts.length + 1);
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
