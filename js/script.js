// ========== CONFIGURATION ==========
const API_KEY = "e69bf4cdf5d3dbc4af33ec8c85494fc0";
const BASE_URL = "https://api.themoviedb.org/3";
const IMG_URL = "https://image.tmdb.org/t/p/w500";

// ========== DOM ELEMENTS ==========
const movieContainer = document.getElementById("movies");
const searchInput = document.getElementById("searchInput");
const navButtons = document.querySelectorAll(".nav-btn");
const modalElement = document.getElementById("modal");
const favoritesModal = document.getElementById("favoritesModal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");
const closeFavoritesModalBtn = document.getElementById("closeFavoritesModal");
const loader = document.getElementById("loader");
const noResults = document.getElementById("noResults");
const sectionTitle = document.getElementById("sectionTitle");
const heroSection = document.getElementById("heroSection");
const favoritesList = document.getElementById("favoritesList");
const noFavorites = document.getElementById("noFavorites");
const favoritesBtn = document.querySelector(".favorites-btn");
const toast = document.getElementById("toast");
const fav_count = document.querySelector(".fav-count");

// ========== STATE MANAGEMENT ==========
let currentCategory = "popular";
let favorites = JSON.parse(localStorage.getItem("filmfinder_favorites")) || [];
let currentMovieDetails = null;

// ========== INITIALIZATION ==========
document.addEventListener("DOMContentLoaded", () => {
  loadMovies("popular");
  loadFavorites();
  attachEventListeners();
});

// ========== EVENT LISTENERS ==========
function attachEventListeners() {
  // Navigation buttons
  navButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (e.target.classList.contains("favorites-btn")) {
        openFavoritesModal();
        return;
      }
      navButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const category = btn.dataset.category;
      currentCategory = category;
      searchInput.value = "";
      loadMovies(category);
    });
  });

  // Search functionality
  searchInput.addEventListener("keyup", debounce(() => {
    const query = searchInput.value.trim();
    if (query) {
      searchMovies(query);
    } else {
      loadMovies(currentCategory);
      navButtons.forEach((b) => b.classList.remove("active"));
      navButtons[0].classList.add("active");
      currentCategory = "popular";
    }
  }, 500));

  // Modal closing
  closeModalBtn.addEventListener("click", () => closeModal());
  closeFavoritesModalBtn.addEventListener("click", () => closeFavoritesModal());
  
  modalElement.addEventListener("click", (e) => {
    if (e.target === modalElement) closeModal();
  });

  favoritesModal.addEventListener("click", (e) => {
    if (e.target === favoritesModal) closeFavoritesModal();
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModal();
      closeFavoritesModal();
    }
  });

  // Favorites button
  favoritesBtn.addEventListener("click", openFavoritesModal);
}

// ========== API CALLS ==========
async function loadMovies(category) {
  showLoader(true);
  noResults.style.display = "none";

  try {
    const url = `${BASE_URL}/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      // Update section title
      const titles = {
        popular: "Popular Movies",
        top_rated: "Top Rated Movies",
        upcoming: "Upcoming Movies",
      };
      sectionTitle.textContent = titles[category] || "Movies";

      displayHeroMovie(data.results[0]);
      displayMovies(data.results);
    } else {
      noResults.style.display = "block";
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    showToast("Failed to load movies. Please check your API key.", "error");
    noResults.style.display = "block";
  } finally {
    showLoader(false);
  }
}

async function searchMovies(query) {
  showLoader(true);
  noResults.style.display = "none";
  heroSection.style.display = "none";

  try {
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
      query
    )}&language=en-US&page=1`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      sectionTitle.textContent = `Search Results for "${query}"`;
      displayMovies(data.results);
    } else {
      noResults.style.display = "block";
    }
  } catch (error) {
    console.error("Error searching movies:", error);
    showToast("Failed to search movies. Please try again.", "error");
    noResults.style.display = "block";
  } finally {
    showLoader(false);
  }
}

// ========== DISPLAY FUNCTIONS ==========
function displayHeroMovie(movie) {
  if (!movie.poster_path) return;

  const heroImage = document.getElementById("heroImage");
  const heroTitle = document.getElementById("heroTitle");
  const heroRating = document.getElementById("heroRating");
  const heroOverview = document.getElementById("heroOverview");
  const heroFavBtn = document.getElementById("heroFavBtn");

  heroImage.src = IMG_URL + movie.poster_path;
  heroTitle.textContent = movie.title;
  heroRating.textContent = movie.vote_average.toFixed(1);
  heroOverview.textContent = movie.overview || "No description available.";

  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  heroFavBtn.innerHTML = isFavorite ? '<i class="fas fa-heart"></i> Remove from Favorites' : '<i class="far fa-heart"></i> Add to Favorites';
  heroFavBtn.classList.toggle("favorited", isFavorite);

  heroFavBtn.onclick = () => {
    toggleFavorite(movie);
    const isFav = favorites.some((fav) => fav.id === movie.id);
    heroFavBtn.innerHTML = isFav ? '<i class="fas fa-heart"></i> Remove from Favorites' : '<i class="far fa-heart"></i> Add to Favorites';
    heroFavBtn.classList.toggle("favorited", isFav);
  };

  heroSection.style.display = "block";
}

