export function getPosts(): Promise<any> {
  return fetch(
    'https://api.dtf.ru/v1.8/timeline/default/recent?count=50'
  ).then((response) => response.json());
}

export default {};
