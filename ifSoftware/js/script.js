function openModal() {
  const modal = document.querySelector(".modal")
  modal.style.display = "flex"
  console.log("foi")
}

function fecharModal() {
  const modal = document.querySelector(".modal")
  modal.style.display = "none"
}

function addModalContent(event) {
  event.preventDefault();

  const form = event.target;

  const bolsa = form.bolsa.value;
  const moeda = form.moeda.value;
  const ativos = parseInt(form.quantidade.value) || 0;


  let valor = 0;
  let simboloMoeda = "";
  if (moeda === "r") {
    valor = 50;
    simboloMoeda = "R$";
  } else if (moeda === "$") {
    valor = 100;
    simboloMoeda = "$U";
  }

  const total = valor * ativos;

  const cardHTML = `

      <div class="card" onmouseenter="showButtons(event)" onmouseleave="hideButtons(event)">
        <div class="box_1">
          <div class="box_1_1">
            <h4>IFSoftware</h4>
          </div>
          <div class="box_1_2">
            <h4>${bolsa}</h4>
          </div>
        </div>
        <div class="box_2">
          <div class="box_2_1">+</div>
          <div class="box_2_2">${simboloMoeda}</div>
          <div class="box_2_3" style="text-align:right">${valor.toFixed(2)}</div>
        </div>
        <div class="box_3">
          <div class="box_3_1">Ativos</div>
          <div class="box_3_2" style="text-align:right">${ativos}</div>
          <div class="box_3_3">||</div>
          <div class="box_3_4">${simboloMoeda}</div>
          <div class="box_3_5" style="text-align:right">${total.toFixed(2)}</div>
        </div>
        <div class="buttons">
            <button type="button" onclick="">Editar</button>
            <button type="button" onclick="deleteCard(event)">Excluir</button>
        </div>
      </div>
  
  `;

  const cards = document.querySelector(".main");
  cards.innerHTML += cardHTML;

  fecharModal();
}

function showButtons(event) {
  const card = event.target
  const buttons = card.querySelector(".buttons")
  buttons.style.display = "flex"
}

function hideButtons(event) {
  const card = event.target
  const buttons = card.querySelector(".buttons")
  buttons.style.display = "none"
}

function deleteCard(event) {
  const buttonDelete = event.target
  const card = buttonDelete.closest(".card")
  card.remove()
}


const moedaSelect = document.getElementById("moeda");
const valorMoeda = document.getElementById("valor-moeda");
const valorTotal = document.getElementById("valor-total");
const quantidadeInput = document.getElementById("quantidade");

let valorUnitario = 50;
let simboloMoeda = "R$";

moedaSelect.addEventListener("change", function () {
  if (this.value === "r") {
    simboloMoeda = "R$";
    valorUnitario = 50;
  } else {
    simboloMoeda = "$U";
    valorUnitario = 100;
  }
  atualizarValores();
});

quantidadeInput.addEventListener("input", atualizarValores);

function atualizarValores() {
  const qtd = parseInt(quantidadeInput.value) || 0;
  const total = qtd * valorUnitario;

  valorMoeda.textContent = `${simboloMoeda} ${valorUnitario.toFixed(2)}`;
  valorTotal.textContent = `${simboloMoeda} ${total.toFixed(2)}`;
}

atualizarValores();

