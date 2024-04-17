const http = require('node:http');
const url = require('node:url');
const fs = require('node:fs')

const pageError = fs.readFileSync('./404.html', (err, data) => {
    if (err) {
        throw err;
    } else {
        return data;
    }
});

const server = http.createServer((req, res) => {
    const q = url.parse(req.url, true);
    if (q.pathname === '/favicon.ico') {
        res.writeHead(200, { 'Content-Type': 'image/x-icon' });
        return res.end();
    } else {
        const filename = q.pathname === '/' ? './index.html' : `./${q.pathname}.html`;
        fs.readFile(filename, (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write(pageError);
                return res.end();
            }
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
});

server.listen(8080);