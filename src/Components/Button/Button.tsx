import React, { MouseEventHandler } from 'react';

import styles from './button.module.css';

type TProps = {
  text: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
};

function Button({ text, onClick }: TProps) {
  return (
    <button type='button' className={styles.container} onClick={onClick}>
      {text}
    </button>
  );
}

export default Button;
