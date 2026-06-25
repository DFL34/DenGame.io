// Centralized Game Object Matrix Configuration.
// Simply drop your real folder pathways directly inside this storage element array.
const MY_GAMES = [
  {
    id: "space-shooter-game",
    title: "Space Shooter 2026",
    category: "multiplayer", 
    folderPath: "games/space-shooter/index.html",
    imagePath: "games/space-shooter/thumb.png"
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
        <p style="font-size: 20px; margin-bottom: 10px;">🛸 Transmission Empty</p>
        <p style="font-size: 14px;">No active game directories match that query sequence.</p>
      </div>`;
    return;
  }

  gamesList.forEach(game => {
    const savedViews = localStorage.getItem(game.id + "_views") || 0;
    
    const cardHTML = `
      <a class="game-card" href="${game.folderPath}" onclick="addView('${game.id}')">
        <div class="thumb-container">
          <span class="category-badge">${game.category}</span>
          <img src="${game.imagePath}" alt="${game.title}" onerror="this.src='https://placehold.co{encodeURIComponent(game.title)}'">
        </div>
        <div class="card-details">
          <div class="game-title">${game.title}</div>
          <div class="card-meta">
            <span>Play Now ➔</span>
            <span class="view-count" id="${game.id}-views">👁️ ${savedViews}</span>
          </div>
        </div>
      </a>
    `;
    grid.insertAdjacentHTML("beforeend", cardHTML);
  });
}

function filterGames() {
  const input = document.getElementById("search").value.toLowerCase();
  
  // Filter by both matching search query AND currently active category selection
  const filtered = MY_GAMES.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(input);
    const matchesCategory = currentCategory === "all" || game.category === currentCategory;
    return matchesSearch && matchesCategory;
  });
  
  renderGames(filtered);
}

function filterCategory(category, buttonEl) {
  currentCategory = category;
  
  // Update sidebar activation highlights
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.remove("active"));
  buttonEl.classList.add("active");

  // Clear tracking entry fields when swapping categories
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

// Start rendering when file systems have finished parsing
window.onload = () => {
  renderGames(MY_GAMES);
};
