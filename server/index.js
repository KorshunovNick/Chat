const express = require('express')
const app = express()
const { Sever } = require('socket.io')
const cors = require('cors')
const router = require('./router')
const PORT = 5000


app.use(cors({ origin : "*"}))
app.use(router)

const io = new Sever(app,{
    cors : {
        origin : "*",
        methods : ["GET","POST"]
    }
})

app.listen(PORT,()=>{
    console.log(`Server has been started at http://localhost:${PORT}`)
})
