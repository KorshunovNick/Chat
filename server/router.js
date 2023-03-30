const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('Hello')
})
router.get('/chat',(req,res)=>{
    res.send('Hello, I am chat')
})

module.exports = router