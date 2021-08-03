import { makeObservable, observable, action, runInAction } from 'mobx';
import { getPosts } from 'API/PostsAPI';
import { PostSortFieldsEnum } from 'Types/post';
import type { TPost } from 'Types/post';

export default class PostsStore {
  posts: TPost[] = [];

  sortField: PostSortFieldsEnum = PostSortFieldsEnum.None;

  constructor() {
    makeObservable<PostsStore>(this, {
      posts: observable,
      sortField: observable,
      loadPosts: action,
      sortPosts: action,
      loadMorePosts: action,
      resetPosts: action,
      setSortField: action,
      onFilledByEditorsChange: action,
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
    this.sortPosts();
  };

  loadMorePosts = () => {
    this.loadPosts(this.posts.length + 1);
    this.sortPosts();
  };

  resetPosts = () => {
    this.loadPosts();
  };

  sortPosts = () => {
    switch (this.sortField) {
      case PostSortFieldsEnum.Date:
        this.posts.sort(
          (a, b) =>
            new Date(a.dateRFC).getTime() - new Date(b.dateRFC).getTime()
        );
        break;
      case PostSortFieldsEnum.Rating:
        this.posts.sort((a, b) => a.likes?.summ - b.likes?.summ);
        break;
      default:
        this.posts.sort((a, b) => a.id - b.id);
        break;
    }
  };

  setSortField = (sortField: PostSortFieldsEnum) => {
    this.sortField = sortField;
    this.sortPosts();
  };

  onFilledByEditorsChange = (id: number) => {
    const changedPost = this.posts.find((post) => post.id === id);
    if (changedPost) {
      changedPost.is_filled_by_editors = !changedPost?.is_filled_by_editors;
    }
  };
}
