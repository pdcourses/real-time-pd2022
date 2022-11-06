const express = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST, () => console.log(`App listening on port ${PORT} on ${HOST}`));