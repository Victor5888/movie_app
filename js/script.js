const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: '1',
    totalPages: '1',
    totalResults: 0,
  },
};

// display movie details
async function displayMovieDetails() {
  const movieId = window.location.search.split('=')[1];
  const movie = await fetchAPIData(`movie/${movieId}`);

  // overlay for background image

  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = ` <div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
            class="card-img-top"
            alt="${movie.title}"
          />`
              : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${movie.title}"
        />`
          }
          </div>
          <div>
            <h2>${movie?.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
            ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie?.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movie.genres
                .map(
                  (genre) => `<li>${genre.name}
                </li>`
                )
                .join('')}
            </ul>
            <a href="#" target="_blank" class="btn">${movie.homepage}</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span>$${movie.budget}</li>
            <li><span class="text-secondary">Revenue:</span>$${
              movie.revenue
            }</li>
            <li><span class="text-secondary">Runtime:</span>${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${movie.production_companies
            .map((company) => `<span>${company.name} </span>`)
            .join('')}
          
          </div>
        </div>`;

  document.querySelector('#movie-details').appendChild(div);
}

//display TV show details
async function displayShowDetails() {
  const showId = window.location.search.split('=')[1];
  const show = await fetchAPIData(`tv/${showId}`);

  // overlay for background image

  displayBackgroundImage('show', show.backdrop_path);

  const div = document.createElement('div');
  div.innerHTML = ` <div class="details-top">
          <div>
          ${
            show.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w500${show.poster_path}"
            class="card-img-top"
            alt="${show.name}"
          />`
              : `<img
          src="../images/no-image.jpg"
          class="card-img-top"
          alt="${show.name}"
        />`
          }
          </div>
          <div>
            <h2>${show?.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
            ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.release_date}</p>
            <p>
              ${show?.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres
                .map(
                  (genre) => `<li>${genre.name}
                </li>`
                )
                .join('')}
            </ul>
            <a href="#" target="_blank" class="btn">${show.homepage}</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>${show.overview}</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span>$${show.budget}</li>
            <li><span class="text-secondary">Revenue:</span>$${
              show.revenue
            }</li>
            <li><span class="text-secondary">Runtime:</span>${
              show.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">
          ${show.production_companies
            .map((company) => `<span>${company.name} </span>`)
            .join('')}
          
          </div>
        </div>`;

  document.querySelector('#show-details').appendChild(div);
}

// Display 20 most popular moviesss
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
          <a href="movie-details.html?id=${movie.id}">
            ${
              movie.poster_path
                ? `<img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
                : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
          />`
            }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `;

    document.querySelector('#popular-movies').appendChild(div);
  });
}

//displaying most popular tv shows

async function displayTvShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    const div = document.createElement('div');
    div.classList.add('card');

    div.innerHTML = `
    <div class="card">
          <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
              ? `<img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"`
              : `<img
              src="../images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />
          </a>`
          }
          
            
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
        </div>

    `;

    document.querySelector('#popular-shows').appendChild(div);
  });
}

//display backdrop on details page

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;

  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zindex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

async function search() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    showAlert('success', 'alert-success');
    // make request and then display results
    const { results, total_pages, page, total_results } = await searchApiData();
    showSpinner();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    results.forEach((res) => {
      hideSpinner();
      const div = document.createElement('div');

      div.classList.add('card');

      div.innerHTML = `
      
            <a href="${global.search.type}-details.html?id=${res.id}">
               ${
                 res.poster_path
                   ? `<img
              src="https://image.tmdb.org/t/p/w500${res.poster_path}"
              class="card-img-top"
              alt="${res.title}"
            />`
                   : `<img
            src="../images/no-image.jpg"
            class="card-img-top"
            alt="${res.title}"
          />`
               }
            </a>
            <div class="card-body">
              <h5 class="card-title">${
                global.search.type === 'movie' ? res.title : res.name
              }</h5>
              <p class="card-text">
                <small class="text-muted">Release:${
                  global.search.type === 'movie'
                    ? res.release_date
                    : res.first_air_date
                } </small>
              </p>
            </div>
          
      `;

      document.querySelector(
        '#search-results-heading'
      ).innerHTML = `<h2>${results.length} of ${global.search.totalPages} of results</h2>`;

      document.querySelector('#search-results').appendChild(div);
    });
  } else {
    showAlert('please enter a keyword', 'alert');
  }
}

// display slider movies
async function displaySlider() {
  const { results } = await fetchAPIData('movie/now_playing');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = ` 
            <a href="movie-details.html?id=${movie.id} class=" height">
              <img src=https://image.tmdb.org/t/p/w500${movie.poster_path} alt="${movie.title}"  />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
            </h4>
          `;

    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: { slidesPerView: 2 },
      700: { slidesPerView: 3 },
      1200: { slidesPerView: 4 },
    },
  });
}

// Fetch data from TMDB API
async function fetchAPIData(endpoint) {
  // Register your key at https://www.themoviedb.org/settings/api and enter here
  // Only use this for development or very small projects. You should store your key and make requests from a servers
  const API_KEY = 'd929d789d20178123a1eab28fff9bce4';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  showSpinner();
  const data = await response.json();
  hideSpinner();
  return data;
}

async function searchApiData() {
  const API_KEY = 'd929d789d20178123a1eab28fff9bce4';
  const API_URL = 'https://api.themoviedb.org/3/';
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
  );
  showSpinner();
  const data = await response.json();
  hideSpinner();
  return data;
}

// this is the function to display the spinner while fetching the data

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

// Highlight active link
function highlightActiveLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

//show alert
function showAlert(message, className) {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(message));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
}

// Init App
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySlider();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayTvShows();
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/tv-details.html':
      displayShowDetails();
      break;
    case '/search.html':
      search();
      break;
  }

  highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
