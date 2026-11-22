document.addEventListener("DOMContentLoaded", () => {
    const botoesMenu = document.querySelectorAll(".btn-menu");
    const secoesConteudo = document.querySelectorAll(".conteudo-sessão");

    botoesMenu.forEach((botao) => {
        botao.addEventListener("click", () => {
            // 1. Pega o ID da aba que esse botão deve abrir
            const idAlvo = botao.getAttribute("data-alvo");

            // 2. Esconde TODAS as seções colocando a classe "escondido"
            secoesConteudo.forEach((secao) => {
                secao.classList.add("escondido");
            });

            // 3. Mostra APENAS a seção correspondente removendo a classe "escondido"
            const secaoParaMostrar = document.getElementById(idAlvo);
            if (secaoParaMostrar) {
                secaoParaMostrar.classList.remove("escondido");
            }
        });
    });
});

const btnSair = document.querySelector("#btn-sair");

if (btnSair) {
    btnSair.addEventListener("click", () => {
        // Redireciona de volta para a página de login
        window.location.href = "index.html";
    });
}