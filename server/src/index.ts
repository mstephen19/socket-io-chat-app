import express from 'express';
import cors from 'cors';
import path from 'path';
// import logger from 'morgan';
import http from 'http';
import { Server } from 'socket.io';
import { handleConnection } from './sockets';
import { getClientIp } from 'request-ip';

const app = express();

app.use(cors());
// app.use(logger('dev'));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

io.on('connection', handleConnection);

app.get('/api/ip-grabber', (req, res) => {
    const ip = getClientIp(req);
    res.status(200).json({ ip });
});

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../../client/build')));
}

app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

server.listen(3001, () => {
    console.log('server started');
});
