import { makeObservable, observable, action, runInAction } from 'mobx';
import { getPosts } from 'API/PostsAPI';
import { PostSortFieldsEnum } from 'Types/post';
import type { TPost } from 'Types/post';
import Post from './Post';

export default class PostsStore {
  posts: Post[] = [];

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
      updatePostFromServer: action,
    });
  }

  loadPosts = async (offset?: number) => {
    let fetchedPosts = null;
    const result = await getPosts(offset);
    runInAction(() => {
      if (offset) {
        fetchedPosts = Array.from(new Set([...this.posts, ...result.result]));
      } else {
        fetchedPosts = result.result;
      }
      fetchedPosts.forEach((json: TPost) => this.updatePostFromServer(json));
    });
    this.sortPosts();
  };

  updatePostFromServer(json: TPost) {
    let foundPost = this.posts.find((post) => post.id === json.id);
    if (!foundPost) {
      foundPost = new Post(this);
      this.posts.push(foundPost);
    }
    foundPost.updateFromJson(json);
  }

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
}
