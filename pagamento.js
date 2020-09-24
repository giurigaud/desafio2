const botaoPagamento = document.querySelector(".confirme-seus-dados");
const inputTodos = document.querySelectorAll(".conteudo-principal input");
const sacolaVazia = document.querySelector(".sacola-vazia");
const sacolaCheia = document.querySelector(".sacola-cheia");

botaoPagamento.addEventListener("click", () => {
    let a = 0;

    for (let i = 0; i < inputTodos.length; i++) {
        if (inputTodos[i].value === "") {
            a++;
        }
    }

    if (a > 0) {
        alert("Erro: Preencha todos os campos antes de finalizar!");
    } else {
        location.href = 'sucesso.html'
    }
});

const sacolaJSON = localStorage.getItem('sacola');
const sacola = JSON.parse(sacolaJSON);

const cupomJSON = localStorage.getItem('cupom');
const cupom = JSON.parse(cupomJSON);

const inputCupom = document.querySelector("#cupom-desconto");
inputCupom.value = cupom;

const adicionarProduto = () => {

    let valorPagamento = 0;

    if (sacola.length === 0) {
        sacolaCheia.style.display = 'none';
        sacolaVazia.style.display = 'flex';
    } else {
        sacolaVazia.style.display = 'none';
        sacolaCheia.style.display = 'flex';
    }

    const sacolaCheiaProdutos = document.querySelector(".sacola-cheia-produtos");

    sacolaCheiaProdutos.innerHTML = "";


    for (let i = 0; i < sacola.length; i++) {

        if (sacola[i].quantidade > 1) {
            valorPagamento += sacola[i].quantidade * sacola[i].price;
        } else {
            valorPagamento += sacola[i].price;
        }



        const produto = document.createElement("div")
        produto.setAttribute("class", "produto");
        sacolaCheiaProdutos.append(produto);

        //Esquerda
        const produtoEsquerda = document.createElement("div")
        produtoEsquerda.setAttribute("class", "produto-esquerda");
        produto.append(produtoEsquerda);

        const bannerFilme = document.createElement("img");
        bannerFilme.setAttribute("src", sacola[i].poster_path);
        bannerFilme.setAttribute("class", "banner-filme");
        produtoEsquerda.append(bannerFilme);

        const produtoEsquerdaPreco = document.createElement("div");
        produtoEsquerdaPreco.setAttribute("class", "produto-esquerda-preco");
        produtoEsquerda.append(produtoEsquerdaPreco);
        //Esquerda-interno
        const titulo = document.createElement("span");
        titulo.setAttribute("class", "titulo");
        titulo.innerText = sacola[i].title;
        produtoEsquerdaPreco.append(titulo);

        const preco = document.createElement("span");
        preco.setAttribute("class", "preco");
        preco.innerText = `R$ ${(sacola[i].price).toFixed(2)}`
        produtoEsquerdaPreco.append(preco);

        //Direita
        const produtoDireita = document.createElement("div")
        produtoDireita.setAttribute("class", "produto-direita");
        produto.append(produtoDireita);

        const simboloMais = document.createElement("img");
        simboloMais.setAttribute("src", "https://cdn.discordapp.com/attachments/754322594374746213/756569400726913145/add.png");
        simboloMais.setAttribute("class", "simbolo-mais");
        produtoDireita.append(simboloMais);

        const quantidadeFilmes = document.createElement("span");
        quantidadeFilmes.setAttribute("class", "quantidade-filmes");
        quantidadeFilmes.innerText = sacola[i].quantidade;
        produtoDireita.append(quantidadeFilmes);

        const simboloLixeira = document.createElement("img");
        simboloLixeira.setAttribute("src", "https://cdn.discordapp.com/attachments/754322594374746213/756569412995383356/delete.png");
        simboloLixeira.setAttribute("class", "simbolo-lixeira");

        const simboloMenos = document.createElement("img");
        simboloMenos.setAttribute("src", "https://cdn.discordapp.com/attachments/754322594374746213/758488055111352380/menos.png");
        simboloMenos.setAttribute("class", "simbolo-menos");

        if (sacola[i].quantidade > 1) {
            produtoDireita.append(simboloMenos);
        } else {
            produtoDireita.append(simboloLixeira);
        }

    }

    const cupomDesconto = document.querySelector("#cupom-desconto");

    let valorPagamentoComDesconto = 0;

    const botaoPagamento = document.querySelector(".confirme-seus-dados");

    if (cupomDesconto.value === "htmlnaoelinguagem") {
        valorPagamentoComDesconto = valorPagamento * 0.5;
        botaoPagamento.innerText = `Confirme seus dados R$ ${(valorPagamentoComDesconto).toFixed(2)}`;

    } else {
        botaoPagamento.innerText = `Confirme seus dados R$ ${(valorPagamento).toFixed(2)}`;
    }

    const adicionarProdutoString = JSON.stringify(sacola);
    localStorage.setItem("sacola", adicionarProdutoString)
}

adicionarProduto();