// CONFIGURAÇÃO DE PREÇOS BASE
const PRECO_BASE_POR_MUSICA = 150.00;

const MULTIPLICADOR_GENERO = {
    leve: 1.0,
    medio: 1.3,
    pesado: 1.6
};

const MULTIPLICADOR_PORTE = {
    pequeno: 1.0,
    intermediario: 1.5,
    profissional: 2.2
};

const TAXA_URGENCIA = 1.3;

// ELEMENTOS DO HTML
const formOrcamento = document.getElementById('form-orcamento');
const qtdFaixasInput = document.getElementById('quantidade-faixas');
const generoSelect = document.getElementById('genero-musical');
const prazoSelect = document.getElementById('prazo-entrega');

// Campos de contato adicionais
const nomeClienteInput = document.getElementById('nome-cliente');
const whatsClienteInput = document.getElementById('whats-cliente');
const emailClienteInput = document.getElementById('email-cliente');

// Elementos do Resumo
const resumoFaixas = document.getElementById('resumo-faixas');
const resumoGenero = document.getElementById('resumo-genero');
const resumoPorte = document.getElementById('resumo-porte');
const resumoPrazo = document.getElementById('resumo-prazo');
const precoTotalHTML = document.getElementById('preco-total');
const inputHiddenPreco = document.getElementById('input-hidden-preco');

// FUNÇÃO DO CÁLCULO
function calcularOrcamento() {
    const qtdFaixas = parseInt(qtdFaixasInput.value) || 1;
    const generoSelecionado = generoSelect.value;
    const elementoPorte = document.querySelector('input[name="porte-projeto"]:checked');
    const porteSelecionado = elementoPorte ? elementoPorte.value : 'pequeno';
    const prazoSelecionado = prazoSelect.value;

    let valorFinal = qtdFaixas * PRECO_BASE_POR_MUSICA;
    valorFinal = valorFinal * MULTIPLICADOR_GENERO[generoSelecionado];
    valorFinal = valorFinal * MULTIPLICADOR_PORTE[porteSelecionado];
    
    if (prazoSelecionado === 'urgente') {
        valorFinal = valorFinal * TAXA_URGENCIA;
    }

    resumoFaixas.innerText = qtdFaixas;
    resumoGenero.innerText = generoSelect.options[generoSelect.selectedIndex].text.split('(')[0].trim();
    
    const nomesPorte = { pequeno: "Pequeno", intermediario: "Intermediário", profissional: "Profissional" };
    resumoPorte.innerText = nomesPorte[porteSelecionado];
    resumoPrazo.innerText = prazoSelecionado === 'urgente' ? "Sim (Urgente)" : "Não (Normal)";

    const precoFormatado = `R$ ${valorFinal.toFixed(2).replace('.', ',')}`;
    precoTotalHTML.innerText = precoFormatado;
    
    if (inputHiddenPreco) inputHiddenPreco.value = precoFormatado;
}

// ESCUTADORES DE MUDANÇA
qtdFaixasInput.addEventListener('input', calcularOrcamento);
generoSelect.addEventListener('change', calcularOrcamento);
prazoSelect.addEventListener('change', calcularOrcamento);
formOrcamento.addEventListener('change', function(e) {
    if (e.target.name === 'porte-projeto') calcularOrcamento();
});

// DISPARO DE WHATSAPP + ENVIO DO FORMULÁRIO VIA WEB3FORMS
formOrcamento.addEventListener('submit', function(e) {
    // IMPORTANTE: Coloque seu número real com DDD aqui (Apenas números, prefixo 55 do Brasil)
    const seuNumeroWhats = "5500999999999"; 

    // Coleta dados digitados pelo cliente
    const nome = nomeClienteInput.value;
    const whatsCliente = whatsClienteInput.value;
    const emailCliente = emailClienteInput.value;
    
    const qtdFaixas = qtdFaixasInput.value;
    const genero = resumoGenero.innerText;
    const porte = resumoPorte.innerText;
    const prazo = resumoPrazo.innerText;
    const preco = precoTotalHTML.innerText;

    // Montagem do texto simples para evitar quebras de caracteres
    let textoWhats = "NOVO ORCAMENTO TIMECODE - EXATA STORE\n\n";
    textoWhats += "Cliente: " + nome + "\n";
    textoWhats += "WhatsApp: " + whatsCliente + "\n";
    textoWhats += "E-mail: " + emailCliente + "\n\n";
    textoWhats += "--- DADOS DO PROJETO ---\n";
    textoWhats += "Quantidade de Musicas: " + qtdFaixas + " faixa(s)\n";
    textoWhats += "Genero Musical: " + genero + "\n";
    textoWhats += "Porte da Iluminacao: " + porte + "\n";
    textoWhats += "Prazo Urgente: " + prazo + "\n\n";
    textoWhats += "---------------------------\n";
    textoWhats += "Investimento Estimado: " + preco;

    // Criação da URL e abertura da nova aba no WhatsApp
    const urlWhats = "https://api.whatsapp.com/send?phone=" + seuNumeroWhats + "&text=" + encodeURIComponent(textoWhats);
    window.open(urlWhats, '_blank');

    alert("Orçamento gerado! Redirecionando para o WhatsApp e gerando cópia em e-mail...");
});

// Inicialização da página
calcularOrcamento();