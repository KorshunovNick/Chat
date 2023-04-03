import s from './Chat.module.css'

import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from 'react-router-dom';
import logo from '../../style/img/spy.png'
import EmojiPicker from 'emoji-picker-react'
import emojiIMG from '../../style/img/free-icon-happy-3115648 (1).png'
import Messages from '../Messages'
import {useOutsideAction} from "../../hooks/useOutsideAction";
import {useChat} from "../../hooks/useChat";

const Chat = () => {
    const {search} = useLocation()
    const [userInfo, setUserInfo] = useState(null)
    const [message, setMessage] = useState('')
    const [isOpen, setOpen] = useState(false)
    const emojiContainerRef = useRef()
    const chat = useChat(userInfo)

    useOutsideAction(emojiContainerRef, () => setOpen(false))

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search))
        setUserInfo(searchParams)
    }, [search])


    const handleChange = ({target: {value}}) => setMessage(value)
    const onEmojiClick = ({emoji}) => {
        setMessage(`${message} ${emoji}`)
    }
    const sendMessage = (e) => {
        e.preventDefault()

        if (!message) return;

        chat.sendMessage(message)
        setMessage("")
    }


    return (
        <div className={s.container}>
            <div className={s.header}>
                <div className={s.logo}><em>Secter</em><img src={logo}/><b>talk</b></div>
                <div className={s.room}>{userInfo?.room}</div>
                <div className={s.users}>
                    <pre> <b>{chat.usersCount}</b> users in this room</pre>
                </div>
                <div className={s.password}></div>
                <button
                    className={s.leave}
                    onClick={chat.leaveRoom}
                >leave
                </button>
            </div>
            <Messages messages={chat.messages} name={userInfo?.name}/>
            <form className={s.form} onSubmit={sendMessage}>
                <div className={s.input}>
                    <input
                        type="text"
                        name="message"
                        value={message}
                        placeholder='Tall me about your secret'
                        onChange={handleChange}
                        autoComplete='off'/>
                </div>
                <div className={s.emoji}>
                    <img src={emojiIMG} alt="" onClick={() => setOpen(!isOpen)}/>

                    {isOpen && (
                        <div className={s.emojis} ref={emojiContainerRef}>
                            <EmojiPicker onEmojiClick={onEmojiClick}/>
                        </div>
                    )}
                </div>
                <input
                    type="submit"
                    name="submit"
                    value="Send"
                    className={s.send}
                    onClick={sendMessage}
                />
            </form>
        </div>
    )
}
export default Chat