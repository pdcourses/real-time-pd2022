const cors = require('cors');
const http = require('http');
const express = require("express");
const socketIO = require("socket.io");

const app = express();
const server = http.Server(app);

const corsOpt = {
  origin: '*',
  methods: 'GET,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};

const io = socketIO(server, {corsOpt});

app.use(cors());
app.use(express.json());

//const router = require('./router.js');
//app.use(router);

io.on('connection', function(socket){
  socket.on('test', (data, options) => {
    console.log('data: ', data);
    console.log('options: ', options);
  })
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "127.0.0.1";

app.listen(PORT, HOST, () =>
  console.log(`App listening on port ${PORT} on ${HOST}`)
);
