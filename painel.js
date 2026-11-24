const dadosIndicadores = {
    "este-mes": {
        kpis: {
            pedidos: { valor: 247, variacao: 12, textoComparacao: "vs. mês anterior" },
            faturamento: { valor: 7842.50, variacao: 18, textoComparacao: "vs. mês anterior" },
            ticketMedio: { valor: 31.74, variacao: 5, textoComparacao: "vs. mês anterior" },
            clientesAtivos: { valor: 1203, variacao: 10, textoComparacao: "vs. mês anterior" }
        },
        vendasPorMes: {
            maxY: 10000,
            ticksY: ["10k", "8k", "6k", "4k", "2k", "0"],
            dados: [
                { label: "Jan", valor: 4800, display: "R$ 4.8k" },
                { label: "Fev", valor: 5100, display: "R$ 5.1k" },
                { label: "Mar", valor: 5700, display: "R$ 5.7k" },
                { label: "Abr", valor: 6300, display: "R$ 6.3k" },
                { label: "Mai", valor: 7100, display: "R$ 7.1k" },
                { label: "Jun", valor: 7800, display: "R$ 7.8k" }
            ]
        },
        faturamentoSemana: {
            maxY: 2000,
            ticksY: ["2k", "1.5k", "1k", "500", "0"],
            dados: [
                { label: "Seg", valor: 1200, display: "R$ 1.2k" },
                { label: "Ter", valor: 1500, display: "R$ 1.5k" },
                { label: "Qua", valor: 1400, display: "R$ 1.4k" },
                { label: "Qui", valor: 1600, display: "R$ 1.6k" },
                { label: "Sex", valor: 1800, display: "R$ 1.8k" },
                { label: "Sáb", valor: 1300, display: "R$ 1.3k" },
                { label: "Dom", valor: 1100, display: "R$ 1.1k" }
            ]
        }
    },
    "mes-passado": {
        kpis: {
            pedidos: { valor: 220, variacao: 8, textoComparacao: "vs. mês retrasado" },
            faturamento: { valor: 6646.18, variacao: 11, textoComparacao: "vs. mês retrasado" },
            ticketMedio: { valor: 30.21, variacao: 3, textoComparacao: "vs. mês retrasado" },
            clientesAtivos: { valor: 1093, variacao: 7, textoComparacao: "vs. mês retrasado" }
        },
        vendasPorMes: {
            maxY: 10000,
            ticksY: ["10k", "8k", "6k", "4k", "2k", "0"],
            dados: [
                { label: "Jan", valor: 3900, display: "R$ 3.9k" },
                { label: "Fev", valor: 4200, display: "R$ 4.2k" },
                { label: "Mar", valor: 4900, display: "R$ 4.9k" },
                { label: "Abr", valor: 5400, display: "R$ 5.4k" },
                { label: "Mai", valor: 6100, display: "R$ 6.1k" },
                { label: "Jun", valor: 6646, display: "R$ 6.6k" }
            ]
        },
        faturamentoSemana: {
            maxY: 2000,
            ticksY: ["2k", "1.5k", "1k", "500", "0"],
            dados: [
                { label: "Seg", valor: 950, display: "R$ 950" },
                { label: "Ter", valor: 1150, display: "R$ 1.1k" },
                { label: "Qua", valor: 1100, display: "R$ 1.1k" },
                { label: "Qui", valor: 1350, display: "R$ 1.3k" },
                { label: "Sex", valor: 1550, display: "R$ 1.5k" },
                { label: "Sáb", valor: 1050, display: "R$ 1.0k" },
                { label: "Dom", valor: 850, display: "R$ 850" }
            ]
        }
    },
    "ultimos-6-meses": {
        kpis: {
            pedidos: { valor: 1185, variacao: 24, textoComparacao: "vs. semestre anterior" },
            faturamento: { valor: 36800.00, variacao: 29, textoComparacao: "vs. semestre anterior" },
            ticketMedio: { valor: 31.05, variacao: 4, textoComparacao: "vs. semestre anterior" },
            clientesAtivos: { valor: 1840, variacao: 19, textoComparacao: "vs. semestre anterior" }
        },
        vendasPorMes: {
            maxY: 10000,
            ticksY: ["10k", "8k", "6k", "4k", "2k", "0"],
            dados: [
                { label: "Jan", valor: 5200, display: "R$ 5.2k" },
                { label: "Fev", valor: 5800, display: "R$ 5.8k" },
                { label: "Mar", valor: 6400, display: "R$ 6.4k" },
                { label: "Abr", valor: 6900, display: "R$ 6.9k" },
                { label: "Mai", valor: 7600, display: "R$ 7.6k" },
                { label: "Jun", valor: 8900, display: "R$ 8.9k" }
            ]
        },
        faturamentoSemana: {
            maxY: 10000,
            ticksY: ["10k", "7.5k", "5k", "2.5k", "0"],
            dados: [
                { label: "Seg", valor: 5200, display: "R$ 5.2k" },
                { label: "Ter", valor: 6100, display: "R$ 6.1k" },
                { label: "Qua", valor: 5800, display: "R$ 5.8k" },
                { label: "Qui", valor: 6900, display: "R$ 6.9k" },
                { label: "Sex", valor: 8400, display: "R$ 8.4k" },
                { label: "Sáb", valor: 5400, display: "R$ 5.4k" },
                { label: "Dom", valor: 4500, display: "R$ 4.5k" }
            ]
        }
    }
};

