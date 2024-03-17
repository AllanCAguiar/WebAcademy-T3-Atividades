import http from "http";
import fsPromises from "fs/promises";
import url from "url";
import dotenv from "dotenv";
import { loremIpsum } from "lorem-ipsum"; 
dotenv.config({path: `.env.${process.env.NODE_ENV}`});
const PORT = process.env.PORT??5000;

const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    if(parsedUrl.pathname=="/" || parsedUrl.pathname=="/index.html"){
        try{
            const html = await fsPromises.readFile("./public/index.html", "utf-8");
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(html);
        } 
        catch(error){
            console.error(error);
            res.writeHead(404, {"Content-Type": "text/html;charset=utf-8"});
            res.end("Erro enquanto carregava HTML");
        }
    } 
    else if(parsedUrl.pathname === "/style.css"){
        try{
            const css = await fsPromises.readFile("./public/style.css", "utf-8");
            res.writeHead(200, {"Content-Type": "text/css"});
            res.end(css);
        } 
        catch(error){
            console.error(error);
            res.writeHead(404, {"Content-Type": "text/html;charset=utf-8"});
            res.end("Erro enquanto carregava CSS");
        }
    }
    else if(parsedUrl.pathname=="/script.js"){
        try{
            const js = await fsPromises.readFile("./public/script.js", "utf-8");
            res.writeHead(200, {"Content-Type": "application/javascript"});
            res.end(js);
        } 
        catch(error){
            console.error(error);
            res.writeHead(404, {"Content-Type": "text/html;charset=utf-8"});
            res.end("Erro enquanto carregava script");
        }
    } 
    else if(parsedUrl.pathname=="/lorem"){
        const queryParams = parsedUrl.query;
        const numParagraphs = parseInt(queryParams.num);
        const loremText = loremIpsum({count: numParagraphs, units: "paragraphs", format: "html"});
        res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
        res.write(`${loremText}`);
        res.end();
    } 
    else{
        res.writeHead(404, {"Content-Type": "text/html;charset=utf-8"});
        res.end("Página não encontrada");
    }
});

server.listen(PORT); 
console.log("Servidor rodando na porta " + PORT);
