const express = require('express')
const http = require('http')
const app = express()
const { Server } = require('socket.io')
const cors = require('cors')
const router = require('./router')
const { addUser, findUser } = require('./users')
const PORT = 5000

const server = http.createServer(app) // по сути через express же создали уже

app.use(cors({ origin : "*"}))
app.use(router)

const io = new Server(server,{ // почему не app?
    cors : {
        origin : "*",
        methods : ["GET","POST"]
    }
})



io.on("connection",(socket)=>{
        socket.on('join',({name,room})=>{
            socket.join(room)

            const { user } = addUser({name,room})

            socket.emit('message',{
                data: {
                user : {name:'Admin'},
                message: `Hello my friend, ${name}`
                }
            })
            socket.broadcast.to(user.room).emit('message',{
                data: {
                user : {name: 'Admin'},
                message: `${user.name} has joined.`
                }
            })
        })

            socket.on('sendMessage',({message,params})=>{
                const user = findUser(params)

                if (user){
                    io.to(user.room).emit('message',{
                        data:{user,message}
                    })
                }
            })

    io.on('disconnect',()=>{
        console.log('Disconnecting')
    })
})

server.listen(PORT,()=>{ // почему не app?
    console.log(`Server has been started at http://localhost:${PORT}`)
})
