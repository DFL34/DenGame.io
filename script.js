// Centralized Game Array Matrix
// Enter all future game directories directly down into this structured framework array.
const MY_GAMES = [
  {
    id: "bloxorz-3d-clone",
    title: "Bloxorz 3D",
    category: "multiplayer", 
    folderPath: "games/bloxorz/index.html",
    imagePath: "games/bloxorz/backround_pic1.jpg"
  }
];

let currentCategory = "all";

function renderGames(gamesList) {
  const grid = document.getElementById("games-grid");
  const countTag = document.getElementById("count-tag");
  
  grid.innerHTML = "";
  countTag.innerText = `${gamesList.length} Game${gamesList.length === 1 ? '' : 's'} Available`;

  if(gamesList.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
        <p style="font-size: 16px; margin-bottom: 5px;">No games available</p>
        <p style="font-size: 13px;">Check back later for updates.</p>
      </div>`;
    return;
  }

  gamesList.forEach(game => {
    const savedViews = localStorage.getItem(game.id + "_views") || 0;
    
    const cardHTML = `
      <a class="game-card" href="${game.folderPath}" onclick="addView('${game.id}')">
        <div class="thumb-container">
          <img src="${game.imagePath}" alt="${game.title}" onerror="this.src='https://placehold.co{encodeURIComponent(game.title)}'">
        </div>
        <div class="card-details">
          <div class="game-title">${game.title}</div>
          <div class="card-meta">
            <span>Play Now ➔</span>
            <span class="view-count" id="${game.id}-views">Views: ${savedViews}</span>
          </div>
        </div>
      </a>
    `;
    grid.insertAdjacentHTML("beforeend", cardHTML);
  });
}

function filterGames() {
  const input = document.getElementById("search").value.toLowerCase();
  
  const filtered = MY_GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(input);
    const matchesCategory = currentCategory === "all" || game.category === currentCategory;
    return matchesSearch && matchesCategory;
  });
  
  renderGames(filtered);
}

function filterCategory(category, buttonEl) {
  currentCategory = category;
  
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.remove("active"));
  buttonEl.classList.add("active");
  document.getElementById("search").value = "";

  if (category === 'all') {
    renderGames(MY_GAMES);
  } else {
    const filtered = MY_GAMES.filter(game => game.category === category);
    renderGames(filtered);
  }
}

function addView(gameId) {
  let key = gameId + "_views";
  let views = parseInt(localStorage.getItem(key)) || 0;
  views++;
  localStorage.setItem(key, views);
}

window.onload = () => {
  renderGames(MY_GAMES);
};
