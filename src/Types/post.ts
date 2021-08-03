export enum PostSortFieldsEnum {
  None = '',
  Date = 'date',
  Rating = 'rating',
}

export type TPost = {
  id: number;
  dateRFC: string;
  title: string;
  intro: string;
  url: string;
  cover: {
    thumbnailUrl: string;
  };
  likes: {
    summ: number;
  };
  // eslint-disable-next-line camelcase
  is_filled_by_editors: boolean;
};
