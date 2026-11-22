import { Card } from "./Card.js";

export async function fetchCardsFromServer() {
  try {
    const response = await fetch("./cards.json");
    if (!response.ok) {
      throw new Error(`Erreur HTTP : ${response.status}`);
    }
    const rawData = await response.json();

    // On transforme chaque objet JSON brut en vraie instance de Card
    const cards = rawData.map(item => new Card(item));
    return { data: cards, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}
