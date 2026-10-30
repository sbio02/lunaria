/*
  Lunaria - interações do site
  Este arquivo controla o menu mobile, o botão de voltar ao topo
  e pequenas animações de entrada. Não altera a paleta do site.
*/

"use strict";

(() => {
    const cabecalho = document.querySelector(".header");
    const menu = document.getElementById("menuNavegacao");
    const botaoMenu = document.getElementById("botaoMenu");

    /* MENU HAMBÚRGUER */
    if (cabecalho && menu && botaoMenu) {
        const fecharMenu = () => {
            cabecalho.classList.remove("menu-aberto");
            botaoMenu.setAttribute("aria-expanded", "false");
            botaoMenu.setAttribute("aria-label", "Abrir menu");
        };

        const alternarMenu = () => {
            const estaAberto = cabecalho.classList.toggle("menu-aberto");
            botaoMenu.setAttribute("aria-expanded", String(estaAberto));
            botaoMenu.setAttribute(
                "aria-label",
                estaAberto ? "Fechar menu" : "Abrir menu"
            );
        };

        botaoMenu.addEventListener("click", alternarMenu);

        // Fecha o menu depois que uma opção é escolhida.
        menu.addEventListener("click", (evento) => {
            if (evento.target.closest("a")) {
                fecharMenu();
            }
        });

        // Fecha ao clicar fora do cabeçalho/menu.
        document.addEventListener("click", (evento) => {
            const clicouFora = !cabecalho.contains(evento.target);
            const estaAberto = cabecalho.classList.contains("menu-aberto");

            if (clicouFora && estaAberto) {
                fecharMenu();
            }
        });

        // A tecla Esc também fecha o menu.
        document.addEventListener("keydown", (evento) => {
            if (
                evento.key === "Escape" &&
                cabecalho.classList.contains("menu-aberto")
            ) {
                fecharMenu();
                botaoMenu.focus();
            }
        });

        // Se a tela voltar ao tamanho de computador, fecha o menu mobile.
        const telaGrande = window.matchMedia("(min-width: 761px)");
        telaGrande.addEventListener("change", fecharMenu);
    }

    /* BOTÃO VOLTAR AO TOPO */
    const botaoTopo = document.createElement("button");
    botaoTopo.type = "button";
    botaoTopo.className = "voltar-topo";
    botaoTopo.setAttribute("aria-label", "Voltar ao topo");
    botaoTopo.setAttribute("title", "Voltar ao topo");
    botaoTopo.innerHTML = "&#8593;";
    document.body.appendChild(botaoTopo);

    const atualizarBotaoTopo = () => {
        botaoTopo.classList.toggle("visivel", window.scrollY > 350);
    };

    window.addEventListener("scroll", atualizarBotaoTopo, { passive: true });
    atualizarBotaoTopo();

    botaoTopo.addEventListener("click", () => {
        const movimentoReduzido = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        window.scrollTo({
            top: 0,
            behavior: movimentoReduzido ? "auto" : "smooth"
        });
    });

    /* ANIMAÇÃO SUAVE DOS BLOCOS AO ENTRAREM NA TELA */
    if ("IntersectionObserver" in window) {
        const elementos = document.querySelectorAll(
            ".categoria, .card, .sobre, .bastidores, .extra"
        );

        const observador = new IntersectionObserver((itens, observer) => {
            itens.forEach((item) => {
                if (item.isIntersecting) {
                    item.target.classList.add("apareceu");
                    observer.unobserve(item.target);
                }
            });
        }, {
            threshold: 0.12
        });

        elementos.forEach((elemento) => {
            elemento.classList.add("revelar-scroll");
            observador.observe(elemento);
        });
    }
})();
