import React from 'react';
import styles from './styles.css';
import MsgItem from '../MsgItem';

function MsgList(props) {
    const {messages} = props;
  return (
    <ul className={styles.list}>
            { messages ? (
              messages.map((m, i) => <MsgItem key={i} {...m} />))
              : (
                <li>no selected chat</li>
              )
        }
    </ul>
  );
}

export default MsgList;