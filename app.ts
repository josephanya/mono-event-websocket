import 'dotenv/config';
import WebSocket from 'ws';
import http from 'http';
import fs from 'fs';
import path from 'path';

const server = http.createServer((req, res) => {
    if (req.url === '/errors.txt') {
        serveFile('errors.txt', res);
    } else if (req.url === '/interactions.txt') {
        serveFile('interactions.txt', res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not Found');
    }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: WebSocket.Data) => {
        const event = JSON.parse(message.toString());
        processEvent(event);
    });
});

const processEvent = (event: { type: string, data: string }) => {
    const errorFilePath = path.join(__dirname, '../errors.txt');
    const interactionFilePath = path.join(__dirname, '../interactions.txt');

    if (event.type === 'event.error') {
        fs.appendFileSync(errorFilePath, `${event.data}\n`);
    } else if (event.type === 'event.interaction') {
        fs.appendFileSync(interactionFilePath, `${event.data}\n`);
    }
};

const serveFile = (filename: string, res: http.ServerResponse) => {
    const filePath = path.join(__dirname, '../', filename);
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        }
    });
};

const createFileIfNotExists = (filename: string) => {
    const filePath = path.join(__dirname, '../', filename);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
    }
};

const port = process.env.PORT || 8080;

createFileIfNotExists('errors.txt');
createFileIfNotExists('interactions.txt');

server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});