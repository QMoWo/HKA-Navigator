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

const events = JSON.parse(localStorage.getItem("events")) || [];

// Darkmode Umschalten
document.querySelector(".ui-switch input").addEventListener("change", (event) => {
  const body = document.body;

  // Umschalten des Dark Modes
  body.classList.toggle("dark-mode", event.target.checked);

  // Status im localStorage speichern
  localStorage.setItem("darkMode", event.target.checked);
});

// Dark Mode Status beim Laden prüfen
window.addEventListener("load", () => {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  const body = document.body;
  const slider = document.querySelector(".ui-switch input");

  if (isDarkMode) {
    body.classList.add("dark-mode");
    slider.checked = true;
  }
});




// function addToFavorites(button) {
//   const linkWrapper = button.parentElement;

//   // Favorisierten Link klonen
//   const favoriteLink = linkWrapper.cloneNode(true);

//   // Favoriten-Button im Klon ersetzen mit "Entfernen"-Button
//   const favoriteButton = favoriteLink.querySelector('.favorite-btn');
//   if (favoriteButton) {
//       favoriteButton.textContent = 'Entfernen';
//       favoriteButton.onclick = function () {
//           removeFromFavorites(this, linkWrapper);
//       };
//   }

//   // Favoritenbereich abrufen und hinzufügen
//   const favoritesPopup = document.getElementById('popup7').querySelector('.popup-content');
//   favoritesPopup.appendChild(favoriteLink);

//   // Ursprünglichen Button deaktivieren
//   button.textContent = 'Bereits Favorisiert';
//   button.disabled = true;
//   button.classList.add('disabled');
//   linkWrapper.dataset.isFavorited = 'true'; // Markiere als favorisiert

// }

// function removeFromFavorites(button, originalWrapper) {
//   // Entfernt den Link aus dem Favoritenbereich
//   const linkWrapper = button.parentElement;
//   linkWrapper.remove();

//   // Original-Button wieder aktivieren
//   if (originalWrapper) {
//     const originalButton = originalWrapper.querySelector('.favorite-btn');
//     if (originalButton) {
//         originalButton.textContent = 'Favorisieren';
//         originalButton.disabled = false;
//         originalButton.classList.remove('disabled');
//         delete originalWrapper.dataset.isFavorited; // Markierung entfernen
//     }
// }
  
// }

// function saveFavorites() {
//   const favoritesPopup = document.getElementById('popup7').querySelector('.popup-content');
//   const favorites = Array.from(favoritesPopup.children).map(wrapper => {
//       return {
//           imgSrc: wrapper.querySelector('img').src,
//           label: wrapper.querySelector('p').textContent
//       };
//   });
//   localStorage.setItem('favorites', JSON.stringify(favorites));
// }

// function loadFavorites() {
//   const favoritesPopup = document.getElementById('popup7').querySelector('.popup-content');
//   const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

//   savedFavorites.forEach(favorite => {
//       const linkWrapper = document.createElement('div');
//       linkWrapper.classList.add('link-wrapper');

//       const img = document.createElement('img');
//       img.src = favorite.imgSrc;
//       img.classList.add('link-image');

//       const label = document.createElement('p');
//       label.textContent = favorite.label;
//       label.classList.add('link-label');

//       const removeButton = document.createElement('button');
//       removeButton.classList.add('favorite-btn');
//       removeButton.textContent = 'Entfernen';
//       removeButton.onclick = function () {
//           removeFromFavorites(removeButton);
//       };

//       linkWrapper.appendChild(img);
//       linkWrapper.appendChild(label);
//       linkWrapper.appendChild(removeButton);

//       favoritesPopup.appendChild(linkWrapper);
//   });
// }










function addToFavorites(button) {
  const wrapper = button.closest('.link-wrapper');
  const label = wrapper.querySelector('.link-label').innerText;
  const imgSrc = wrapper.querySelector('img').src;
  const url = wrapper.querySelector('img').onclick.toString().match(/'(.*?)'/)[1];

  const popup = document.querySelector('#popup7 .popup-content');

  // Prüfen ob schon vorhanden
  const alreadyExists = [...popup.querySelectorAll('.link-label')]
      .some(p => p.innerText === label);
  
  if (alreadyExists) {
      removeFromFavoritesByLabel(label);
      button.innerText = "Favorisieren";
      return;
  }

  const newWrapper = document.createElement('div');
  newWrapper.className = 'link-wrapper';
  newWrapper.innerHTML = `
      <img src="${imgSrc}" class="link-image" onclick="window.open('${url}')">
      <p class="link-label">${label}</p>
      <button class="favorite-btn" onclick="removeFromFavorites(this)">Entfernen</button>
  `;
  popup.appendChild(newWrapper);

  button.innerText = "Entfernen";
  saveFavorites();
}

function removeFromFavorites(button) {
  const wrapper = button.closest('.link-wrapper');
  wrapper.remove();
  saveFavorites();
}

