const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const createError = require('http-errors');
const debugLib = require('debug');

const app = express();

const debug = debugLib('module-user:server');

app.use(cors());

mongoose.connect('mongodb+srv://whislley:whislley@cluster0-dpjfq.mongodb.net/cloud?retryWrites=true', {
    useNewUrlParser: true
})

// Add headers
app.use(function (req, res, next) {
    req.io = io;
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

app.use(require("./routes"));

// catch 404 and forward to error handler 
app.use(function (req, res, next) {
    // console.log("123123123123");
    next(createError(404));
});

// error handler 
app.use(function (err, req, res, next) {
    // console.log("aiusdhauisbf");
    // set locals, only providing error in development 
    res.locals.message = err.message;
    res.locals.error = err;
    // send error
    console.log("err", err); 
    // console.log("res", res);
    res.status(err.status || 500);
    res.json({ status: res.statusCode || err.status || 500, message: err.message });
});

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
    socket.on('connectRoom', box => {
        socket.join(box);
    })
})

server.listen(process.env.PORT || 3333);
server.on('error', onError);
server.on('listening', onListening);

/** * Normalize a port into a number, string, or false. */
function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe 
        return val;
    }
    if (port >= 0) {
        // port number 
        return port;
    }
    return false;
}
/** * Event listener for HTTP server "error" event. */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
    // handle specific listen errors with friendly messages 
    switch (error.code) {
        case 'EACCES': console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE': console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/** * Event listener for HTTP server "listening" event. */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port; debug('Listening on ' + bind);
} 