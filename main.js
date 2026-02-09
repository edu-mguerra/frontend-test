const translations = {
  en: {
    title: "GreenFriend - Find Your Perfect Plant",
    logoText: "GreenFriend",
    tagline: "Find your plant companion",
    sunlight: "Sunlight",
    water: "Water",
    petSafety: "Pet Safety",
    high: "High",
    low: "Low",
    none: "None",
    daily: "Daily",
    regular: "Regular",
    rare: "Rare",
    petFriendly: "Pet Friendly",
    toxic: "Toxic",
    clearFilters: "Clear All Filters",
    totalPlants: "Total Plants",
    showing: "Showing",
    findPerfect: "Find Your Perfect",
    greenFriend: "Green Friend",
    selectPreferences:
      "Select your preferences and discover plants that match your lifestyle",
    recommended: "Recommended Plants",
    sortByName: "Name (A-Z)",
    sortPriceLow: "Price (Low to High)",
    sortPriceHigh: "Price (High to Low)",
    staffFavorite: "Staff Favorite",
    petSafe: "Pet safe",
    toxicToPets: "Toxic",
    noResults: "No plants match your criteria",
    tryAdjusting: "Try adjusting your filters or clear them to see all plants",
    filters: "Filters",
    translate: "Translate",
    sortBy: "Sort by:",
    gridView: "Grid View",
    listView: "List View",
  },
  pt: {
    title: "GreenFriend - Encontre Sua Planta Perfeita",
    logoText: "GreenFriend",
    tagline: "Encontre sua companhia verde",
    sunlight: "Luz Solar",
    water: "Água",
    petSafety: "Segurança para Pets",
    high: "Alta",
    low: "Baixa",
    none: "Nenhuma",
    daily: "Diariamente",
    regular: "Regularmente",
    rare: "Raramente",
    petFriendly: "Amigo dos Pets",
    toxic: "Tóxica",
    clearFilters: "Limpar Filtros",
    totalPlants: "Plantas Totais",
    showing: "Mostrando",
    findPerfect: "Encontre Seu",
    greenFriend: "Amigo Verde Perfeito",
    selectPreferences:
      "Selecione suas preferências e descubra plantas que combinam com seu estilo de vida",
    recommended: "Plantas Recomendadas",
    sortByName: "Nome (A-Z)",
    sortPriceLow: "Preço (Baixo-Alto)",
    sortPriceHigh: "Preço (Alto-Baixo)",
    staffFavorite: "Favorita da Equipe",
    petSafe: "Segura para pets",
    toxicToPets: "Tóxica",
    noResults: "Nenhuma planta corresponde aos critérios",
    tryAdjusting:
      "Tente ajustar seus filtros ou limpe-os para ver todas as plantas",
    filters: "Filtros",
    translate: "Traduzir",
    sortBy: "Ordenar por:",
    gridView: "Visualização em Grade",
    listView: "Visualização em Lista",
  },
  es: {
    title: "GreenFriend - Encuentra Tu Planta Perfecta",
    logoText: "GreenFriend",
    tagline: "Encuentra tu compañía verde",
    sunlight: "Luz Solar",
    water: "Agua",
    petSafety: "Seguridad para Mascotas",
    high: "Alta",
    low: "Baja",
    none: "Ninguna",
    daily: "Diariamente",
    regular: "Regularmente",
    rare: "Raramente",
    petFriendly: "Amigable con Mascotas",
    toxic: "Tóxica",
    clearFilters: "Limpiar Filtros",
    totalPlants: "Plantas Totales",
    showing: "Mostrando",
    findPerfect: "Encuentra Tu",
    greenFriend: "Amigo Verde Perfecto",
    selectPreferences:
      "Selecciona tus preferencias y descubre plantas que coincidan con tu estilo de vida",
    recommended: "Plantas Recomendadas",
    sortByName: "Nombre (A-Z)",
    sortPriceLow: "Precio (Bajo-Alto)",
    sortPriceHigh: "Precio (Alto-Bajo)",
    staffFavorite: "Favorita del Equipo",
    petSafe: "Segura para mascotas",
    toxicToPets: "Tóxica",
    noResults: "No hay plantas que coincidan con los criterios",
    tryAdjusting:
      "Intenta ajustar tus filtros o límpialos para ver todas las plantas",
    filters: "Filtros",
    translate: "Traducir",
    sortBy: "Ordenar por:",
    gridView: "Vista en Cuadrícula",
    listView: "Vista en Lista",
  },
};

