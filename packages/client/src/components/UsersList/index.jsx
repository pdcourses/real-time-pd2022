import React from "react";
import styles from './UsersList.module.css';
import classNames from 'classnames';

const UsersList = ({users, currentUser, onSelect}) => {
	return (
			<ul className={ styles.container }>
				{
					users.map(u => ( <li onClick={ () => onSelect(u) }
					                     className={ classNames(styles.userItem, {
						                     [ styles.userItemSelected ]: u === currentUser,
					                     }) } key={ u }>{ u }</li> ))
				}
			</ul>
	);
};

export default UsersList;