function removeFromFavoritesByLabel(label) {
  const popup = document.querySelector('#popup7 .popup-content');
  const items = popup.querySelectorAll('.link-wrapper');
  items.forEach(item => {
      if (item.querySelector('.link-label').innerText === label) {
          item.remove();
      }
  });
  saveFavorites();
}

function saveFavorites() {
  const popup = document.querySelector('#popup7 .popup-content');
  const favorites = [...popup.querySelectorAll('.link-wrapper')].map(wrapper => {
      return {
          label: wrapper.querySelector('.link-label').innerText,
          imgSrc: wrapper.querySelector('img').src,
          url: wrapper.querySelector('img').onclick.toString().match(/'(.*?)'/)[1]
      };
  });
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function loadFavorites() {
  const popup = document.querySelector('#popup7 .popup-content');
  popup.innerHTML = '<span class="close-button" onclick="closePopup(\'popup7\')">&times;</span>';
  const saved = JSON.parse(localStorage.getItem('favorites')) || [];

  saved.forEach(fav => {
      const wrapper = document.createElement('div');
      wrapper.className = 'link-wrapper';
      wrapper.innerHTML = `
          <img src="${fav.imgSrc}" class="link-image" onclick="window.open('${fav.url}')">
          <p class="link-label">${fav.label}</p>
          <button class="favorite-btn" onclick="removeFromFavorites(this)">Entfernen</button>
      `;
      popup.appendChild(wrapper);
  });
}




















function addLink() {
  const nameInput = document.querySelector('.link-name');
  const urlInput = document.querySelector('.link-url');
  const name = nameInput.value.trim();
  const url = urlInput.value.trim();

  if (name && url) {
      const storedLinks = JSON.parse(localStorage.getItem('ownLinks')) || [];
      const newLink = { name, url };
      storedLinks.push(newLink);
      localStorage.setItem('ownLinks', JSON.stringify(storedLinks));

      displayOwnLinks();
      nameInput.value = '';
      urlInput.value = '';
  } else {
      alert('Bitte sowohl Name als auch URL eingeben.');
  }
}

function displayOwnLinks() {
  const container = document.getElementById('own-links-container');
  const storedLinks = JSON.parse(localStorage.getItem('ownLinks')) || [];
  container.innerHTML = ''; // Vorherige Inhalte entfernen

  storedLinks.forEach((link, index) => {
      const linkElement = document.createElement('div');
      linkElement.classList.add('link-wrapper');

      linkElement.innerHTML = `
          <img src="assets/plus-solid.svg" alt="${link.name}" class="link-image" onclick="window.open('${link.url}')">
          <p class="link-label">${link.name}</p>
          <button class="remove-btn" onclick="removeOwnLink(${index})">Entfernen</button>
      `;

      container.appendChild(linkElement);
  });
}

function removeOwnLink(index) {
  const storedLinks = JSON.parse(localStorage.getItem('ownLinks'));
  storedLinks.splice(index, 1);
  localStorage.setItem('ownLinks', JSON.stringify(storedLinks));
  displayOwnLinks();
}

// Funktion, um einen neuen Termin hinzuzufügen
function addEvent() {
  const title = document.getElementById("event-title").value.trim();
  const date = document.getElementById("event-date").value;

  if (title && date) {
      events.push({ title, date });
      localStorage.setItem("events", JSON.stringify(events));
      renderCalendar();
  } else {
      alert("Bitte Titel und Datum eingeben.");
  }
}

// Kalender-Rendering
function renderCalendar() {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = ""; // Clear previous content

  const today = new Date().toISOString().split("T")[0];
  const sortedEvents = events.sort((a, b) => new Date(a.date) - new Date(b.date));

  sortedEvents.forEach(event => {
      const eventElement = document.createElement("div");
      eventElement.classList.add("event-item");

      eventElement.innerHTML = `
          <strong>${event.date === today ? "Heute:" : event.date}</strong> - ${event.title}
          <button onclick="removeEvent('${event.date}', '${event.title}')">Entfernen</button>
      `;

      calendar.appendChild(eventElement);
  });
}

// Termin entfernen
function removeEvent(date, title) {
  const index = events.findIndex(event => event.date === date && event.title === title);
  if (index > -1) {
      events.splice(index, 1);
      localStorage.setItem("events", JSON.stringify(events));
      renderCalendar();
  }
}

function toggle(){
  const calendar = document.getElementById("calendar-container");
  calendar.classList.toggle("hide");
}

// Beim Laden der Seite alle Daten laden
window.onload = function () {
  displayOwnLinks();
  loadFavorites();
  renderCalendar();
};

// Beim Schließen der Seite Synchronisation sicherstellen
window.addEventListener('beforeunload', () => {
  saveFavorites(); // Favoriten speichern
  const storedLinks = JSON.parse(localStorage.getItem('ownLinks')) || [];
  localStorage.setItem('ownLinks', JSON.stringify(storedLinks));
});