class PlantFinder {
  constructor() {
    this.plants = [];
    this.filteredPlants = [];
    this.filters = { sun: null, water: null, pets: null };
    this.currentLang = "pt";
    this.isSidebarCollapsed = false;
    this.isListView = false;
    this.init();
  }

  async init() {
    this.createOverlay();
    this.cacheElements();
    this.bindEvents();
    await this.loadPlants();
    this.renderAllPlants();
    this.setupLanguage();
  }

  createOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    overlay.id = "sidebar-overlay";
    document.body.appendChild(overlay);
  }

  cacheElements() {
    this.plantsGrid = document.getElementById("plants-grid");
    this.plantsList = document.getElementById("plants-list");
    this.noResults = document.getElementById("no-results");
    this.totalPlants = document.getElementById("total-plants");
    this.filteredPlantsCount = document.getElementById("filtered-plants");
    this.filterButtons = document.querySelectorAll(".filter-btn");
    this.clearButton = document.getElementById("clear-filters");
    this.sortSelect = document.getElementById("sort-select");
    this.sidebar = document.getElementById("sidebar");
    this.toggleSidebar = document.getElementById("toggle-sidebar");
    this.mobileToggle = document.getElementById("mobile-toggle");
    this.viewToggle = document.getElementById("view-toggle");
    this.langButtons = document.querySelectorAll(".lang-btn");
    this.translateBtn = document.getElementById("translate-btn");
    this.overlay = document.getElementById("sidebar-overlay");
    this.closeMobileBtn = document.getElementById("close-mobile");
  }

  bindEvents() {
    if (this.closeMobileBtn) {
      this.closeMobileBtn.addEventListener("click", () =>
        this.closeMobileSidebar(),
      );
    }

    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.handleFilterClick(e);
        if (window.innerWidth <= 1024) this.closeMobileSidebar();
      });
    });

    this.clearButton.addEventListener("click", () => {
      this.clearFilters();
      if (window.innerWidth <= 1024) this.closeMobileSidebar();
    });

    this.sortSelect.addEventListener("change", () => this.sortPlants());

    this.toggleSidebar.addEventListener("click", () =>
      this.toggleSidebarState(),
    );

    this.mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      this.toggleMobileSidebar();
    });

    this.viewToggle.addEventListener("click", () => this.toggleView());

    this.langButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => this.changeLanguage(e));
    });

    this.translateBtn.addEventListener("click", () => this.showLanguageMenu());

    this.overlay.addEventListener("click", () => this.closeMobileSidebar());
  }

  async loadPlants() {
    try {
      const response = await fetch("./plants.json");
      this.plants = await response.json();
      this.plants = this.plants.map((p) => ({
        ...p,
        staff_favorite: Math.random() > 0.8,
      }));
      this.filteredPlants = [...this.plants];
      this.totalPlants.textContent = this.plants.length;
    } catch (error) {
      console.error(error);
    }
  }

  setupLanguage() {
    const savedLang = localStorage.getItem("plantFinderLang") || "pt";
    this.changeLanguageTo(savedLang);
  }

  changeLanguage(event) {
    const lang = event.currentTarget.dataset.lang;
    this.changeLanguageTo(lang);
  }

  changeLanguageTo(lang) {
    this.currentLang = lang;
    localStorage.setItem("plantFinderLang", lang);

    this.langButtons.forEach((btn) => {
      btn.classList.remove("active");
      if (btn.dataset.lang === lang) btn.classList.add("active");
    });

    this.updateTexts();
  }

  updateTexts() {
    const t = translations[this.currentLang];

    document.title = t.title;
    document.querySelector(".logo-text h1").textContent = t.logoText;
    document.querySelector(".tagline").textContent = t.tagline;

    document.querySelectorAll(".filter-group h3")[0].textContent = t.sunlight;
    document.querySelectorAll(".filter-group h3")[1].textContent = t.water;
    document.querySelectorAll(".filter-group h3")[2].textContent = t.petSafety;

    document.querySelector(
      '[data-filter="sun"][data-value="high"] span',
    ).textContent = t.high;
    document.querySelector(
      '[data-filter="sun"][data-value="low"] span',
    ).textContent = t.low;
    document.querySelector(
      '[data-filter="sun"][data-value="no"] span',
    ).textContent = t.none;

    document.querySelector(
      '[data-filter="water"][data-value="daily"] span',
    ).textContent = t.daily;
    document.querySelector(
      '[data-filter="water"][data-value="regularly"] span',
    ).textContent = t.regular;
    document.querySelector(
      '[data-filter="water"][data-value="rarely"] span',
    ).textContent = t.rare;

    document.querySelector(
      '[data-filter="pets"][data-value="false"] span',
    ).textContent = t.petFriendly;
    document.querySelector(
      '[data-filter="pets"][data-value="true"] span',
    ).textContent = t.toxic;

    this.clearButton.innerHTML = `<i class="fas fa-times"></i> ${t.clearFilters}`;
    document.querySelectorAll(".stat-label")[0].textContent = t.totalPlants;
    document.querySelectorAll(".stat-label")[1].textContent = t.showing;

    document.querySelector(".hero-text h2").innerHTML =
      `${t.findPerfect} <span class="highlight">${t.greenFriend}</span>`;
    document.querySelector(".hero-text p").textContent = t.selectPreferences;

    document.querySelector(".results-header h3").textContent = t.recommended;
    document.querySelector(".sort-options span").textContent = t.sortBy + " ";

    document.getElementById("sort-select").innerHTML = `
            <option value="name">${t.sortByName}</option>
            <option value="price-low">${t.sortPriceLow}</option>
            <option value="price-high">${t.sortPriceHigh}</option>
        `;

    this.mobileToggle.innerHTML = `<i class="fas fa-filter"></i> ${t.filters}`;
    this.translateBtn.innerHTML = `<i class="fas fa-language"></i> ${t.translate}`;

    document.querySelector("#no-results h4").textContent = t.noResults;
    document.querySelector("#no-results p").textContent = t.tryAdjusting;

    this.renderPlants();
  }

  showLanguageMenu() {
    const currentLangBtn = document.querySelector(
      `[data-lang="${this.currentLang}"]`,
    );

    currentLangBtn.classList.add("pulse");
    setTimeout(() => currentLangBtn.classList.remove("pulse"), 500);
  }

  toggleSidebarState() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebar.classList.toggle("collapsed");

    const icon = this.toggleSidebar.querySelector("i");
    icon.style.transform = this.isSidebarCollapsed
      ? "rotate(180deg)"
      : "rotate(0)";
  }

  toggleMobileSidebar() {
    this.sidebar.classList.toggle("active");
    this.overlay.classList.toggle("active");
  }

  closeMobileSidebar() {
    this.sidebar.classList.remove("active");
    this.overlay.classList.remove("active");
  }

  toggleView() {
    if (this.isListView) {
      this.plantsGrid.classList.add("hidden");
      this.plantsList.classList.remove("hidden");
      this.plantsList.classList.add("list-view");
    } else {
      this.plantsGrid.classList.remove("hidden");
      this.plantsList.classList.add("hidden");
      this.plantsList.classList.remove("list-view");
    }

    this.renderPlants();
  }

  handleFilterClick(event) {
    const button = event.currentTarget;
    const filterType = button.dataset.filter;
    const filterValue = button.dataset.value;
    const isActive = button.classList.contains("active");

    if (isActive) {
      button.classList.remove("active");
      this.filters[filterType] = null;
    } else {
      document
        .querySelectorAll(`[data-filter="${filterType}"]`)
        .forEach((btn) => {
          btn.classList.remove("active");
        });
      button.classList.add("active");
      this.filters[filterType] = filterValue;
    }

    if (filterType === "pets" && filterValue === "false") {
      this.filters.sun = null;
      this.filters.water = null;
      document
        .querySelectorAll('[data-filter="sun"], [data-filter="water"]')
        .forEach((btn) => {
          btn.classList.remove("active");
        });
    }

    this.applyFilters();
  }

  applyFilters() {
    let results = [...this.plants];

    if (this.filters.sun) {
      results = results.filter((plant) => plant.sun === this.filters.sun);
    }

    if (this.filters.water) {
      results = results.filter((plant) => plant.water === this.filters.water);
    }

    if (this.filters.pets === "false") {
      results = results.filter((plant) => plant.toxicity === false);
    } else if (this.filters.pets === "true") {
      results = results.filter((plant) => plant.toxicity === true);
    }

    this.filteredPlants = results;
    this.updateStats();
    this.sortPlants();
  }

  sortPlants() {
    const sortBy = this.sortSelect.value;

    switch (sortBy) {
      case "name":
        this.filteredPlants.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "price-low":
        this.filteredPlants.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        this.filteredPlants.sort((a, b) => b.price - a.price);
        break;
    }

    this.renderPlants();
  }

  clearFilters() {
    this.filters = { sun: null, water: null, pets: null };
    this.filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.filteredPlants = [...this.plants];
    this.updateStats();
    this.renderAllPlants();
  }

  updateStats() {
    this.filteredPlantsCount.textContent = this.filteredPlants.length;
  }

  renderAllPlants() {
    this.filteredPlants = [...this.plants];
    this.updateStats();
    this.renderPlants();
  }

  renderPlants() {
    if (this.filteredPlants.length === 0) {
      this.plantsGrid.innerHTML = "";
      this.plantsList.innerHTML = "";
      this.noResults.style.display = "block";
      return;
    }

    this.noResults.style.display = "none";

    const gridHTML = this.filteredPlants
      .map((plant) => this.createPlantCard(plant, "grid"))
      .join("");
    const listHTML = this.filteredPlants
      .map((plant) => this.createPlantCard(plant, "list"))
      .join("");

    this.plantsGrid.innerHTML = gridHTML;
    this.plantsList.innerHTML = listHTML;
  }

  createPlantCard(plant, viewType) {
    const t = translations[this.currentLang];
    const imageName = plant.url.split("/").pop();
    const localPath = `images/plant photos/${imageName}`;

    const sunIcon = plant.sun === "no" ? "no-sun.svg" : "low-sun.svg";
    const waterIcon =
      plant.water === "daily"
        ? "3-drops.svg"
        : plant.water === "regularly"
          ? "two-drops.svg"
          : "1-drop.svg";
    const petIcon = plant.toxicity ? "toxic.svg" : "pet.svg";

    const sunLabel =
      plant.sun === "high" ? t.high : plant.sun === "low" ? t.low : t.none;
    const waterLabel =
      plant.water === "daily"
        ? t.daily
        : plant.water === "regularly"
          ? t.regular
          : t.rare;
    const petLabel = plant.toxicity ? t.toxicToPets : t.petSafe;

    return `
            <div class="plant-card">
                ${plant.staff_favorite ? `<div class="plant-badge">${t.staffFavorite}</div>` : ""}
                <img src="${localPath}" alt="${plant.name}" class="plant-image" onerror="this.src='images/illustrations/pick.png'">
                <div class="plant-info">
                    <div class="plant-header">
                        <h3 class="plant-name">${plant.name}</h3>
                        <span class="plant-price">$${plant.price}</span>
                    </div>
                    <div class="plant-icons">
                        <div class="icon-wrapper">
                            <img src="images/icons/${petIcon}" alt="${petLabel}"> 
                            <span class="icon-label">${petLabel}</span>
                        </div>
                        <div class="icon-wrapper">
                            <img src="images/icons/${sunIcon}" alt="${sunLabel}">
                            <span class="icon-label">${sunLabel}</span>
                        </div>
                        <div class="icon-wrapper">
                            <img src="images/icons/${waterIcon}" alt="${waterLabel}">
                            <span class="icon-label">${waterLabel}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new PlantFinder();
});
