const http = require("http");
const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config({path: `.env.${process.env.NODE_ENV}`})
const PORT = process.env.PORT??5000;

const server = http.createServer(function(req, res) {
    let file = process.argv[2];
    fs.readdir(file, (err, files) => {
        if (err) {
            res.writeHead(404, {'Content-Type': "text/html;charset=utf-8"});
            res.end('Erro: Diretório não encontrado');
            return;
        }
        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        files.forEach(file => {
            res.write(`${file}<br>`);
        });
        res.end();
    });
});

server.listen(PORT) 
console.log("Servidor rodando na porta "+ PORT);
