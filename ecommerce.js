const generosFilmes = fetch('https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR')

generosFilmes.then((resposta) => {
    return resposta.json() //to lendo o item em JSON e convertendo para objeto
}).then(obj => {

    const cards = document.querySelectorAll(".top-filmes-card > .card");

    listaDeFilmes = obj.results;

    for (let i = 0; i < 5; i++) {

        const titulo = cards[i].querySelector(".card-corpo-rodape > p ");
        titulo.innerText = obj.results[i].title;

        const nota = cards[i].querySelector(".card-corpo-rodape .pontuacao-filme")
        nota.innerText = obj.results[i].vote_average;

        const preco = cards[i].querySelector(".card-rodape > span");
        preco.innerText = `R$ ${(obj.results[i].price).toFixed(2)}`;

        const imagemBanner = cards[i];
        imagemBanner.style.backgroundImage = `url(${obj.results[i].poster_path})`


    }

})


function generosDiversos(id) {

    const generos = fetch(`https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=${id}&language=pt-BR`);

    generos.then((resposta) => {
        return resposta.json() //to lendo o item em JSON e convertendo para objeto
    }).then(obj => {

        const cards = document.querySelectorAll(".filmes .card");
        listaDeFilmesGenero = obj.results;

        for (let i = 0; i < 20; i++) {

            const titulo = cards[i].querySelector(".card-corpo-rodape  p ");
            titulo.innerText = obj.results[i].title;

            const nota = cards[i].querySelector(".card-corpo-rodape .pontuacao-filme")
            nota.innerText = obj.results[i].vote_average;

            const preco = cards[i].querySelector(".card-rodape  span");
            preco.innerText = `R$ ${(obj.results[i].price).toFixed(2)}`;

            const imagemBanner = cards[i];
            imagemBanner.style.backgroundImage = `url(${obj.results[i].poster_path})`



        }

    })
}

generosDiversos(35);
generosDiversos(28);
generosDiversos(10749);
generosDiversos(878);
generosDiversos(10770);


//Interação

const banner = document.querySelector(".conteudo-principal-banner");
const contador = document.querySelector(".contagem");
const inputCupom = document.querySelector("#cupom-desconto");
const botaoComedia = document.querySelector(".botao-comedia");
const botaoAcao = document.querySelector(".botao-acao");
const botaoRomance = document.querySelector(".botao-romance");
const botaoFiccao = document.querySelector(".botao-ficcao");
const botaoTerror = document.querySelector(".botao-terror");
const botaoSacolas = document.querySelectorAll(".card-rodape")
const sacolaVazia = document.querySelector(".sacola-vazia");
const sacolaCheia = document.querySelector(".sacola-cheia");

banner.addEventListener("click", () => {
    inputCupom.value = "htmlnaoelinguagem";
    banner.setAttribute("hidden", true);
    adicionarProduto()
});

let tempoContador = 300;
let hora = 00;
let min = tempoContador / 60;
let segundo = (tempoContador % 60)



setInterval(() => {

    let a = tempoContador % 60;

    if (a <= 9) {
        a = `0${a} `
    } else {
        a = a
    }

    let tempoContadorFormat = `00: 0${Math.floor(tempoContador / 60)}: ${(a)} `;

    contador.innerText = tempoContadorFormat;

    tempoContador = tempoContador - 1;

    if (tempoContador === -1) {
        banner.setAttribute("hidden", true);
    }

}, 1000);

botaoComedia.addEventListener("click", () => {
    generosDiversos(35);
});

botaoAcao.addEventListener("click", () => {
    generosDiversos(28);
});

botaoRomance.addEventListener("click", () => {
    generosDiversos(10749);
});

botaoFiccao.addEventListener("click", () => {
    generosDiversos(878);
});

botaoTerror.addEventListener("click", () => {
    generosDiversos(10770);
});

let listaDeFilmes = [];
let listaDeFilmesGenero = [];
let sacola = [];

for (let i = 0; i < botaoSacolas.length; i++) {

    botaoSacolas[i].addEventListener("click", () => {

        sacolaVazia.style.display = 'none';

        let filmeSacola = "";

        if (i < 5) {
            filmeSacola = listaDeFilmes[i]
        } else {
            filmeSacola = listaDeFilmesGenero[i - 5];
        }

        let a = 0;

        for (let j = 0; j < sacola.length; j++) {
            if (sacola[j].title === filmeSacola.title) {
                sacola[j].quantidade++;
                a++;
            }
        }

        if (a === 0) {
            sacola.push(filmeSacola)
            filmeSacola.quantidade = 1
        }
        adicionarProduto()

    })
}

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


    if (sacola.length === 0) {
        botaoPagamento.style.display = 'none';
    } else {
        botaoPagamento.style.display = 'flex';
    }
}


const botaoPagamento = document.querySelector(".confirme-seus-dados");
botaoPagamento.addEventListener("click", () => {

    const codigo = inputCupom.value;

    const cupomhtml = JSON.stringify(codigo);
    localStorage.setItem("cupom", cupomhtml)

    location.href = "pagamento.html";

})

adicionarProduto()

