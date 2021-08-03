import { makeObservable, observable, action } from 'mobx';
import type { TPost } from 'Types/post';
import type PostStore from './PostsStore';

class Post {
  id: number = 0;

  dateRFC: string = '';

  title: string = '';

  intro: string = '';

  url: string = '';

  cover = {
    thumbnailUrl: '',
  };

  likes = {
    summ: 0,
  };

  store: PostStore | null = null;

  // eslint-disable-next-line camelcase
  isFilledByEditors: boolean = false;

  constructor(store: PostStore) {
    makeObservable(this, {
      isFilledByEditors: observable,
      updateFromJson: action,
    });
    this.store = store;
  }

  updateFromJson = (json: TPost) => {
    this.dateRFC = json.dateRFC;
    this.title = json.title;
    this.intro = json.intro;
    this.url = json.url;
    this.cover = json.cover;
    this.likes = json.likes;
  };

  onFilledByEditorsChange = () => {
    this.isFilledByEditors = !this.isFilledByEditors;
  };
}

export default Post;
