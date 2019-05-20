const app = require('./app');

const http = require("http");

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT || "8080";
app.set("port", port);

const server = http.createServer(app);

server.listen(port);