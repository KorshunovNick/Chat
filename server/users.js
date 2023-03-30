const strTrim = require("./utils")

let users = []

const findUser = (user)=>{
    const userName = strTrim(user.name)
    const userRoom = strTrim(user.room)
    return users.find(
        (u)=> strTrim(u.name) === userName && strTrim(u.room) === userRoom
        )
}

const addUser = (user)=> {
    
    
    const existUser = findUser(user)

    !existUser && users.push(user)
    
    const currentUser = existUser || user

    return {existUser : !!existUser, user : currentUser}
    
}

module.exports = { addUser,findUser }