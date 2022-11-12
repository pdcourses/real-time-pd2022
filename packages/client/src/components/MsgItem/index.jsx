import React from 'react'

function MsgItem(props) {
  const {owner, body, timestamp} = props;
  return (
    <li>
        <p>{owner}</p>
        <p>{body}</p>
        <span>{JSON.stringify(timestamp)}</span>
    </li>
  )
}

export default MsgItem;