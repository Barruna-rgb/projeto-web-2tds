
const campoTarefa = document.getElementById("campoTarefa");
const botaoAdicionar = document.getElementById("botaoAdicionar");
const listaTarefas = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const mensagemVazia = document.getElementById("mensagemVazia");
const filtros = document.querySelectorAll(".filtro");

// Carrega as tarefas salvas no navegador
let tarefas = [];

try {
    tarefas = JSON.parse(localStorage.getItem("minhasTarefas")) || [];
    
    if (!Array.isArray(tarefas)) {
        tarefas = [];
    }
} catch (erro) {
    tarefas = [];
}

let filtroAtual = "todas";

// Salva as tarefas no navegador
function salvarTarefas() {
    localStorage.setItem("minhasTarefas", JSON.stringify(tarefas));
}

// Adiciona uma nova tarefa
function adicionarTarefa() {
    const texto = campoTarefa.value.trim();

    if (texto === "") {
        alert("Digite uma tarefa antes de adicionar!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        texto: texto,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvarTarefas();
    renderizarTarefas();

    campoTarefa.value = "";
    campoTarefa.focus();
}

// Marca ou desmarca uma tarefa
function alternarTarefa(id) {
    tarefas = tarefas.map(tarefa => {
        if (tarefa.id === id) {
            return {
                ...tarefa,
                concluida: !tarefa.concluida
            };
        }

        return tarefa;
    });

    salvarTarefas();
    renderizarTarefas();
}

// Exclui uma tarefa
function excluirTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    salvarTarefas();
    renderizarTarefas();
}

// Atualiza a lista na tela
function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtroAtual === "pendentes") {
            return !tarefa.concluida;
        }

        if (filtroAtual === "concluidas") {
            return tarefa.concluida;
        }

        return true;
    });

    tarefasFiltradas.forEach(tarefa => {
        const item = document.createElement("li");
        item.className = "tarefa";

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const conteudo = document.createElement("div");
        conteudo.className = "tarefa-conteudo";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;
        checkbox.addEventListener("change", () => {
            alternarTarefa(tarefa.id);
        });

        const texto = document.createElement("span");
        texto.textContent = tarefa.texto;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "botaoExcluir";
        botaoExcluir.addEventListener("click", () => {
            excluirTarefa(tarefa.id);
        });

        conteudo.appendChild(checkbox);
        conteudo.appendChild(texto);

        item.appendChild(conteudo);
        item.appendChild(botaoExcluir);

        listaTarefas.appendChild(item);
    });

    // Atualiza o contador
    const total = tarefas.length;
    const concluidas = tarefas.filter(tarefa => tarefa.concluida).length;

    contador.textContent =
        `${total} tarefas cadastradas | ${concluidas} concluídas`;

    // Mostra mensagem quando não existem tarefas no filtro atual
    mensagemVazia.style.display =
        tarefasFiltradas.length === 0 ? "block" : "none";

    mensagemVazia.textContent = total === 0
        ? "Nenhuma tarefa cadastrada."
        : "Nenhuma tarefa encontrada neste filtro.";
}

// Controla os filtros
filtros.forEach(botao => {
    botao.addEventListener("click", () => {
        filtroAtual = botao.dataset.filtro;

        filtros.forEach(filtro => {
            filtro.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        renderizarTarefas();
    });
});

// Eventos dos botões
botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keydown", evento => {
    if (evento.key === "Enter") {
        adicionarTarefa();
    }
});

// Exibe as tarefas ao abrir o projeto
renderizarTarefas();
