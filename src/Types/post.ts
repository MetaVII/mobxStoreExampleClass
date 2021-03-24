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
};