const formatarMoeda = (valor) => {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};

function atualizarTrend(elementId, item) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const isPositivo = item.variacao >= 0;
    el.className = `kpi-trend ${isPositivo ? "positive" : "negative"}`;
    el.innerHTML = `
        <i class="fa-solid ${isPositivo ? "fa-arrow-up" : "fa-arrow-down"}"></i>
        ${Math.abs(item.variacao)}% <small>${item.textoComparacao}</small>
    `;
}

function atualizarKPIs(kpis) {
    document.getElementById("kpi-pedidos").textContent = kpis.pedidos.valor.toLocaleString("pt-BR");
    document.getElementById("kpi-faturamento").textContent = formatarMoeda(kpis.faturamento.valor);
    document.getElementById("kpi-ticket").textContent = formatarMoeda(kpis.ticketMedio.valor);
    document.getElementById("kpi-clientes").textContent = kpis.clientesAtivos.valor.toLocaleString("pt-BR");

    atualizarTrend("trend-pedidos", kpis.pedidos);
    atualizarTrend("trend-faturamento", kpis.faturamento);
    atualizarTrend("trend-ticket", kpis.ticketMedio);
    atualizarTrend("trend-clientes", kpis.clientesAtivos);
}

function renderizarGrafico(containerId, configGrafico) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { maxY, ticksY, dados } = configGrafico;
    const yAxisHTML = ticksY.map((tick) => `<span>${tick}</span>`).join("");

    const barsHTML = dados.map((item) => {
        const alturaPercentual = Math.max(4, Math.min((item.valor / maxY) * 100, 100));
        return `
            <div class="bar-column">
                <span class="bar-top-label">${item.display}</span>
                <div class="bar-fill" style="height: 0%" data-altura="${alturaPercentual}%" title="${item.label}: ${item.display}"></div>
                <span class="bar-bottom-label">${item.label}</span>
            </div>
        `;
    }).join("");

    container.innerHTML = `
        <div class="bar-chart-wrapper">
            <div class="y-axis">${yAxisHTML}</div>
            <div class="bars-area">${barsHTML}</div>
        </div>
    `;

    requestAnimationFrame(() => {
        container.querySelectorAll(".bar-fill").forEach((bar) => {
            bar.style.height = bar.getAttribute("data-altura");
        });
    });
}

function carregarDashboard(periodo) {
    const dados = dadosIndicadores[periodo];
    if (!dados) return;

    atualizarKPIs(dados.kpis);
    renderizarGrafico("chart-vendas-mes", dados.vendasPorMes);
    renderizarGrafico("chart-faturamento-semana", dados.faturamentoSemana);
}

document.addEventListener("DOMContentLoaded", () => {
    const botoesMenu = document.querySelectorAll(".btn-menu");
    const secoesConteudo = document.querySelectorAll(".conteudo-sessão");
    const selectPeriodo = document.getElementById("periodFilter");

    if (selectPeriodo) {
        carregarDashboard(selectPeriodo.value);

        selectPeriodo.addEventListener("change", (e) => {
            carregarDashboard(e.target.value);
        });
    }

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

            if (idAlvo === "aba-indicadores" && selectPeriodo) {
                carregarDashboard(selectPeriodo.value);
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