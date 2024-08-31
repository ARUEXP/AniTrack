let animeList = [];

// Function to add anime to the list
function addAnime() {
  const name = document.getElementById('anime-name').value;
  const status = document.getElementById('anime-status').value;

  if (name.trim() === '') {
    alert('Please enter an anime name.');
    return;
  }

  const anime = {
    name: name,
    status: status,
  };

  animeList.push(anime);
  renderList();
  clearForm();
}

// Function to clear the form after adding anime
function clearForm() {
  document.getElementById('anime-name').value = '';
  document.getElementById('anime-status').value = 'Plan to Watch';
}

// Function to render the anime list
function renderList() {
  const listElement = document.getElementById('anime-list');
  listElement.innerHTML = '';

  animeList.forEach((anime, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `${anime.name} - ${anime.status} 
            <button onclick="deleteAnime(${index})">Delete</button>`;
    listElement.appendChild(listItem);
  });
}

// Function to delete an anime from the list
function deleteAnime(index) {
  animeList.splice(index, 1);
  renderList();
}

// Function to generate a shareable link with the anime data
function generateLink() {
  const dataString = encodeURIComponent(JSON.stringify(animeList));
  const url = `${window.location.origin}${window.location.pathname}?data=${dataString}`;
  document.getElementById('share-link').value = url;
}

// Function to load data from the URL
function loadDataFromURL() {
  const params = new URLSearchParams(window.location.search);
  if (params.has('data')) {
    const dataString = params.get('data');
    try {
      animeList = JSON.parse(decodeURIComponent(dataString));
      renderList();
    } catch (e) {
      console.error('Failed to parse anime data from URL', e);
    }
  }
}

// Load data when the page loads
window.onload = loadDataFromURL;
