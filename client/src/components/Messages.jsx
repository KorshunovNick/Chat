import React from 'react';
import styles from './Chat/Chat.module.css'

const Messages = ({messages,name})=>{

    return (
        <div className={styles.messages}>
            { messages.map(({ user , message},i)=>{
                const itsMe = user.name.trim().toLowerCase() === name.trim().toLowerCase()
                const className = itsMe ? styles.me : styles.user;

                return (
                    <div key={i} className={className}>
                        <span className={(user.name=='Admin')?styles.admin:styles.name}> {user.name} </span>
                        <span className={(user.name=='Admin')?styles.adminText:styles.text}>{message}</span>
                    </div>
                )
            })}
        </div>
    )
};

export default Messages;