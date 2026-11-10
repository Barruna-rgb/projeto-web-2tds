
const frases = [
    {
        texto: "Acredite no seu potencial, mesmo quando o caminho parecer difícil.",
        categoria: "motivacao"
    },
    {
        texto: "Pequenos passos também levam a grandes conquistas.",
        categoria: "motivacao"
    },
    {
        texto: "O conhecimento é uma das maiores riquezas que podemos adquirir.",
        categoria: "reflexao"
    },
    {
        texto: "Nem tudo acontece no tempo que desejamos, mas cada experiência ensina algo.",
        categoria: "reflexao"
    },
    {
        texto: "A vida é feita de momentos, escolhas e oportunidades.",
        categoria: "vida"
    },
    {
        texto: "Valorize as pequenas coisas, pois elas também fazem parte da felicidade.",
        categoria: "vida"
    },
    {
        texto: "O sucesso é construído com dedicação, paciência e persistência.",
        categoria: "sucesso"
    },
    {
        texto: "Não tenha medo de começar novamente. Recomeçar também é uma conquista.",
        categoria: "sucesso"
    },
    {
        texto: "Cada dia representa uma nova oportunidade de aprender.",
        categoria: "motivacao"
    },
    {
        texto: "A maneira como enxergamos os problemas pode mudar nossas decisões.",
        categoria: "reflexao"
    },
    {
        texto: "A vida não precisa ser perfeita para ser especial.",
        categoria: "vida"
    },
    {
        texto: "Grandes resultados começam com pequenas atitudes.",
        categoria: "sucesso"
    }
];

const fraseElemento = document.getElementById("frase");
const categoriaElemento = document.getElementById("categoria");
const categoriaFrase = document.getElementById("categoria-frase");
const gerarBtn = document.getElementById("gerarBtn");
const copiarBtn = document.getElementById("copiarBtn");
const mensagem = document.getElementById("mensagem");

let ultimaFrase = "";

function gerarFrase() {
    const categoriaSelecionada = categoriaElemento.value;

    const frasesDisponiveis = frases.filter(frase => {
        return categoriaSelecionada === "todas" ||
               frase.categoria === categoriaSelecionada;
    });

    const frasesNovas = frasesDisponiveis.filter(frase => {
        return frase.texto !== ultimaFrase;
    });

    const lista = frasesNovas.length > 0
        ? frasesNovas
        : frasesDisponiveis;

    const indiceAleatorio = Math.floor(Math.random() * lista.length);

    const fraseEscolhida = lista[indiceAleatorio];

    fraseElemento.textContent = fraseEscolhida.texto;
    categoriaFrase.textContent =
        "Categoria: " + fraseEscolhida.categoria;

    ultimaFrase = fraseEscolhida.texto;

    mensagem.textContent = "";
}

async function copiarFrase() {
    const texto = fraseElemento.textContent;

    if (!texto || texto.includes("Clique no botão")) {
        mensagem.textContent = "Gere uma frase primeiro.";
        return;
    }

    try {
        await navigator.clipboard.writeText(texto);
        mensagem.textContent = "Frase copiada com sucesso!";
    } catch (erro) {
        mensagem.textContent =
            "Não foi possível copiar. Verifique a permissão do navegador.";
    }
}

gerarBtn.addEventListener("click", gerarFrase);
copiarBtn.addEventListener("click", copiarFrase);

categoriaElemento.addEventListener("change", () => {
    ultimaFrase = "";
    gerarFrase();
});
