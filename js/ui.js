// ui.js
// Basic UI scaffolding. You can expand it once the other modules are ready.

export function renderApp() {
    const app = document.getElementById("app");
    app.innerHTML = `
    <header class="app-header">
      <h1>Beer Ranking App 🍺</h1>
      <button id="themeToggle">Toggle Theme</button>
    </header>

    <main>
      <section id="sessionControls"></section>
      <section id="beerControls"></section>
      <section id="beerList"></section>
      <section id="charts"></section>
    </main>
  `;

    document.getElementById("themeToggle").addEventListener("click", toggleTheme);
}

export function toggleTheme() {
    document.body.classList.toggle("dark-mode");
}

// Additional UI update hooks can go here
export function updateSessionUI(html) {
    document.getElementById("sessionControls").innerHTML = html;
}

export function updateBeerUI(html) {
    document.getElementById("beerControls").innerHTML = html;
}

export function updateBeerList(html) {
    document.getElementById("beerList").innerHTML = html;
}

export function updateCharts(html) {
    document.getElementById("charts").innerHTML = html;
}
