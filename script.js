// Add or remove your actual games here
const MY_GAMES = [
  {
    id: "my-first-horror",
    title: "My Custom Horror Game",
    category: "horror",
    folderPath: "games/your-game-1/index.html",
    imagePath: "games/your-game-1/thumbnail.png"
  },
  {
    id: "arena-battle",
    title: "Multiplayer Arena",
    category: "multiplayer",
    folderPath: "games/your-game-2/index.html",
    imagePath: "games/your-game-2/thumbnail.png"
  }
];

// Dynamically render lists
function renderGames(gamesList) {
  const grid = document.getElementById("games-grid");
  grid.innerHTML = "";

  if(gamesList.length === 0) {
    grid.innerHTML = `<p style="color: #8b949e; grid-column: 1/-1; text-align: center;">No games match your search criteria.</p>`;
    return;
  }

  gamesList.forEach(game => {
    const savedViews = localStorage.getItem(game.id + "_views") || 0;
    
    const cardHTML = `
      <a class="card" href="${game.folderPath}" onclick="addView('${game.id}')" data-category="${game.category}">
        <div class="card-img-wrapper">
          <img src="${game.imagePath}" alt="${game.title}" onerror="this.src='https://placehold.co'">
        </div>
        <div class="card-info">
          <p>${game.title}</p>
          <span class="views" id="${game.id}-views">👁️ ${savedViews} views</span>
        </div>
      </a>
    `;
    grid.insertAdjacentHTML("beforeend", cardHTML);
  });
}

function filterGames() {
  const input = document.getElementById("search").value.toLowerCase();
  const filtered = MY_GAMES.filter(game => game.title.toLowerCase().includes(input));
  renderGames(filtered);
}

function filterCategory(category, buttonEl) {
  // Toggle active styling
  document.querySelectorAll(".filters button").forEach(btn => btn.classList.remove("active"));
  buttonEl.classList.add("active");

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

// Kickstart deployment on load
window.onload = () => {
  renderGames(MY_GAMES);
};
