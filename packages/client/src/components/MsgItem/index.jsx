import React from 'react'

function MsgItem(props) {
  const {owner, body, timestamp} = props;
  return (
    <li style={ {
      margin: '20px',
      borderWidth: '2px',
      borderColor: owner ? 'red' : 'green',
      borderStyle: 'solid' }}>
        <p>{owner}</p>
        <p>{body}</p>
        <span>{JSON.stringify(timestamp)}</span>
    </li>
  )
}

export default MsgItem;