let cardEmEdicao = null;

/* ===============================
   MODAL
================================ */
function openModal() {
  document.body.classList.add("modal-open");
  document.querySelector(".modal").style.display = "flex";
}

function fecharModal() {
  document.body.classList.remove("modal-open");

  const modal = document.querySelector(".modal");
  modal.style.display = "none";

  const form = modal.querySelector("form");
  if (form) form.reset();

  cardEmEdicao = null;
  atualizarValores();
}

/* ===============================
   EDITAR CARD
================================ */
function editarCard(event) {
  cardEmEdicao = event.target.closest(".card");

  const bolsa = cardEmEdicao.querySelector(".box_1_2 h4").textContent;
  const ativos = cardEmEdicao.querySelector(".box_3_2").textContent;
  const simbolo = cardEmEdicao.querySelector(".box_2_2").textContent;

  const form = document.querySelector(".modal form");

  form.bolsa.value = bolsa;
  form.quantidade.value = ativos;
  form.moeda.value = simbolo === "R$" ? "r" : "$";

  atualizarValores();
  openModal();
}

/* ===============================
   ADD / UPDATE CARD
================================ */
function addModalContent(event) {
  event.preventDefault();

  const form = event.target;
  const bolsa = form.bolsa.value;
  const moeda = form.moeda.value;
  const ativos = parseInt(form.quantidade.value) || 0;

  if (!bolsa || ativos <= 0) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  const valor = moeda === "r" ? 50 : 100;
  const simboloMoeda = moeda === "r" ? "R$" : "$U";
  const total = valor * ativos;

  /* 🔄 EDITAR CARD EXISTENTE */
  if (cardEmEdicao) {
    cardEmEdicao.querySelector(".box_1_2 h4").textContent = bolsa;
    cardEmEdicao.querySelector(".box_2_2").textContent = simboloMoeda;
    cardEmEdicao.querySelector(".box_2_3").textContent = valor.toFixed(2);
    cardEmEdicao.querySelector(".box_3_2").textContent = ativos;
    cardEmEdicao.querySelector(".box_3_5").textContent = total.toFixed(2);

    fecharModal();
    return;
  }

  /* ➕ NOVO CARD */
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
        <button type="button" onclick="editarCard(event)">Editar</button>
        <button type="button" onclick="deleteCard(event)">Excluir</button>
      </div>
    </div>
  `;

  document.querySelector(".main").insertAdjacentHTML("beforeend", cardHTML);
  fecharModal();
}

/* ===============================
   CARD ACTIONS
================================ */
function showButtons(event) {
  event.currentTarget.querySelector(".buttons").style.display = "flex";
}

function hideButtons(event) {
  event.currentTarget.querySelector(".buttons").style.display = "none";
}

function deleteCard(event) {
  event.target.closest(".card").remove();
}

/* ===============================
   CÁLCULO DE VALORES
================================ */
const moedaSelect = document.getElementById("moeda");
const valorMoeda = document.getElementById("valor-moeda");
const valorTotal = document.getElementById("valor-total");
const quantidadeInput = document.getElementById("quantidade");

let valorUnitario = 50;
let simboloMoedaAtual = "R$";

moedaSelect.addEventListener("change", () => {
  if (moedaSelect.value === "r") {
    valorUnitario = 50;
    simboloMoedaAtual = "R$";
  } else {
    valorUnitario = 100;
    simboloMoedaAtual = "$U";
  }
  atualizarValores();
});

quantidadeInput.addEventListener("input", atualizarValores);

function atualizarValores() {
  const qtd = parseInt(quantidadeInput.value) || 0;
  const total = qtd * valorUnitario;

  valorMoeda.textContent = `${simboloMoedaAtual} ${valorUnitario.toFixed(2)}`;
  valorTotal.textContent = `${simboloMoedaAtual} ${total.toFixed(2)}`;
}

atualizarValores();
