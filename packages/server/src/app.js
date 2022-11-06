const express = require("express");

const app = express();
const expressWS = require('express-ws') (app);

app.use(express.json());

app.ws('/', function(ws,req){
    // слушает клиента (сообщение)
    ws.on('message', function(msg){
        console.log(msg); 
        //ws.send(msg);
    });
    console.log('socket connection', req.testing);
    console.log('socket request', req);
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST, 
    () => console.log(`App listening on port ${PORT} on ${HOST}`));