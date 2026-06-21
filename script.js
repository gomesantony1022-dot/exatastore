let carrinho =[];
    function adicionarAoCarrinho(indice) {
        carrinho.push(produtos[indice]);

    document.getElementById("contador-carrinho").innerText =
        "Carrinho: " + carrinho.length + "itens";

        atualizarCarrinho();
    }
    
    function atualizarCarrinho() {

        let listaCarrinho =
    document.getElementById("lista-carrinho");
        listaCarrinho.innerHTML = "";

        let total = 0;

        for (let indice in carrinho) {

            let item = carrinho[indice];
            listaCarrinho.innerHTML += `
            <p>
                ${item.nome} - R$ ${item.preco}

                <button onclick="removerItem(${indice})">
                    Remover
                </button>
            </p>
            `;
            total += item.preco;

        }
document.getElementById("total-carrinho").innerText = 
    "Total: R$ " + total;       

    }

function pesquisar() {

    let texto =
document.getElementById("pesquisa").value;

    alert("Você pesquisou: " + texto);

}

let produtos = [
    
    {
        nome: "Parafusadeira",
        preço: 120
    },

    {
        nome: "Bit P2",
        preço: 25
    },

    {
        nome: "Martelo",
        preço: 50
    },
];
let lista =
document.getElementById("lista-produtos")

for (let indice in produtos) {

    let produto = produtos[indice];
    
    lista.innerHTML += `

        <div class="card">
            <h3>${produto.nome}</h3>
            <p>R$ ${produto.preço}</p>
            <button onclick="adicionarAoCarrinho(${indice})">
                Comprar
            </button>
        </div>
        `;
}