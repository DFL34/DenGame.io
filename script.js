function filterGames() {
  let input = document.getElementById("search").value.toLowerCase();
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    let text = card.innerText.toLowerCase();
    card.style.display = text.includes(input) ? "" : "none";
  });
}

function filterCategory(category) {
  let cards = document.querySelectorAll(".card");

  cards.forEach(card => {
    card.style.display = card.classList.contains(category) ? "" : "none";
  });
}

function showAll() {
  let cards = document.querySelectorAll(".card");
  cards.forEach(card => card.style.display = "");
}

/* VIEWS SYSTEM (local only) */
function addView(gameId) {
  let key = gameId + "_views";

  let views = localStorage.getItem(key);
  views = views ? parseInt(views) : 0;

  views++;
  localStorage.setItem(key, views);

  updateViews();
}

function updateViews() {
  let games = ["game1", "game2", "game3"];

  games.forEach(id => {
    let key = id + "_views";
    let views = localStorage.getItem(key) || 0;

    let el = document.getElementById(id + "-views");
    if (el) el.innerText = views + " views";
  });
}

window.onload = updateViews;