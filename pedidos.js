(() => {
    "use strict";

    // Estoque inicial demonstrativo. Altere os valores conforme o estoque real.
    const produtos = [
        {
            id: "tradicional",
            nome: "Marmita Tradicional",
            preco: 18,
            descricao: "Arroz, feijão, frango grelhado, salada e farofa.",
            estoqueInicial: 20,
            categoria: "Caseira",
            icone: "fa-bowl-food"
        },
        {
            id: "especial",
            nome: "Marmita Especial",
            preco: 20,
            descricao: "Arroz, feijão, carne moída, salada e farofa.",
            estoqueInicial: 15,
            categoria: "Mais pedida",
            icone: "fa-utensils"
        },
        {
            id: "executiva",
            nome: "Marmita Executiva",
            preco: 30,
            descricao: "Arroz, feijão, carne grelhada, legumes e acompanhamento do dia.",
            estoqueInicial: 12,
            categoria: "Executiva",
            icone: "fa-plate-wheat"
        },
        {
            id: "premium",
            nome: "Marmita Premium",
            preco: 45,
            descricao: "Arroz, feijão, picanha ou corte especial, salada e acompanhamentos.",
            estoqueInicial: 8,
            categoria: "Premium",
            icone: "fa-star"
        },
        {
            id: "familia",
            nome: "Marmita Família",
            preco: 60,
            descricao: "Porção família com arroz, feijão, carnes variadas e acompanhamentos.",
            estoqueInicial: 6,
            categoria: "Para compartilhar",
            icone: "fa-people-group"
        }
    ];

    const CHAVE_ESTOQUE = "galeguinha_estoque_v1";
    const carrinho = {};
    const quantidadesSelecionadas = {};
    let estoque = carregarEstoque();

    const moeda = valor => valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    function carregarEstoque() {
        try {
            const salvo = JSON.parse(localStorage.getItem(CHAVE_ESTOQUE));
            const inicial = {};
            produtos.forEach(produto => {
                const valor = salvo && Number.isInteger(salvo[produto.id])
                    ? salvo[produto.id]
                    : produto.estoqueInicial;
                inicial[produto.id] = Math.max(0, valor);
            });
            return inicial;
        } catch {
            const inicial = {};
            produtos.forEach(produto => inicial[produto.id] = produto.estoqueInicial);
            return inicial;
        }
    }

    function salvarEstoque() {
        try {
            localStorage.setItem(CHAVE_ESTOQUE, JSON.stringify(estoque));
        } catch (erro) {
            console.warn("Não foi possível salvar o estoque neste navegador.", erro);
        }
    }

    function elemento(id) {
        return document.getElementById(id);
    }

    function renderizarProdutos() {
        const lista = elemento("pedidos-lista-produtos");
        if (!lista) return;

        lista.innerHTML = produtos.map(produto => {
            const indisponivel = estoque[produto.id] <= 0;
            const quantidade = quantidadesSelecionadas[produto.id] || 1;

            return `
                <article class="pedido-produto">
                    <div class="pedido-produto-imagem">
                        <i class="fa-solid ${produto.icone}" aria-hidden="true"></i>
                        <span>${produto.categoria}</span>
                    </div>
                    <div class="pedido-produto-conteudo">
                        <div class="pedido-produto-nome-linha">
                            <h4>${produto.nome}</h4>
                            <span class="pedido-estoque ${indisponivel ? "esgotado" : ""}">
                                ${indisponivel ? "Esgotado" : `${estoque[produto.id]} disponíveis`}
                            </span>
                        </div>
                        <p>${produto.descricao}</p>
                        <strong class="pedido-preco">${moeda(produto.preco)}</strong>
                        <div class="pedido-produto-acoes">
                            <div class="pedido-controle-qtd">
                                <button type="button" data-acao="diminuir-selecao" data-id="${produto.id}"
                                    aria-label="Diminuir quantidade" ${indisponivel || quantidade <= 1 ? "disabled" : ""}>−</button>
                                <span>${quantidade}</span>
                                <button type="button" data-acao="aumentar-selecao" data-id="${produto.id}"
                                    aria-label="Aumentar quantidade" ${indisponivel || quantidade >= estoque[produto.id] ? "disabled" : ""}>+</button>
                            </div>
                            <button type="button" class="pedido-btn-adicionar" data-acao="adicionar" data-id="${produto.id}"
                                ${indisponivel ? "disabled" : ""}>
                                <i class="fa-solid fa-cart-plus"></i> Adicionar
                            </button>
                        </div>
                    </div>
                </article>
            `;
        }).join("");
    }

    function renderizarCarrinho() {
        const area = elemento("pedidos-itens-carrinho");
        if (!area) return;

        const itens = Object.entries(carrinho)
            .filter(([, quantidade]) => quantidade > 0);

        const totalUnidades = itens.reduce((soma, [, qtd]) => soma + qtd, 0);
        const total = itens.reduce((soma, [id, qtd]) => {
            const produto = produtos.find(item => item.id === id);
            return soma + produto.preco * qtd;
        }, 0);

        elemento("pedidos-carrinho-contador").textContent = totalUnidades;
        elemento("pedidos-total").textContent = moeda(total);
        elemento("pedidos-finalizar").disabled = itens.length === 0;

        if (itens.length === 0) {
            area.innerHTML = '<p class="pedidos-vazio">Seu carrinho está vazio. Adicione uma marmita para começar.</p>';
            return;
        }

        area.innerHTML = itens.map(([id, quantidade]) => {
            const produto = produtos.find(item => item.id === id);
            return `
                <div class="pedido-item-carrinho">
                    <div class="pedido-item-info">
                        <strong>${produto.nome}</strong>
                        <span>${moeda(produto.preco)} cada</span>
                    </div>
                    <div class="pedido-item-acoes">
                        <button type="button" data-acao="diminuir-carrinho" data-id="${id}" aria-label="Diminuir ${produto.nome}">−</button>
                        <span>${quantidade}</span>
                        <button type="button" data-acao="aumentar-carrinho" data-id="${id}"
                            aria-label="Aumentar ${produto.nome}" ${quantidade >= estoque[id] ? "disabled" : ""}>+</button>
                        <button type="button" class="pedido-remover" data-acao="remover" data-id="${id}" aria-label="Remover ${produto.nome}">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                    <strong class="pedido-item-subtotal">${moeda(produto.preco * quantidade)}</strong>
                </div>
            `;
        }).join("");
    }

    function mensagem(texto, tipo = "sucesso") {
        const caixa = elemento("pedidos-mensagem");
        caixa.className = `pedidos-mensagem visivel ${tipo}`;
        caixa.textContent = texto;
    }

    function limparMensagem() {
        const caixa = elemento("pedidos-mensagem");
        caixa.className = "pedidos-mensagem";
        caixa.textContent = "";
    }

    function adicionar(id) {
        const produto = produtos.find(item => item.id === id);
        const quantidade = quantidadesSelecionadas[id] || 1;
        if (!produto) return;

        const disponivelNoCarrinho = estoque[id] - (carrinho[id] || 0);
        if (quantidade > disponivelNoCarrinho) {
            mensagem(`Estoque insuficiente para ${produto.nome}. Disponível para adicionar: ${Math.max(0, disponivelNoCarrinho)}.`, "erro");
            return;
        }

        carrinho[id] = (carrinho[id] || 0) + quantidade;
        limparMensagem();
        renderizarCarrinho();
        renderizarProdutos();
    }

    function alterarCarrinho(id, delta) {
        const novaQuantidade = (carrinho[id] || 0) + delta;
        if (novaQuantidade <= 0) {
            delete carrinho[id];
        } else if (novaQuantidade <= estoque[id]) {
            carrinho[id] = novaQuantidade;
        } else {
            mensagem("A quantidade solicitada ultrapassa o estoque disponível.", "erro");
        }
        renderizarCarrinho();
        renderizarProdutos();
    }

    function finalizarPedido() {
        const itens = Object.entries(carrinho).filter(([, qtd]) => qtd > 0);
        if (itens.length === 0) return;

        // Confere novamente o estoque antes de concluir.
        for (const [id, quantidade] of itens) {
            if (quantidade > estoque[id]) {
                mensagem("O estoque mudou e não há quantidade suficiente para concluir. Revise seu carrinho.", "erro");
                return;
            }
        }

        const total = itens.reduce((soma, [id, qtd]) => {
            const produto = produtos.find(item => item.id === id);
            return soma + produto.preco * qtd;
        }, 0);

        const resumo = itens.map(([id, qtd]) => {
            const produto = produtos.find(item => item.id === id);
            return `${qtd}x ${produto.nome}`;
        }).join(", ");

        itens.forEach(([id, quantidade]) => {
            estoque[id] -= quantidade;
            delete carrinho[id];
        });

        salvarEstoque();
        renderizarProdutos();
        renderizarCarrinho();
        mensagem(`Pedido confirmado! ${resumo}. Total: ${moeda(total)}. Obrigado por escolher a Galeguinha Marmitaria!`);
    }

    function iniciar() {
        if (!elemento("pedidos-lista-produtos")) return;

        produtos.forEach(produto => {
            quantidadesSelecionadas[produto.id] = 1;
        });

        elemento("pedidos-lista-produtos").addEventListener("click", evento => {
            const botao = evento.target.closest("button[data-acao]");
            if (!botao) return;

            const { acao, id } = botao.dataset;
            if (acao === "adicionar") adicionar(id);

            if (acao === "aumentar-selecao" || acao === "diminuir-selecao") {
                const atual = quantidadesSelecionadas[id] || 1;
                const delta = acao === "aumentar-selecao" ? 1 : -1;
                quantidadesSelecionadas[id] = Math.max(1, Math.min(estoque[id], atual + delta));
                renderizarProdutos();
            }
        });

        elemento("pedidos-itens-carrinho").addEventListener("click", evento => {
            const botao = evento.target.closest("button[data-acao]");
            if (!botao) return;

            const { acao, id } = botao.dataset;
            if (acao === "diminuir-carrinho") alterarCarrinho(id, -1);
            if (acao === "aumentar-carrinho") alterarCarrinho(id, 1);
            if (acao === "remover") {
                delete carrinho[id];
                renderizarCarrinho();
                renderizarProdutos();
            }
        });

        elemento("pedidos-finalizar").addEventListener("click", finalizarPedido);

        renderizarProdutos();
        renderizarCarrinho();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();
