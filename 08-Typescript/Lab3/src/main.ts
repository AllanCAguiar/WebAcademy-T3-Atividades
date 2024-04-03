// Valores possíveis de resoluções
type resolucoes = "HD" | "FULL HD" | "2K" | "4K" | "8K"
let cont = 4;

// Interface para representar um produto genérico
interface Produto {
    getID(): number;
    getModelo(): string;
    getFabricante(): string;
    getValor(): number;
}

// Classe genérica para representar o carrinho de compras
class carrinhodeCampos<T extends Produto> {
    private itens: T[] = [];

    // Adiciona um produto ao carrinho
    adicionarProduto(item: T) {
        this.itens.push(item);
        this.mostrarEstatisticas();
    }

    removerProduto(id: number): void {
        this.itens = this.itens.filter(produto => produto.getID() !== id);
    }

    getNumItens(): number {
        return this.itens.length;
    }

    // Calcula o valor total do carrinho
    getValorTotal(): number {
        return this.itens.reduce((total, item) => total + item.getValor(), 0);
    }

    // Exibe os detalhes do carrinho
    mostrarEstatisticas() {
        const estatisticas = document.getElementById('estatisticas');
        if (estatisticas) {
            estatisticas.innerHTML = `<p>Quantidade de itens: ${this.getNumItens()} <br> Valor Total: R$${this.getValorTotal().toFixed(2)}</p>`;
        }
    }
}

// Classe representando um produto TV
class TV implements Produto {
    constructor(
        private ID: number,
        private modelo: string, 
        private resolucao: resolucoes, 
        private tamanho: number, 
        private fabricante: string, 
        private valor: number
    ) {}
    
    getID(): number {
        return this.ID;
    }
    getModelo(): string {
        return this.modelo;
    }
    getResolucao(): resolucoes {
        return this.resolucao;
    }
    getTamanho(): number {
        return this.tamanho;
    }
    getFabricante(): string {
        return this.fabricante;
    }
    getValor(): number {
        return this.valor;
    }
}

// Classe representando um produto Celular
class Celular implements Produto {
    constructor(
        private ID: number,
        private modelo: string, 
        private memoria: number, 
        private fabricante: string, 
        private valor: number
    ) {}

    getID(): number {
        return this.ID;
    }
    getModelo(): string {
        return this.modelo;
    }
    getMemoria(): number {
        return this.memoria;
    }
    getFabricante(): string {
        return this.fabricante;
    }
    getValor(): number {
        return this.valor;
    }
}

// Classe representando um produto Bicicleta
class Bicicleta implements Produto {
    constructor(
        private ID: number,
        private modelo: string, 
        private tamanhoAro: number, 
        private fabricante: string, 
        private valor: number
    ) {}

    getID(): number {
        return this.ID;
    }
    getModelo(): string {
        return this.modelo;
    }
    getTamanhoAro(): number {
        return this.tamanhoAro;
    }
    getFabricante(): string {
        return this.fabricante;
    }
    getValor(): number {
        return this.valor;
    }
}

// Função para remover um produto
function removerProduto(botao: HTMLAnchorElement) {
    const id = botao.id;
    const produto = document.getElementById(id);
    const confirmacao = confirm(`Tem certeza que deseja apagar?`);
    if(confirmacao){
        // Removendo elemento html
        produto?.remove();
        // Atualizando estatisticas
        carrinho.removerProduto(parseInt(id.slice(7)));
        carrinho.mostrarEstatisticas();
    }
}
    

    

// Função para criar o html do produto TV
function criarCardTV(produto: TV) {
    const novo = document.createElement("div");
    novo.classList.add("col-md-3", "col-sm-6", "col-12");
    novo.id="produto"+produto.getID();
    novo.innerHTML = `
        <div class="card">
            <div class="card-body bg-light d-flex flex-column">
                <h5 class="card-title">TV</h5>
                <p class="card-text"><strong>Modelo: </strong>${produto.getModelo()}</p>
                <p class="card-text"><strong>Resolução:</strong> ${produto.getResolucao()}</p>
                <p class="card-text"><strong>Tamanho: </strong>${produto.getTamanho()}</p>
                <p class="card-text"><strong>Fabricante:</strong> ${produto.getFabricante()}</p>
                <p class="card-text"><strong>Preço:</strong> R$${produto.getValor().toFixed(2)}</p>
                <a href="#" id="produto${produto.getID()}" class="btn btn-danger w-100 mt-auto" onclick="removerProduto(this)">Remover</a>
            </div>
        </div>
        `;
    const container = document.querySelector("#cardsProdutos");
    container?.appendChild(novo);
}

// Função para criar o html do produto Celular
function criarCardCelular(produto: Celular) {
    const novo = document.createElement("div");
    novo.classList.add("col-md-3", "col-sm-6", "col-12");
    novo.id="produto"+produto.getID();
    novo.innerHTML = `
        <div class="card">
            <div class="card-body bg-light d-flex flex-column">
                <h5 class="card-title">Celular</h5>
                <p class="card-text"><strong>Modelo: </strong>${produto.getModelo()}</p>
                <p class="card-text"><strong>Mémoria:</strong> ${produto.getMemoria()}GB</p>
                <p class="card-text"><strong>Fabricante:</strong> ${produto.getFabricante()}</p>
                <p class="card-text"><strong>Preço:</strong> R$${produto.getValor().toFixed(2)}</p>
                <a href="#" id="produto${produto.getID()}" class="btn btn-danger w-100 mt-auto" onclick="removerProduto(this)">Remover</a>
            </div>
        </div>
        `;
    const container = document.querySelector("#cardsProdutos");
    container?.appendChild(novo);
}

