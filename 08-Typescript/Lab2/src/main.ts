class Aluno {
    constructor(
        private id: number,
        private nome: string,
        private idade: number,
        private altura: number,
        private peso: number
    ) {}
    get getID(): number {
        return this.id;
    }
    get getNome(): string {
        return this.nome;
    }
    set setNome(value: string) {
        this.nome = value;
    }
    get getIdade(): number {
        return this.idade;
    }
    set setIdade(value: number) {
        this.idade = value;
    }
    get getAltura(): number {
        return this.altura;
    }
    set setAltura(value: number) {
        this.altura = value;
    }
    get getPeso(): number {
        return this.peso;
    }
    set setPeso(value: number) {
        this.peso = value;
    }
}

class Turma {
    constructor(
        private id: number,
        private nome: string,
        private alunos: Aluno[] = []
    ) {}
    getNumAlunos(): number {
        return this.alunos.length;
    }
    getMediaIdades(): number {
        const totalIdades = this.alunos.reduce((acc, aluno) => acc + aluno.getIdade, 0);
        return totalIdades / this.getNumAlunos();
    }
    getMediaAlturas(): number {
        const totalAlturas = this.alunos.reduce((acc, aluno) => acc + aluno.getAltura, 0);
        return totalAlturas / this.getNumAlunos();
    }
    getMediaPesos(): number {
        const totalPesos = this.alunos.reduce((acc, aluno) => acc + aluno.getPeso, 0);
        return totalPesos / this.getNumAlunos();
    }
    adicionarAluno(aluno: Aluno): void {
        this.alunos.push(aluno);
    }
    removerAluno(id: number): void {
        this.alunos = this.alunos.filter(aluno => aluno.getID !== id);
    }
    atualizarAluno(id: number, nome: string, idade: number, altura:number, peso:number): void {
        let aluno = this.getAlunoPorId(id);
        if(aluno){
            aluno.setNome=nome;
            aluno.setIdade=idade;
            aluno.setAltura=altura;
            aluno.setPeso=peso;
        }
    }
    getAlunoPorId(id: number): Aluno | undefined {
        return this.alunos.find(aluno => aluno.getID === id);
    }
}

const turma = new Turma(1, "Turma A");
let cont=4

// Adicionando alunos de exemplo
turma.adicionarAluno(new Aluno(1, "Carlos Silva Gomes", 16, 1.78, 65.2));
turma.adicionarAluno(new Aluno(2, "Bruno Gonzaga III", 15, 1.72, 70));
turma.adicionarAluno(new Aluno(3, "Rodrigo Daniel Ramos II", 16, 1.81, 82));

// Atualizando as estatísticas na página
document.getElementById("numAlunos")!.innerText = turma.getNumAlunos().toString();
document.getElementById("mediaIdades")!.innerText = turma.getMediaIdades().toFixed(2);
document.getElementById("mediaAlturas")!.innerText = turma.getMediaAlturas().toFixed(2);
document.getElementById("mediaPesos")!.innerText = turma.getMediaPesos().toFixed(2);

