type Tarefa = [string, Date, Date?, string?];
let cont=4

document.addEventListener("DOMContentLoaded", function() {
    let btnEditarList = document.querySelectorAll('.btnEditar');
    let btnExcluirList = document.querySelectorAll('.btnExcluir');
    const formAdicao = document.getElementById("formNovaTarefa") as HTMLFormElement;
    const formEdicao = document.getElementById("formEditarTarefa") as HTMLFormElement;
    const tabela = document.getElementById("tabelaTarefas") as HTMLTableElement;

    function EditarButtonClick(btn: HTMLButtonElement) {
        let id: string = "";
        const dataTrId = btn.getAttribute("data-tr-id");
        if (dataTrId !== null) {
            id = dataTrId;
        }
        const tr = document.getElementById(id);
        if (tr) {
            // Passsando id para o formulario
            const modalEditar = document.querySelector('#modalEditarTarefa');
            modalEditar?.setAttribute("data-tr-id", id);
            const tds = tr.querySelectorAll('td');
            const titulo  = tds[1].textContent?.trim();
            const dataLimite = tds[3].textContent?.trim();
            const descricao = tds[4].querySelector('textarea')?.value.trim();
            
            // Passando os valores atuais para o formulario
            const tituloEditarInput = document.getElementById('tituloEditar') as HTMLInputElement;
            if (titulo !== undefined) {
                tituloEditarInput.value = titulo;
            } 
            else {
                tituloEditarInput.value = '';
            }
            const dataLimiteEditarInput = document.getElementById('dataLimiteEditar') as HTMLInputElement;
            if (dataLimite !== undefined) {
                // Tratamento do formata da data
                let dataLimiteParts = dataLimite.split('/');
                let dataLimiteFormatada = dataLimiteParts[2] + '-' + dataLimiteParts[1] + '-' + dataLimiteParts[0]; 
                dataLimiteEditarInput.value = dataLimiteFormatada;
            } 
            else {
                dataLimiteEditarInput.value = '';
            }
            const descricaoEditarInput = document.getElementById('descricaoEditar') as HTMLInputElement;
            if (descricao !== undefined) {
                descricaoEditarInput.value = descricao;
            } 
            else {
                descricaoEditarInput.value = '';
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
            if(confirmacao) {
                tr.remove();
                btnEditarList = document.querySelectorAll('.btnEditar');
                btnExcluirList = document.querySelectorAll('.btnExcluir');
            }
        }
    }

    // Adicionando eventos nos botões iniciais
    btnEditarList.forEach(function(btn) {
        btn.addEventListener('click', function() {
            EditarButtonClick(btn as HTMLButtonElement);
        });
    });
    
    btnExcluirList.forEach(function(btn) {
        let id: string = "";
        const dataTrId = btn.getAttribute("data-tr-id");
        if (dataTrId !== null) {
            id = dataTrId;
        }
        btn.addEventListener('click', function(event) {
            ExcluirButtonClick(btn as HTMLButtonElement);
        });
    });

    
    // Evento do formulario de criação
    formAdicao.addEventListener("submit", function(event) {
        event.preventDefault();
        let titulo = (document.getElementById("titulo") as HTMLInputElement).value;
        let limite = new Date((document.getElementById("limite") as HTMLInputElement).value);
        let descricao = (document.getElementById("descricao") as HTMLInputElement).value;
        let dataAtual = new Date();
        let novaTarefa: Tarefa;
        novaTarefa = [titulo, dataAtual, limite, descricao];
        let nova = document.createElement("tr");
        nova.classList.add("align-middle");
        nova.id="tarefa"+cont

        // Construindo o conteúdo da nova linha
        nova.innerHTML = `
            <td><input class="form-check-input" type="checkbox"></td>
            <td>${novaTarefa[0]}</td>
            <td>${novaTarefa[1].toLocaleString()}</td>
            <td>${novaTarefa[2]?.toString()!="Invalid Date"? novaTarefa[2]?.toLocaleDateString() : ''}</td>
            <td>
                <textarea class="form-control" style="resize: none;" rows="1" readonly >${novaTarefa[3]}</textarea>
            </td>
            <td>
                <button type="button" class="btn btn-secondary btnEditar " data-bs-toggle="modal" data-bs-target="#modalEditarTarefa"  data-tr-id=${"tarefa"+cont}>Editar </button>
                <button type="button" class="btn btn-secondary btnExcluir" data-tr-id=${"tarefa"+cont++}>Excluir</button>
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
        (document.getElementById("titulo") as HTMLInputElement).value = "";
        (document.getElementById("limite") as HTMLInputElement).value = "";
        (document.getElementById("descricao") as HTMLInputElement).value = "";

        // Para fechar o modal
        const modalElement = document.getElementById("modalNovaTarefa") as HTMLElement;
        modalElement.style.display = "none";
        const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
        modalBackdrop.parentNode?.removeChild(modalBackdrop);        
    });

    // Evento do formulario de edição
    formEdicao.addEventListener("submit", function(event) {
        event.preventDefault();
        const tituloCampo = (document.getElementById("tituloEditar") as HTMLInputElement);
        const limiteCampo = (document.getElementById("dataLimiteEditar") as HTMLInputElement);
        const descricaoCampo = (document.getElementById("descricaoEditar") as HTMLInputElement);
        const titulo = tituloCampo.value;
        const limite = limiteCampo.value;
        const descricao = descricaoCampo.value;
        const trId = document.getElementById('modalEditarTarefa')?.getAttribute('data-tr-id');
        const tr = document.getElementById(trId as string);
        const tds = tr?.querySelectorAll('td');
        if(tds?.length===6){
            tds[1].textContent=titulo;
            console.log(limite);
            if(limite!==""){
                // Tratamento do formata da data
                let dataLimiteParts = limite.split('-');
                let dataLimiteFormatada = dataLimiteParts[2] + '/' + dataLimiteParts[1] + '/' + dataLimiteParts[0]; 
                tds[3].textContent = dataLimiteFormatada;
            }
            else{
                tds[3].textContent = "";
            }
            const textarea = tds[4].querySelector('textarea');
            if (textarea !== null) {
                textarea.value = descricao;
            }
        }
        
        // Para fechar o modal
        const modalElement = document.getElementById("modalEditarTarefa") as HTMLElement;
        modalElement.style.display = "none";
        const modalBackdrop = document.getElementsByClassName("modal-backdrop")[0];
        modalBackdrop.parentNode?.removeChild(modalBackdrop);        
    });
});

