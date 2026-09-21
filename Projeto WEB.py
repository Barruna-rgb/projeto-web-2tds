from pathlib import Path
import webbrowser


HTML = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cartão de apresentação</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; }
        .cartao { max-width: 500px; margin: 40px auto; padding: 30px;
            background: white; border-radius: 12px; }
        .etiqueta { font-size: 16px; color: #00144A; margin-bottom: 10px; }
        #nome { font-size: 32px; margin-bottom: 15px; }
        #descricao { color: #EC0742; line-height: 1.5; margin-bottom: 20px; }
        h2 { margin-bottom: 15px; }
        #interesses { list-style: none; padding: 0; margin-bottom: 25px; }
        #interesses li { margin: 8px 0; }
        button { padding: 10px 15px; margin: 5px; border: none; border-radius: 8px;
            cursor: pointer; background-color: #333; color: white; }
        button:hover { opacity: 0.8; }
        .botao-secundario { background-color: #A39064; }
        #mensagem { margin-top: 20px; font-weight: bold; }
    </style>
</head>
<body>
    <main class="cartao">
        <p class="etiqueta">Olá, eu sou</p>
        <h1 id="nome">brunna raphaella</h1>
        <p id="descricao">Gosto de programar e criar coisas novas!</p>
        <h2>Meus interesses</h2>
        <ul id="interesses">
            <li>Bolo</li><li>Música</li><li>Programação</li>
        </ul>
        <button type="button" id="btn-mostrar">Mostrar mensagem</button>
        <button type="button" id="btn-ocultar" class="botao-secundario">Ocultar mensagem</button>
        <p id="mensagem"></p>
    </main>
    <script>
        const mensagem = document.querySelector("#mensagem");
        const nome = document.querySelector("#nome");
        document.querySelector("#btn-mostrar").addEventListener("click", () => {
            mensagem.textContent = `Prazer em conhecer você, ${nome.textContent.trim()}!`;
        });
        document.querySelector("#btn-ocultar").addEventListener("click", () => {
            mensagem.textContent = "";
        });
    </script>
</body>
</html>"""


pagina = Path(__file__).with_suffix(".html")
pagina.write_text(HTML, encoding="utf-8")
webbrowser.open(pagina.as_uri())