// script.js

// Seleciona os elementos do DOM
const form = document.getElementById('form');
const listaHtml = document.getElementById('lista');
const itemInput = document.getElementById('item');
const quantidadeInput = document.getElementById('quantidade');

let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

function salvarPedidos() {
  localStorage.setItem('pedidos', JSON.stringify(pedidos));
}

function renderizarLista() {
  listaHtml.innerHTML = ''; 

  if (pedidos.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'Sua lista de compras está vazia!';
    li.style.textAlign = 'center';
    li.style.color = 'gray';
    listaHtml.appendChild(li);
    return;
  }

  pedidos.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = item.comprado ? 'comprado' : ''; 

    li.innerHTML = `
      <span class="item-text">${item.nome} (${item.qtd})</span>
      <div class="actions">
        <button onclick="marcarComoComprado(${index})" title="Marcar como comprado/não comprado">✅</button>
        <button onclick="removerItem(${index})" title="Remover item">❌</button>
      </div>
    `;
    listaHtml.appendChild(li);
  });
}

function marcarComoComprado(index) {
  pedidos[index].comprado = !pedidos[index].comprado; 
  salvarPedidos();
  renderizarLista();
}

function removerItem(index) {
  pedidos.splice(index, 1); 
  salvarPedidos();
  renderizarLista();
}

form.addEventListener('submit', (e) => {
  e.preventDefault(); 

  const nome = itemInput.value.trim(); 
  const qtd = parseInt(quantidadeInput.value); 

  if (nome && qtd > 0) {
    pedidos.push({ nome, qtd, comprado: false }); 
    salvarPedidos();
    renderizarLista();
    form.reset(); 
    itemInput.focus(); 
  } else {
    alert('Por favor, preencha o nome do produto e uma quantidade válida.');
  }
});

function compartilharViaShareAPI() {
  if (pedidos.length === 0) {
    alert("Sua lista de compras está vazia para compartilhar!");
    return;
  }
  const textoLista = pedidos.map(p => `• ${p.nome} (${p.qtd})${p.comprado ? ' [OK]' : ''}`).join('\n');
  const textoCompartilhar = `Minha Lista de Compras:\n${textoLista}`;

  if (navigator.share) {
    navigator.share({
      title: 'Minha Lista de Compras',
      text: textoCompartilhar,
    })
    .then(() => console.log('Lista compartilhada com sucesso!'))
    .catch((error) => console.log('Erro ao compartilhar:', error));
  } else {
    alert("Seu navegador não suporta o compartilhamento nativo. Você pode copiar a lista abaixo:\n\n" + textoCompartilhar);
  }
}

function enviarWhatsApp() {
  if (pedidos.length === 0) {
    alert("Sua lista de compras está vazia para enviar por WhatsApp!");
    return;
  }
  let mensagem = "🛒 Minha Lista de Compras:\n";
  pedidos.forEach(item => {
    mensagem += `\n• ${item.nome} (${item.qtd})${item.comprado ? ' (✅ Comprado)' : ''}`;
  });

  const mensagemCodificada = encodeURIComponent(mensagem);
  const linkWhatsApp = `https://wa.me/?text=${mensagemCodificada}`;
  window.open(linkWhatsApp, '_blank');
}

// Nova função para gerar PDF
function gerarPDF() {
  if (pedidos.length === 0) {
    alert("Sua lista de compras está vazia para gerar um PDF!");
    return;
  }

  // Verifica se a biblioteca jsPDF está carregada
  if (typeof jspdf === 'undefined') {
    console.error("A biblioteca jsPDF não foi carregada!");
    alert("Erro ao gerar PDF: a biblioteca jsPDF não está disponível. Tente recarregar a página.");
    return;
  }
  const { jsPDF } = jspdf; // Extrai o construtor jsPDF do objeto global

  const doc = new jsPDF();
  const margin = 15; // Margem da página
  let cursorY = margin + 10; // Posição Y inicial, abaixo da margem superior

  // Título do PDF
  doc.setFontSize(18);
  doc.text("Minha Lista de Compras", margin, cursorY);
  cursorY += 10; // Espaço após o título

  // Itens da lista
  doc.setFontSize(12);
  const lineHeight = 7; // Altura da linha para cada item

  pedidos.forEach((item) => {
    // Verifica se o conteúdo vai ultrapassar a margem inferior
    // (297mm é a altura de uma página A4, subtrai a margem inferior)
    if (cursorY > (doc.internal.pageSize.getHeight() - margin - lineHeight)) {
      doc.addPage(); // Adiciona nova página
      cursorY = margin; // Reinicia o cursor Y no topo da nova página
    }

    const textoItem = `• ${item.nome} (Qtd: ${item.qtd})${item.comprado ? ' - [COMPRADO]' : ''}`;
    doc.text(textoItem, margin, cursorY);
    cursorY += lineHeight; // Move o cursor para a próxima linha
  });

  // Salva o PDF
  doc.save("lista-de-compras.pdf");
}


// Adiciona Event Listeners aos botões principais
const btnWhatsApp = document.getElementById('btnWhatsApp');
const btnShareAPI = document.getElementById('btnShareAPI');
const btnGerarPDF = document.getElementById('btnGerarPDF'); // Pega o novo botão

if (btnWhatsApp) {
    btnWhatsApp.addEventListener('click', enviarWhatsApp);
}
if (btnShareAPI) {
    btnShareAPI.addEventListener('click', compartilharViaShareAPI);
}
if (btnGerarPDF) { // Adiciona o event listener para o botão de PDF
    btnGerarPDF.addEventListener('click', gerarPDF);
}

// Renderiza a lista inicial ao carregar a página
renderizarLista();

window.marcarComoComprado = marcarComoComprado;
window.removerItem = removerItem;