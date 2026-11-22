import { Card } from "./Card.js";
import { fetchCardsFromServer } from "./api.js";

let cards = [];
let currentFilter = "ALL";

// 1. RENDU DU TABLEAU (Pipeline : Filtrer -> Transformer -> Coller)
function render() {
  const board = document.getElementById("board");

  board.innerHTML = cards
    .filter(card => currentFilter === "ALL" || card.owner === currentFilter)
    .map(card => card.toHTML())
    .join("");
}

// 2. AJOUT D'UNE NOUVELLE CARTE (Soumission du formulaire)
function handleAddCard(event) {
  event.preventDefault(); // Empêche le rechargement de la page

  const ownerInput = document.getElementById("owner-input");
  const titleInput = document.getElementById("title-input");

  const newCard = new Card({
    id: Date.now(),
    owner: ownerInput.value.trim(),
    title: titleInput.value.trim()
  });

  cards = [...cards, newCard]; // Copie immuable + nouvel élément
  event.target.reset();        // Vide les champs du formulaire
  render();
}

// 3. FILTRAGE PAR PROPRIÉTAIRE (Chaînage optionnel ?. et coalescence ??)
function handleFilterClick(event) {
  const selectedOwner = event.target.closest("button")?.dataset.owner;
  if (!selectedOwner) return;

  currentFilter = selectedOwner ?? "ALL";
  render();
}

// 4. BASCULE DONE / TODO AU CLIC SUR UNE CARTE
function handleBoardClick(event) {
  const cardElement = event.target.closest(".card");
  if (!cardElement) return;

  const clickedId = Number(cardElement.dataset.id);
  const targetCard = cards.find(card => card.id === clickedId);

  if (targetCard) {
    targetCard.toggle();
    render();
  }
}

// 5. INITIALISATION
async function init() {
  document.getElementById("board").addEventListener("click", handleBoardClick);
  document.getElementById("add-card-form").addEventListener("submit", handleAddCard);
  document.getElementById("filters").addEventListener("click", handleFilterClick);
  document.getElementById("clear-done").addEventListener("click", () => { cards = cards.filter(card => !card.done); render(); });

  const { data, error } = await fetchCardsFromServer();

  if (error) {
    document.getElementById("board").innerHTML = `<p style="color:red;">Erreur : ${error}</p>`;
    return;
  }

  cards = data;
  render();
}

init();
