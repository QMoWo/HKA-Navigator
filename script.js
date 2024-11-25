function openPopup(id) {
    document.getElementById(id).style.display = 'flex';
  }
  
  function closePopup(id) {
    document.getElementById(id).style.display = 'none';
  }

  function confirmAndOpen(url) {
    const userConfirmed = confirm("Stelle sicher, dass du im WLan 'Eduroam' oder 'HKA-WLan' verbunden bist");
    if (userConfirmed) {
      window.open(url)
    }
  }

document.querySelector(".darkmode img").addEventListener("click", () => {
  const body = document.body;
  const darkModeIcon = document.querySelector(".darkmode img");

  // Umschalten des Dark Modes
  body.classList.toggle("dark-mode");

  // Bild wechseln
  if (body.classList.contains("dark-mode")) {
      darkModeIcon.src = "assets/sun-regular (1).svg"; // Bild für den "Lichtmodus"
      darkModeIcon.alt = "lightmode_logo";
  } else {
      darkModeIcon.src = "assets/moon-solid.svg"; // Bild für den "Dunkelmodus"
      darkModeIcon.alt = "darkmode_logo";
  }
});

// Dark Mode Status beim Laden prüfen
window.addEventListener("load", () => {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  const body = document.body;
  const darkModeIcon = document.querySelector(".darkmode img");

  if (isDarkMode) {
      body.classList.add("dark-mode");
      darkModeIcon.src = "assets/sun-regular (1).svg";
      darkModeIcon.alt = "lightmode_logo";
  }
});

// Status im localStorage speichern
document.querySelector(".darkmode img").addEventListener("click", () => {
  const body = document.body;
  const isDarkMode = body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", isDarkMode);
});

function addToFavorites(button) {
  const linkWrapper = button.parentElement;

  // Favorisierten Link klonen
  const favoriteLink = linkWrapper.cloneNode(true);

  // Favoriten-Button im Klon ersetzen mit "Entfernen"-Button
  const favoriteButton = favoriteLink.querySelector('.favorite-btn');
  if (favoriteButton) {
      favoriteButton.textContent = 'Entfernen';
      favoriteButton.onclick = function () {
          removeFromFavorites(this, linkWrapper);
      };
  }

  // Favoritenbereich abrufen und hinzufügen
  const favoritesPopup = document.getElementById('popup7').querySelector('.popup-content');
  favoritesPopup.appendChild(favoriteLink);

  // Ursprünglichen Button deaktivieren
  button.textContent = 'Bereits Favorisiert';
  button.disabled = true;
  button.classList.add('disabled');
  linkWrapper.dataset.isFavorited = 'true'; // Markiere als favorisiert
}

function removeFromFavorites(button, originalWrapper) {
  // Entfernt den Link aus dem Favoritenbereich
  const linkWrapper = button.parentElement;
  linkWrapper.remove();

  // Original-Button wieder aktivieren
  if (originalWrapper) {
    const originalButton = originalWrapper.querySelector('.favorite-btn');
    if (originalButton) {
        originalButton.textContent = 'Favorisieren';
        originalButton.disabled = false;
        originalButton.classList.remove('disabled');
        delete originalWrapper.dataset.isFavorited; // Markierung entfernen
    }
}
}

function saveFavorites() {
  const favoritesPopup = document.getElementById('popup7').querySelector('.popup-content');
  const favorites = Array.from(favoritesPopup.children).map(wrapper => {
      return {
          imgSrc: wrapper.querySelector('img').src,
          label: wrapper.querySelector('p').textContent
      };
  });
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadFavorites() {
  const favoritesPopup = document.getElementById('popup7').querySelector('.popup-content');
  const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

  savedFavorites.forEach(favorite => {
      const linkWrapper = document.createElement('div');
      linkWrapper.classList.add('link-wrapper');

      const img = document.createElement('img');
      img.src = favorite.imgSrc;
      img.classList.add('link-image');

      const label = document.createElement('p');
      label.textContent = favorite.label;
      label.classList.add('link-label');

      const removeButton = document.createElement('button');
      removeButton.classList.add('favorite-btn');
      removeButton.textContent = 'Entfernen';
      removeButton.onclick = function () {
          removeFromFavorites(removeButton);
      };

      linkWrapper.appendChild(img);
      linkWrapper.appendChild(label);
      linkWrapper.appendChild(removeButton);

      favoritesPopup.appendChild(linkWrapper);
  });
}

// Beim Laden der Seite Favoriten aus dem lokalen Speicher laden
window.onload = loadFavorites;

// Beim Schließen der Seite Favoriten speichern
window.addEventListener('beforeunload', saveFavorites);