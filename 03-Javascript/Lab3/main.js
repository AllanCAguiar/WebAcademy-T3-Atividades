// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const comecaBolas = document.querySelector("#comecaBolas");
const comecaQuadrados = document.querySelector("#comecaQuadrados");
const cor = document.querySelector("#cor");
const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);
let quant = document.querySelector("#quant");

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
}

function changeColor(color, grad) {
    let values = color.match(/\d+/g);
    let r = parseInt(values[0]);
    let g = parseInt(values[1]);
    let b = parseInt(values[2]);
    //Se o elemento está clareando
    if(grad==1){
        r = Math.round(r * (1 + 0.2));
        g = Math.round(g * (1 + 0.2));
        b = Math.round(b * (1 + 0.2));
        
    }
    //Se o elemento está escurecendo
    if(grad==-1){
        r = Math.round(r * (1 - 0.2));
        g = Math.round(g * (1 - 0.2));
        b = Math.round(b * (1 - 0.2));
        
    }
    if(r>240||g>240||b>240){
        grad=-1;
        r = Math.min(r, 255);
        g = Math.min(g, 255);
        b = Math.min(b, 255);
    }
    else if(r<20||g<20||b<20){
        grad=1;
        r = Math.max(r, 5);
        g = Math.max(g, 5);
        b = Math.max(b, 5);
    }
    color= "rgb("+ r + ", " + g + ", "+ b+ ")";
    return {
        color: color,
        grad: grad
    };
}

class Ball {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.grad = 1;
    }
  
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        ctx.fill();
    }
  
    update() {
        if (this.x + this.size >= width || this.x - this.size <= 0) {
            this.velX = -this.velX;
        }
  
        if (this.y + this.size >= height || this.y - this.size <= 0) {
            this.velY = -this.velY;
        }
  
        this.x += this.velX;
        this.y += this.velY;
    }
    collisionDetect() {
        for (let j = 0; j < balls.length; j++) {
            if (!(this === balls[j])) {
                let dx = this.x - balls[j].x;
                let dy = this.y - balls[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);
    
                if (distance < this.size + balls[j].size) {
                    let novos = changeColor(balls[j].color, balls[j].grad);
                    balls[j].color = novos.color;
                    balls[j].grad = novos.grad;
                    this.color = novos.color;
                    this.grad = novos.grad; 
                }
            }
        }
    }
}

class Square {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
        this.grad = 1;
    }
  
    draw() {
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x - this.size, this.y - this.size, this.size * 2, this.size * 2);
        ctx.fill();
    }
  
    update() {
        if (this.x + this.size >= width || this.x - this.size <= 0) {
            this.velX = -this.velX;
        }
  
        if (this.y + this.size >= height || this.y - this.size <= 0) {
            this.velY = -this.velY;
        }
    
        this.x += this.velX;
        this.y += this.velY;
        }
  
    collisionDetect() {
        for (let j = 0; j < squares.length; j++) {
            if (!(this === squares[j])) {
                const dX = Math.abs(this.x - squares[j].x);
                const dY = Math.abs(this.y - squares[j].y);
                const distance = (this.size + squares[j].size);
    
                if (dX < distance && dY < distance) {
                    let novos = changeColor(squares[j].color, squares[j].grad);
                    squares[j].color = novos.color;
                    squares[j].grad = novos.grad;
                    this.color = novos.color;
                    this.grad = novos.grad; 
                }
            }
        }
    }
  }
  
function loopQuadrados() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
    
    for (let i = 0; i < squares.length; i++) {
        squares[i].draw();
        squares[i].update();
        squares[i].collisionDetect();
    }
  
    requestAnimationFrame(loopQuadrados);
}

function loopBolas() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, width, height);
  
    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
  
    requestAnimationFrame(loopBolas);
}
  
const balls = [];
const squares = [];

comecaBolas.addEventListener("click", carregarBolas);
function carregarBolas(){
    if(quant.value<=0){
        window.alert("É necessario pelo menos 1 elemento");
        return;
    }
    while (balls.length < quant.value) {
        const size = random(10, 20);
        let r = parseInt(cor.value.substring(1, 3), 16);
        let g = parseInt(cor.value.substring(3, 5), 16);
        let b = parseInt(cor.value.substring(5, 7), 16);

        const ball = new Ball(
            random(0 + size, width - size),
            random(0 + size, height - size),
            random(-7, 7),
            random(-7, 7),
            "rgb(" +
                r + "," +
                g + "," +
                b + ")",
            size
        );
        balls.push(ball);
      }
      document.getElementById("info").remove();
      loopBolas();
}

comecaQuadrados.addEventListener("click", carregarQuadrados);
function carregarQuadrados(){
    while (squares.length < quant.value) {
        const size = random(10, 20);
        let r = parseInt(cor.value.substring(1, 3), 16);
        let g = parseInt(cor.value.substring(3, 5), 16);
        let b = parseInt(cor.value.substring(5, 7), 16);
        const square = new Square(
            random(0 + size, width - size),
            random(0 + size, height - size),
            random(-7, 7),
            random(-7, 7),
            "rgb(" +
                r + "," +
                g + "," +
                b + ")",
            size
      );
        squares.push(square);
      }
      document.getElementById("info").remove();
      loopQuadrados();
}