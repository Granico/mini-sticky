// 1. NOS DONNÉES (l'état de l'application)
let cards = [
  { id: 1, owner: "Cyril", title: "Appeler le fournisseur", done: false },
  { id: 2, owner: "Alice", title: "Préparer la maquette", done: true },
  { id: 3, owner: "Cyril", title: "Tester Supabase", done: false }
];

// 2. LE GABARIT D'UNE CARTE (Préparation des variables -> HTML)
function renderCard(card) {
  const statusClass = card.done ? "done" : "";

  return `
    <div class="card ${statusClass}" data-id="${card.id}">
      <strong>${card.owner}</strong>
      <p>${card.title}</p>
    </div>
  `;
}

// 3. LA FONCTION DE RENDU GLOBAL (Données -> DOM)
function render() {
  const board = document.getElementById("board");
  board.innerHTML = cards.map(renderCard).join("");
}

// 4. LA GESTION DU CLIC (Événement -> Mise à jour -> Nouveau rendu)
function handleBoardClick(event) {
  const cardElement = event.target.closest(".card");
  if (!cardElement) return;

  const clickedId = Number(cardElement.dataset.id);

  cards = cards.map(card => 
    card.id === clickedId 
      ? { ...card, done: !card.done } 
      : card
  );

  render();
}

// 5. INITIALISATION DE L'APPLICATION
const board = document.getElementById("board");
board.addEventListener("click", handleBoardClick);
render();