document.addEventListener("DOMContentLoaded", function() {
    // Adicionando eventos nos botões iniciais
    let btnEditarList = document.querySelectorAll('.btnEditar');
    let btnExcluirList = document.querySelectorAll('.btnExcluir');
    btnEditarList.forEach(function(btn) {
        btn.addEventListener('click', function() {
            EditarButtonClick(btn as HTMLButtonElement);
        });
    });
    
    btnExcluirList.forEach(function(btn) {
        btn.addEventListener('click', function(event) {
            ExcluirButtonClick(btn as HTMLButtonElement);
        });
    });

    const formAdicao = document.getElementById("formNovoAluno") as HTMLFormElement;
    const formEdicao = document.getElementById("formEditarAluno") as HTMLFormElement;
    const tabela = document.getElementById("tabelaAlunos") as HTMLTableElement;

    function EditarButtonClick(btn: HTMLButtonElement) {
        let id: string = "";
        const dataTrId = btn.getAttribute("data-tr-id");
        if (dataTrId !== null) {
            id = dataTrId;
        }
        const tr = document.getElementById(id);
        if (tr) {
            // Passsando id para o formulario
            const modalEditar = document.querySelector('#modalEditarAluno');
            modalEditar?.setAttribute("data-tr-id", id);

            // Pegando valores atuais do aluno
            const tds = tr.querySelectorAll('td');
            const nome  = tds[1].textContent?.trim();
            const idade = tds[2].textContent?.trim();
            const altura = tds[3].textContent?.trim();
            const peso = tds[4].textContent?.trim();

            // Passando os valores atuais para o formulario
            const nomeEditarInput = document.getElementById('nomeEditar') as HTMLInputElement;
            if (nome !== undefined) {
                nomeEditarInput.value = nome;
            } 
            else {
                nomeEditarInput.value = '';
            }
            const idadeEditarInput = document.getElementById('idadeEditar') as HTMLInputElement;
            if (idade !== undefined) {
                idadeEditarInput.value = idade;
            } 
            else {
                idadeEditarInput.value = '';
            }
            const alturaEditarInput = document.getElementById('alturaEditar') as HTMLInputElement;
            if (altura !== undefined) {
                alturaEditarInput.value = altura;
            } 
            else {
                alturaEditarInput.value = '';
            }
            const pesoEditarInput = document.getElementById('pesoEditar') as HTMLInputElement;
            if (peso !== undefined) {
                pesoEditarInput.value = peso;
            } 
            else {
                pesoEditarInput.value = '';
            }
        }
    }

    function ExcluirButtonClick(btn: HTMLButtonElement) {
        let id: string = "";
        const dataTrId = btn.getAttribute("data-tr-id");
        if (dataTrId !== null) {
            id = dataTrId;
        }
        const tr = document.getElementById(id);
        if (tr) {
            const confirmacao = confirm(`Tem certeza que deseja apagar?`);
            if(confirmacao){
                // Removendo elemento html
                tr.remove();
                
                // Atualizando estatisticas
                turma.removerAluno(parseInt(id.slice(5)));
                document.getElementById("numAlunos")!.innerText = turma.getNumAlunos().toString();
                document.getElementById("mediaIdades")!.innerText = turma.getMediaIdades().toFixed(2);
                document.getElementById("mediaAlturas")!.innerText = turma.getMediaAlturas().toFixed(2);
                document.getElementById("mediaPesos")!.innerText = turma.getMediaPesos().toFixed(2);
            }
        }
    }

    // Evento do formulario de criação
    formAdicao.addEventListener("submit", function(event) {
        event.preventDefault();

        // Pegando valores do formulario
        let nome = (document.getElementById("nome") as HTMLInputElement).value;
        let idade = parseInt((document.getElementById("idade") as HTMLInputElement).value);
        let altura = parseFloat((document.getElementById("altura") as HTMLInputElement).value);
        let peso = parseFloat((document.getElementById("peso") as HTMLInputElement).value);

        let nova = document.createElement("tr");
        nova.classList.add("align-middle");
        nova.id="aluno"+cont
        const aluno = new Aluno(cont, nome, idade, altura, peso);
        turma.adicionarAluno(aluno);

        // Construindo o conteúdo da nova linha
        nova.innerHTML = `
            <td>${aluno.getID}</td>
            <td>${aluno.getNome}</td>
            <td>${aluno.getIdade}</td>
            <td>${aluno.getAltura}</td>
            <td>${aluno.getPeso}</td>
            <td>
                <button type="button" class="btn btn-secondary btnEditar " data-bs-toggle="modal" data-bs-target="#modalEditarTarefa"  data-tr-id=${"aluno"+cont}>Editar </button>
                <button type="button" class="btn btn-secondary btnExcluir" data-tr-id=${"aluno"+cont++}>Excluir</button>
            </td>
        `;
        // Adicionar a nova linha à tabela
        tabela.querySelector("tbody")?.appendChild(nova);
        
        // Adicionando os eventos   
        btnEditarList = document.querySelectorAll('.btnEditar');
        btnExcluirList = document.querySelectorAll('.btnExcluir');
        const novoBotaoEditar = nova.querySelector('.btnEditar');
        const novoBotaoExcluir = nova.querySelector('.btnExcluir');

        novoBotaoEditar?.addEventListener('click', function() {
            EditarButtonClick(novoBotaoEditar as HTMLButtonElement);
        });
        novoBotaoExcluir?.addEventListener('click', function() {
            ExcluirButtonClick(novoBotaoExcluir as HTMLButtonElement);
        });
        
        // Apagando os valores do formulario
        (document.getElementById("nome") as HTMLInputElement).value = "";
        (document.getElementById("idade") as HTMLInputElement).value = "";
        (document.getElementById("altura") as HTMLInputElement).value = "";
        (document.getElementById("peso") as HTMLInputElement).value = "";
        
        // Atualizando estasticas na página
        document.getElementById("numAlunos")!.innerText = turma.getNumAlunos().toString();
        document.getElementById("mediaIdades")!.innerText = turma.getMediaIdades().toFixed(2);
        document.getElementById("mediaAlturas")!.innerText = turma.getMediaAlturas().toFixed(2);
        document.getElementById("mediaPesos")!.innerText = turma.getMediaPesos().toFixed(2);

        // Para fechar o modal
        const modalElement = document.getElementById("modalNovoAluno") as HTMLElement;
        modalElement.style.display = "none";
        const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
        modalBackdrop.parentNode?.removeChild(modalBackdrop);  
    });

    // Evento do formulario de edição
    formEdicao.addEventListener("submit", function(event) {
        event.preventDefault();
        // Pegando valores do formulario
        const trId = document.getElementById('modalEditarAluno')?.getAttribute('data-tr-id');
        if (trId) {            
            const aluno = turma.getAlunoPorId(parseInt(trId.slice(5)));
            let nome = (document.getElementById("nomeEditar") as HTMLInputElement).value;
            let idade = (document.getElementById("idadeEditar") as HTMLInputElement).value;
            let altura = (document.getElementById("alturaEditar") as HTMLInputElement).value;
            let peso = (document.getElementById("pesoEditar") as HTMLInputElement).value;
            const tr = document.getElementById(trId as string);
            const tds = tr?.querySelectorAll('td');
            
            if (tds?.length === 6 && nome !== null && idade !== null && altura !== null && peso !== null) {
                tds[1].textContent = nome;
                tds[2].textContent = idade.toString();
                tds[3].textContent = altura.toString();
                tds[4].textContent = peso.toString();
            }
            // Atualizando aluno
            turma.atualizarAluno(parseInt(trId.slice(5)), nome, parseInt(idade), parseFloat(altura), parseFloat(peso))
        }
        
        // Atualizando estasticas na página
        document.getElementById("numAlunos")!.innerText = turma.getNumAlunos().toString();
        document.getElementById("mediaIdades")!.innerText = turma.getMediaIdades().toFixed(2);
        document.getElementById("mediaAlturas")!.innerText = turma.getMediaAlturas().toFixed(2);
        document.getElementById("mediaPesos")!.innerText = turma.getMediaPesos().toFixed(2);

        // Para fechar o modal
        const modalElement = document.getElementById("modalEditarAluno") as HTMLElement;
        modalElement.style.display = "none";
        const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
        modalBackdrop.parentNode?.removeChild(modalBackdrop);        
    });
});