function displayMovies(movies) {
  movieContainer.innerHTML = "";

  movies.forEach((movie, index) => {
    if (!movie.poster_path) return;

    const card = document.createElement("div");
    card.classList.add("movie-card");
    card.style.animationDelay = `${index * 0.05}s`;

    const isFavorite = favorites.some((fav) => fav.id === movie.id);
    const year = new Date(movie.release_date).getFullYear() || "N/A";

    card.innerHTML = `
      <div class="movie-card-image">
        <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}" />
        <div class="movie-card-overlay"></div>
        <button class="movie-card-icon" data-movie-id="${movie.id}" title="Add to favorites">
          ${isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>'}
        </button>
      </div>
      <div class="movie-info">
        <h3 class="movie-title">${movie.title}</h3>
        <div class="movie-meta">
          <span class="movie-rating"><i class="fas fa-star"></i> ${movie.vote_average.toFixed(1)}</span>
          <span class="movie-year">${year}</span>
        </div>
      </div>
    `;

    // Movie card click to show details
    card.addEventListener("click", (e) => {
      if (e.target.closest(".movie-card-icon")) {
        e.stopPropagation();
        return;
      }
      showMovieDetails(movie);
    });

    // Favorite button
    const favIcon = card.querySelector(".movie-card-icon");
    favIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(movie);
      updateFavIcon(favIcon, movie.id);
    });

    movieContainer.appendChild(card);
  });
}

function showMovieDetails(movie) {
  currentMovieDetails = movie;
  const isFavorite = favorites.some((fav) => fav.id === movie.id);
  const year = new Date(movie.release_date).getFullYear() || "N/A";

  modalBody.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 2rem; align-items: flex-start;">
      <div style="position: relative;">
        <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}" 
             style="width: 100%; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />
      </div>
      <div>
        <h2 style="margin-bottom: 1rem;">${movie.title}</h2>
        
        <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 1.5rem;">
          <span style="background: var(--primary-color); padding: 0.5rem 1rem; border-radius: 8px; font-weight: 600;">
            <i class=\"fas fa-star\"></i> ${movie.vote_average.toFixed(1)}/10
          </span>
          <span style="color: var(--text-muted);">${movie.vote_count.toLocaleString()} votes</span>
        </div>

        <div style="margin-bottom: 1.5rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: rgba(99, 102, 241, 0.1); padding: 1.5rem; border-radius: 8px;">
          <div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.3rem;">Release Date</p>
            <p style="font-weight: 600;">${movie.release_date || "N/A"}</p>
          </div>
          <div>
            <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.3rem;">Language</p>
            <p style="font-weight: 600;">${movie.original_language.toUpperCase()}</p>
          </div>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 0.5rem;">Synopsis</p>
          <p style="line-height: 1.7; color: var(--text-secondary);">${
            movie.overview || "No description available."
          }</p>
        </div>
      </div>
    </div>
  `;

  const modalFavBtn = document.getElementById("modalFavBtn");
  modalFavBtn.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
  modalFavBtn.classList.toggle("favorited", isFavorite);
  modalFavBtn.onclick = () => {
    toggleFavorite(movie);
    modalFavBtn.innerHTML = favorites.some((fav) => fav.id === movie.id) ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
    modalFavBtn.classList.toggle("favorited", favorites.some((fav) => fav.id === movie.id));
  };

  openModal();
}

// ========== FAVORITES MANAGEMENT ==========
function toggleFavorite(movie) {
  const index = favorites.findIndex((fav) => fav.id === movie.id);

  if (index > -1) {
    favorites.splice(index, 1);
    showToast(`"${movie.title}" removed from favorites`);
  } else {
    favorites.push(movie);
    showToast(`"${movie.title}" added to favorites!`);
  }

  saveFavorites();
  updateFavCount();
}

function saveFavorites() {
  localStorage.setItem("filmfinder_favorites", JSON.stringify(favorites));
}

function loadFavorites() {
  favorites = JSON.parse(localStorage.getItem("filmfinder_favorites")) || [];
  updateFavCount();
}

function updateFavCount() {
  fav_count.textContent = favorites.length;
}

function updateFavIcon(icon, movieId) {
  const isFavorite = favorites.some((fav) => fav.id === movieId);
  icon.innerHTML = isFavorite ? '<i class="fas fa-heart"></i>' : '<i class="far fa-heart"></i>';
}

function displayFavorites() {
  if (favorites.length === 0) {
    favoritesList.innerHTML = "";
    noFavorites.style.display = "block";
  } else {
    noFavorites.style.display = "none";
    favoritesList.innerHTML = "";
    favorites.forEach((movie, index) => {
      if (!movie.poster_path) return;

      const card = document.createElement("div");
      card.classList.add("movie-card");
      card.style.animationDelay = `${index * 0.05}s`;

      card.innerHTML = `
        <div class="movie-card-image">
          <img src="${IMG_URL}${movie.poster_path}" alt="${movie.title}" />
          <div class="movie-card-overlay"></div>
          <button class="movie-card-icon" title="Remove from favorites">
            <i class="fas fa-heart"></i>
          </button>
        </div>
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <div class="movie-meta">
            <span class="movie-rating"><i class="fas fa-star"></i> ${movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      `;

      const favIcon = card.querySelector(".movie-card-icon");
      favIcon.addEventListener("click", (e) => {
        e.stopPropagation();
        toggleFavorite(movie);
        updateFavIcon(favIcon, movie.id);
        displayFavorites(); // Refresh the display
      });

      card.addEventListener("click", () => showMovieDetails(movie));
      favoritesList.appendChild(card);
    });
  }
}

// ========== MODAL FUNCTIONS ==========
function openModal() {
  modalElement.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalElement.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function openFavoritesModal() {
  displayFavorites();
  favoritesModal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeFavoritesModal() {
  favoritesModal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

// ========== UTILITY FUNCTIONS ==========
function showLoader(show) {
  loader.style.display = show ? "flex" : "none";
}

function showToast(message, type = "success") {
  toast.textContent = message;
  toast.className = "toast show";

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}
