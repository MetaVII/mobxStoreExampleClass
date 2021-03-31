export function getPosts(offset?: number): Promise<any> {
  return fetch(
    `https://api.dtf.ru/v1.8/timeline/default/recent${
      offset ? `?offset=${offset}` : ''
    }`
  ).then((response) => response.json());
}

export default {};
