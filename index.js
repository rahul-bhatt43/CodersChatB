const express = require('express');
const http = require('http');
const dotenv = require('dotenv')
const app = express();
const cors = require('cors')
app.use(cors());
dotenv.config();

const server = http.createServer(app);



const { Server } = require('socket.io')

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "https://coderschat.netlify.app"],
        methods: ["GET", "POST"],
    }
});

io.on("connection", (socket) => {
    // console.log("User connected", socket.id);

    socket.on("join_room", (data) => {
        socket.join(data);
    })

    socket.on("sent_message", (data) => {

        socket.to(data.room).emit("received_message", data);
    })
})

app.get('/', (req, res) => {
    res.send("Coder's Chat Backend")
})

server.listen(process.env.PORT || 3000, () => {
    console.log("Server is running at", process.env.PORT || 3000);
});
