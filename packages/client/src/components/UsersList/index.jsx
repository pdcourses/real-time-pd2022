import React from "react";

const UsersList = ({users, currentUser, onSelect}) => {
    return(
        <ul>
            {users.map( (u,i) => (
                <li onClick={ () => onSelect(u)} key={i}>
                    {' '}
                    {u}
                </li>
            ))}
        </ul>
    );
}

export default UsersList;