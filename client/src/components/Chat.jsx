import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import  io  from 'socket.io-client'
import logo from '../style/img/spy.png'
import styles from '../style/Chat.module.css'
import EmojiPicker from 'emoji-picker-react'
import emojiIMG from '../style/img/free-icon-happy-3115648 (1).png'
import Messages from './Messages'

const socket = io.connect("http://localhost:5000")

const Chat = ()=>{
    const { search } = useLocation() 
    const [params,setParams] = useState({room:'',user:''})
    const [state,setState] = useState([])
    const [message,setMessage] = useState('')
    const [isOpen,setOpen]=useState(false)

    useEffect(()=>{

        const searchParams = Object.fromEntries(new URLSearchParams(search))
        
        setParams(searchParams)

        socket.emit('join',searchParams)

    },[search])
    console.log(params)

    useEffect(() => {
        socket.on('message',({data})=>{
            setState((_state)=> ([..._state,data]))
        })
    },[])

    const leaveRoom = ()=>{}
    const handleChange = ({target:{value}})=>setMessage(value)
    const onEmojiClick = ({emoji})=> setMessage(`${message} ${emoji}`)
    const sendMessage = (e)=>{
        e.preventDefault()

        if (!message) return;

        socket.emit('sendMessage',{
            message,
            params
        })
        setMessage("")
    }

    console.log(state)

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.logo}><em>Secter</em><img src={logo}/><b>talk</b></div>
                <div id='room'>{params.room}</div>
                <div className={styles.users}>0 users in this room</div>
                <div password={styles.password}></div>
                <button
                className={styles.leave}
                onClick={leaveRoom}
                 >leave</button>
                </div>
            <Messages messages={state} name={params.name}/>
            <form className={styles.form}>
                <div className={styles.input}>
                <input 
                type="text" 
                name="message"
                value={message}
                placeholder='Tall me about your secret'
                onChange = {handleChange}
                autoComplete='off'/>
                </div>
                <div className={styles.emoji}>
                    <img src={emojiIMG} alt="" onClick={()=> setOpen(!isOpen)}/>

                    {isOpen && (
                        <div className={styles.emojis}>
                    <EmojiPicker onEmojiClick={onEmojiClick}/>
                    </div>
                    )}
                </div>
                <input
                type="submit" 
                name="submit"
                value="Send"
                className={styles.send}
                onClick={sendMessage}
                />
            </form>
        </div>
    )
}
export default Chat