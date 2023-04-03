const express = require('express')
const { Server } = require('socket.io')
const cors = require('cors')
const router = require('./router')
const mainSocket = require('./socket')
const http = require('http')


const app = express()
const PORT = process.env.PORT || 5000

const server = http.createServer(app) // по сути через express же создали уже

app.use(cors({ origin : "*", allowedHeaders: "*", methods: '*'}))
app.use(router)

const io = new Server(server,{ // почему не app?
    cors : {
        origin : "*",
        methods : ["GET","POST"]
    }
})

mainSocket(io)

server.listen(PORT,()=>{ // почему не app?
    console.log(`Server has been started at http://localhost:${PORT}`)
})
