const artisans = [
  { id: 1, name: "Électricien exemple", category: "Électricité", location: "N'Djaména", district: "Moursal", initials: "ÉE", color: "", hint: "Tarif à confirmer avec l’artisan" },
  { id: 2, name: "Plombier exemple", category: "Plomberie", location: "N'Djaména", district: "Walia", initials: "PE", color: "orange", hint: "Tarif à confirmer avec l’artisan" },
  { id: 3, name: "Réparateur exemple", category: "Téléphone", location: "Moundou", district: "Centre-ville", initials: "RE", color: "blue", hint: "Tarif à confirmer avec l’artisan" },
  { id: 4, name: "Menuisier exemple", category: "Menuiserie", location: "Sarh", district: "Quartier résidentiel", initials: "ME", color: "orange", hint: "Tarif à confirmer avec l’artisan" },
  { id: 5, name: "Réparateur vélo exemple", category: "Autre", location: "Abéché", district: "Centre-ville", initials: "RV", color: "blue", hint: "Tarif à confirmer avec l’artisan" },
  { id: 6, name: "Technicien exemple", category: "Électricité", location: "Moundou", district: "Quartier résidentiel", initials: "TE", color: "", hint: "Tarif à confirmer avec l’artisan" },
];

const grid = document.querySelector("#artisan-grid");
const count = document.querySelector("#results-count");
const emptyState = document.querySelector("#empty-state");
const searchInput = document.querySelector("#search-input");
const locationSelect = document.querySelector("#location-select");
const categoryButtons = [...document.querySelectorAll(".category-chip")];
const requestDialog = document.querySelector("#request-dialog");
const requestCategory = document.querySelector("#request-category");
const feedback = document.querySelector("#form-feedback");
let selectedCategory = "all";
let toastTimer;

function renderArtisans() {
  const query = searchInput.value.trim().toLocaleLowerCase("fr");
  const city = locationSelect.value;
  const matches = artisans.filter((artisan) => {
    const matchesCategory = selectedCategory === "all" || artisan.category === selectedCategory;
    const matchesCity = city === "all" || artisan.location === city;
    const searchable = `${artisan.name} ${artisan.category} ${artisan.location} ${artisan.district}`.toLocaleLowerCase("fr");
    return matchesCategory && matchesCity && (!query || searchable.includes(query));
  });

  grid.replaceChildren(...matches.map(createArtisanCard));
  count.textContent = `${matches.length} profil${matches.length === 1 ? "" : "s"} de démonstration`;
  emptyState.hidden = matches.length > 0;
  grid.hidden = matches.length === 0;
}

function createArtisanCard(artisan) {
  const article = document.createElement("article");
  article.className = "artisan-card";
  article.innerHTML = `
    <div class="artisan-top">
      <div class="avatar ${artisan.color}" aria-hidden="true">${artisan.initials}</div>
      <div><h3 class="artisan-name">${artisan.name}</h3><p class="artisan-trade">${artisan.category}</p></div>
      <span class="demo-tag">Exemple</span>
    </div>
    <p class="artisan-location"><span aria-hidden="true">⌖</span>${artisan.district}, ${artisan.location}</p>
    <div class="card-bottom"><span class="price-hint">${artisan.hint}</span><button class="text-button" type="button" data-request-category="${artisan.category}">Demander un devis →</button></div>`;
  article.querySelector("[data-request-category]").addEventListener("click", () => openRequest(artisan.category));
  return article;
}

function setCategory(category) {
  selectedCategory = category;
  categoryButtons.forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  renderArtisans();
}

function openRequest(category = "") {
  requestCategory.value = category;
  feedback.hidden = true;
  feedback.textContent = "";
  requestDialog.showModal();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("visible"), 3500);
}

categoryButtons.forEach((button) => button.addEventListener("click", () => setCategory(button.dataset.category)));
searchInput.addEventListener("input", renderArtisans);
locationSelect.addEventListener("change", renderArtisans);
document.querySelector("#search-form").addEventListener("submit", (event) => {
  event.preventDefault();
  renderArtisans();
  document.querySelector("#artisans").scrollIntoView({ behavior: "smooth" });
});
document.querySelectorAll("[data-search]").forEach((button) => {
  button.addEventListener("click", () => {
    searchInput.value = button.dataset.search;
    renderArtisans();
    document.querySelector("#artisans").scrollIntoView({ behavior: "smooth" });
  });
});
document.querySelector("#reset-filters").addEventListener("click", () => {
  searchInput.value = "";
  locationSelect.value = "all";
  setCategory("all");
});
document.querySelectorAll("#header-request, #how-request, #bottom-request").forEach((button) => {
  button.addEventListener("click", () => openRequest());
});
document.querySelector(".dialog-close").addEventListener("click", () => requestDialog.close());
requestDialog.addEventListener("click", (event) => {
  if (event.target === requestDialog) requestDialog.close();
});
document.querySelector("#request-form").addEventListener("submit", (event) => {
  event.preventDefault();
  feedback.textContent = "Merci ! Cette maquette ne transmet pas encore les demandes. Aucun artisan ne sera contacté et vos informations ne sont pas enregistrées.";
  feedback.hidden = false;
  showToast("Démonstration uniquement — votre demande n’a pas été envoyée.");
});

renderArtisans();
