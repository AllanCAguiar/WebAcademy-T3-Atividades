const http = require("http");
const fs = require("fs");
const dotenv = require("dotenv");
const utils = require("../utils/utils")
dotenv.config({path: `.env.${process.env.NODE_ENV}`})
const PORT = process.env.PORT??5000;

const server = http.createServer(function(req, res){
    let file = process.argv[2];
    if(req.url=="/"){
        fs.readdir(file, (err, files) => {
            if(err){
                res.writeHead(404, {'Content-Type': "text/html;charset=utf-8"});
                res.end('Erro: Diretório não encontrado');
                return;
            }
            res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
            files.forEach(file => {
                res.write(`${utils.createLink(file)}<a>`);
            });
            res.end();
        });
    }
    else if(req.url=="/favicon.ico"){
        res.writeHead(204);
        res.end();
        return;
    }
    else{
        let fileName = "public/" + req.url.slice(1);
        fs.readFile(fileName, (err, file) => {
            if(err){
                res.writeHead(404, { 'Content-Type': "text/html;charset=utf-8" });
                res.end('Erro: Não foi possível ler o arquivo');
                return;
            }
            res.writeHead(200, { 'Content-Type': "text/html;charset=utf-8" });
            res.write(`<a href="/">Voltar</a><br>`)
            res.end(file);
        });
    }
});

server.listen(PORT); 
console.log("Servidor rodando na porta "+ PORT);
