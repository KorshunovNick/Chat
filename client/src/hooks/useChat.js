import io from "socket.io-client";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

const socket = io.connect("http://localhost:8080")

export function useChat(userInfo){
    const [messages, setMessages] = useState([])
    const [usersCount, setUsersCount] = useState(0)
    const [isConnected, setIsConnected] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(userInfo && !isConnected){
            socket.emit('join', userInfo)
            setIsConnected(true)
        }
    }, [userInfo])


    useEffect(() => {
        socket.on('message', ({data}) => {
            setMessages((_messages) => ([..._messages, data]))
        })

        socket.on('room', ({data: {users}}) => {
            setUsersCount(users.length)
        })
    }, [])

    const leaveRoom = () => {
        socket.emit('leaveRoom', {params: userInfo})
        navigate("/")
    }

    const sendMessage = (message) => {
        socket.emit('sendMessage', {
            message,
            params: userInfo
        })
    }


    return {messages, usersCount, leaveRoom, sendMessage}
}