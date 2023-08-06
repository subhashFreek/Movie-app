const showPage = (page) => {
    document.querySelectorAll('.page').forEach((p) => {
      p.style.display = 'none';
    });
    console.log(page);
    document.getElementById(page).style.display = 'block';
  };
  
  const handleNavigation = (e) => {
    e.preventDefault();
    const page = e.target.getAttribute('href');
    showPage(page);
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', handleNavigation);
    });
  
    // Show the login page by default
    showPage('login.html');
  });
  
  // Function to make API calls to the backend
  const fetchFromBackend = async (url, method, body) => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json'
      };
      if (token) {
        headers['Authorization'] = token;
      }
  
      const response = await fetch(`http://localhost:3000${url}`, {
        method,
        headers,
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (err) {
      console.error(err);
    }
  };
  
  // Login Form Submission
  document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const userData = { email, password };
    try {
      const user = await fetchFromBackend('/users/login', 'POST', userData);
      // Handle the response here (e.g., show success message, update UI)
      console.log(user);
      localStorage.setItem('token', user.data.token);

    // Redirect to the search page after successful login
        showPage('search.html');
    } catch (err) {
      console.error(err);
    }
  });

    // Signup Form Submission
    document.getElementById('signupForm')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const userData = { email, password };
        try {
        const user = await fetchFromBackend('/users/register', 'POST', userData);
        // Handle the response here (e.g., show success message, update UI)
        console.log(user);
        showPage('login.html');
        } catch (err) {
        console.error(err);
        }
    });

  
  // Movie Search Form Submission
  document.getElementById('movieSearchForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = document.getElementById('search').value;
    try {
      const movies = await fetchFromBackend(`/movies/search?name=${searchTerm}&page=1`, 'GET');
      // Handle the response here (e.g., update UI with movie list)
      console.log(movies);
      if (movies.Response === "True") {
        displaySearchResults(movies.Search);
      } else {
        console.log('No results found.');
      }
    } catch (err) {
      console.error(err);
    }
  });
  
  // Playlist Form Submission
  document.getElementById('playlistForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const playlistName = document.getElementById('playlistName').value;
    const isPublic = document.querySelector('input[name="publicPlaylist"]:checked').value === 'true';
    const playlistData = { name: playlistName, public: isPublic };
    try {
      const playlist = await fetchFromBackend('/playlists', 'POST', playlistData);
      // Handle the response here (e.g., show success message, update UI)
      console.log(playlist);
    } catch (err) {
      console.error(err);
    }
  });
  
  // Function to fetch and display playlist items
  const fetchPlaylistItems = async (playlistId) => {
    try {
      const playlist = await fetchFromBackend(`/playlists/${playlistId}`, 'GET');
      const playlistItems = playlist.items;
  
      const playlistItemsList = document.getElementById('playlistItems');
      playlistItemsList.innerHTML = '';
  
      playlistItems.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item.title;
        playlistItemsList.appendChild(li);
      });
  
      // Show the playlist page
      showPage('playlist.html');
    } catch (err) {
      console.error(err);
    }
  };
  
  // Event listener for the 'View Playlist' link
  document.getElementById('viewPlaylist')?.addEventListener('click', (e) => {
    e.preventDefault();
    const playlistId = e.target.getAttribute('data-id');
    fetchPlaylistItems(playlistId);
  });

  // Function to display search results on the page
const displaySearchResults = (movies) => {
    const movieList = document.getElementById('movieList');
    movieList.innerHTML = '';
  
    movies.forEach((movie) => {
      const movieItem = document.createElement('div');
      movieItem.classList.add('movie-item');
  
      const movieTitle = document.createElement('h2');
      movieTitle.textContent = movie.Title;
  
      const movieYear = document.createElement('p');
      movieYear.textContent = `Year: ${movie.Year}`;
  
      const moviePoster = document.createElement('img');
      moviePoster.src = movie.Poster;
      moviePoster.alt = movie.Title;
  
      movieItem.appendChild(movieTitle);
      movieItem.appendChild(movieYear);
      movieItem.appendChild(moviePoster);
  
      movieList.appendChild(movieItem);
    });
    showPage('search.html');
  

  };
  