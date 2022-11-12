import React from 'react';
import styles from './styles.css';

function MsgList(props) {
    const {messages} = props;
  return (
    <ul className={styles.list}>
        {
            messages.map((m,i) => (<li key={i}>{m}</li>))
        }
    </ul>
  )
}

export default MsgList;