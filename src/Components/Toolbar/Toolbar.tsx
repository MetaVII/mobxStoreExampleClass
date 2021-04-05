import React, { useState } from 'react';
import { useRootStore } from 'Store/RootStateContext';
import Button from 'Components/Button/Button';
import { PostSortFieldsEnum } from 'Types/post';

import styles from './toolbar.module.css';

function Toolbar() {
  const [sortField, setSortField] = useState<PostSortFieldsEnum>(
    PostSortFieldsEnum.None
  );

  const { postsStore } = useRootStore();
  const { sortPosts, loadMorePosts, resetPosts } = postsStore;

  const changeSortField = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value as PostSortFieldsEnum);
    sortPosts(e.target.value as PostSortFieldsEnum);
  };

  return (
    <div className={styles.container}>
      <select
        className={styles.select}
        value={sortField}
        onChange={changeSortField}
      >
        <option value={PostSortFieldsEnum.None}>Нет</option>
        <option value={PostSortFieldsEnum.Date}>Дата</option>
        <option value={PostSortFieldsEnum.Rating}>Рейтинг</option>
      </select>
      <div>
        <Button text='Сбросить сообщения' onClick={resetPosts} />
        <span className={styles.buttonMargin} />
        <Button text='Загрузить ещё' onClick={loadMorePosts} />
      </div>
    </div>
  );
}

export default Toolbar;
