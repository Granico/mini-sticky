export class Card {
  #id; // Propriété privée : personne ne peut changer l'ID d'une carte par accident

  constructor({ id, owner, title, done = false }) {
    this.#id = id;
    this.owner = owner;
    this.title = title;
    this.done = done;
  }

  get id() {
    return this.#id;
  }

  toggle() {
    this.done = !this.done;
  }

  toHTML() {
    const statusClass = this.done ? "done" : "";
    return `
      <div class="card ${statusClass}" data-id="${this.#id}">
        <strong>${this.owner}</strong>
        <p>${this.title}</p>
      </div>
    `;
  }
}