// Função para criar o html do produto Bicicleta
function criarCardBicicleta(produto: Bicicleta) {
    const novo = document.createElement("div");
    novo.classList.add("col-md-3", "col-sm-6", "col-12");
    novo.id="produto"+produto.getID();
    novo.innerHTML = `
        <div class="card">
            <div class="card-body bg-light d-flex flex-column">
                <h5 class="card-title">Bicicleta</h5>
                <p class="card-text"><strong>Modelo: </strong>${produto.getModelo()}</p>
                <p class="card-text"><strong>Tamanho do Aro:</strong> ${produto.getTamanhoAro()}GB</p>
                <p class="card-text"><strong>Fabricante:</strong> ${produto.getFabricante()}</p>
                <p class="card-text"><strong>Preço:</strong> R$${produto.getValor().toFixed(2)}</p>
                <a href="#" id="produto${produto.getID()}" class="btn btn-danger w-100 mt-auto" onclick="removerProduto(this)">Remover</a>
            </div>
        </div>
        `;
    const container = document.querySelector("#cardsProdutos");
    container?.appendChild(novo);
}

// Eventos de submissões dos formularios
document.getElementById("formTV")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const modelo = (document.getElementById("modeloTV") as HTMLInputElement).value;
    const resolucao = (document.getElementById("resolucao") as HTMLSelectElement).value as resolucoes;
    const tamanho = parseInt((document.getElementById("tamanho") as HTMLInputElement).value);
    const fabricante = (document.getElementById("fabricanteTV") as HTMLInputElement).value;
    const preco = parseFloat((document.getElementById("precoTV") as HTMLInputElement).value);
    const novo = new TV(cont++, modelo, resolucao, tamanho, fabricante, preco)
    // Para criar o html
    criarCardTV(novo);
    // Para atualizar as estatisticas
    carrinho.adicionarProduto(novo);

    // Para fechar o modal
    const modalElement = document.getElementById("modalTV") as HTMLElement;
    modalElement.style.display = "none";
    const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
    modalBackdrop.parentNode?.removeChild(modalBackdrop);  

    // Limpar os campos do formulário
    (document.getElementById("formTV") as HTMLFormElement).reset();
});

document.getElementById("formCelular")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const modelo = (document.getElementById("modeloCelular") as HTMLInputElement).value;
    const memoria = parseInt((document.getElementById("memoria") as HTMLInputElement).value);
    const fabricante = (document.getElementById("fabricanteCelular") as HTMLInputElement).value;
    const preco = parseFloat((document.getElementById("precoCelular") as HTMLInputElement).value);
    const novo = new Celular(cont++, modelo, memoria, fabricante, preco)
    // Para criar o html
    criarCardCelular(novo);
    // Para atualizar as estatisticas
    carrinho.adicionarProduto(novo);

    // Para fechar o modal
    const modalElement = document.getElementById("modalCelular") as HTMLElement;
    modalElement.style.display = "none";
    const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
    modalBackdrop.parentNode?.removeChild(modalBackdrop);  

    // Limpar os campos do formulário
    (document.getElementById("formCelular") as HTMLFormElement).reset();
});

document.getElementById("formBicicleta")?.addEventListener("submit", function(event) {
    event.preventDefault();
    const modelo = (document.getElementById("modeloBicicleta") as HTMLInputElement).value;
    const tamanhoAro = parseInt((document.getElementById("tamanhoAro") as HTMLInputElement).value);
    const fabricante = (document.getElementById("fabricanteBicicleta") as HTMLInputElement).value;
    const preco = parseFloat((document.getElementById("precoBicicleta") as HTMLInputElement).value);
    const novo = new Bicicleta(cont++, modelo, tamanhoAro, fabricante, preco)
    // Para criar o html
    criarCardBicicleta(novo);
    // Para atualizar as estatisticas
    carrinho.adicionarProduto(novo);

    // Para fechar o modal
    const modalElement = document.getElementById("modalBicicleta") as HTMLElement;
    modalElement.style.display = "none";
    const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
    modalBackdrop.parentNode?.removeChild(modalBackdrop);  

    // Limpar os campos do formulário
    (document.getElementById("formBicicleta") as HTMLFormElement).reset();
});

const carrinho = new carrinhodeCampos();

// Produtos iniciais no carrinho
const smartTv = new TV(1, "Smart TV 32LQ620", "FULL HD", 32, "LG", 1069.00);
const celularMoto = new Celular(2, "Moto G52", 4, "Motorola", 1126.60);
const bicicletaCaloi = new Bicicleta(3, "Max Front", 24, "Caloi", 837.37);
carrinho.adicionarProduto(smartTv);
carrinho.adicionarProduto(celularMoto);
carrinho.adicionarProduto(bicicletaCaloi);

