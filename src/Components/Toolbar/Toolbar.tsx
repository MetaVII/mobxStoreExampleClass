import React, { useState } from 'react';
import { useRootStore } from 'Store/RootStateContext';
import { PostSortFieldsEnum } from 'Types/post';

import styles from './toolbar.module.css';

function Toolbar() {
  const [sortField, setSortField] = useState<PostSortFieldsEnum>(
    PostSortFieldsEnum.None
  );

  const { postsStore } = useRootStore();
  const { sortPosts } = postsStore;

  const changeSortField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value as PostSortFieldsEnum);
    sortPosts(e.target.value as PostSortFieldsEnum);
  };

  return (
    <select
      className={styles.container}
      value={sortField}
      onChange={changeSortField}
    >
      <option value={PostSortFieldsEnum.None}>Нет</option>
      <option value={PostSortFieldsEnum.Date}>Дата</option>
      <option value={PostSortFieldsEnum.Rating}>Рейтинг</option>
    </select>
  );
}

export default Toolbar;
