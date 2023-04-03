const {addUser, findUser, getRoomUsers, deleteUser} = require('./users')

const mainSocket = (io) => {
    io.on("connection", (socket) => {
        socket.on('join', ({name, room}) => {

            socket.join(room)

            const {user, existUser} = addUser({name, room})
            let userMessage = existUser
                ? `${user.name}, и снова здравствуйте`
                : `Добро пожаловать, ${user.name}`
            socket.emit('message', {
                data: {
                    user: {name: 'Admin'},
                    message: userMessage
                }
            })
            socket.broadcast.to(user.room).emit('message', {
                data: {
                    user: {name: 'Admin'},
                    message: `${user.name} присоединился.`
                }
            })
            io.to(user.room).emit('room', {data: {users: getRoomUsers(user.room)}})
        })

        socket.on('sendMessage', ({message, params}) => {
            const user = findUser(params)

            if (user) {
                io.to(user.room).emit('message', {
                    data: {user, message}
                })
            }
        })

        socket.on('leaveRoom', ({message, params}) => {
            const user = deleteUser(params)

            if (user) {
                const {room, name} = user
                io.to(room).emit('message', {
                    data: {user: {name: 'Admin'}, message: `${name} покинул эту грешную комнату.`}
                })
                io.to(room).emit('room', {data: {users: getRoomUsers(room)}})
            }

        })


        io.on('disconnect', () => {
            console.log('Disconnecting')
        })
    })
}

module.exports = mainSocket