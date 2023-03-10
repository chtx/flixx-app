const global = {
  currentPage: window.location.pathname,
  search: {
    term: '',
    type: '',
    page: 1,
    totalPages: 1,
    totalResults: 0,
  },
  api: {
    apiKey: '2321948e151dbe9c30c8c933a0090846',
    apiUrl: 'https://api.themoviedb.org/3/',
  },
};

//fetches 20 most popular movies
const displayPopularMovies = async () => {
  const { results } = await fetchAPIData('movie/popular');
  const popularMoviesGrid = document.querySelector('#popular-movies');
  results.forEach((movie) => {
    const divCard = document.createElement('div');
    divCard.className = 'card';
    const a = document.createElement('a');
    a.href = `movie-details.html?id=${movie.id}`;
    const img = document.createElement('img');
    img.className = 'card-img-top';
    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : './images/no-image.jpg';
    img.setAttribute('src', posterPath);
    img.setAttribute('alt', movie.title);
    const divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    const title = movie.original_title;
    const p = document.createElement('p');
    p.className = 'card-text';
    const small = document.createElement('small');
    small.className = 'text-muted';
    const release = `Release: ${movie.release_date}`;

    divCard.appendChild(a);
    a.appendChild(img);
    divCard.appendChild(divCardBody);
    divCardBody.appendChild(h5);
    h5.appendChild(document.createTextNode(title));
    divCardBody.appendChild(p);
    p.appendChild(small);
    small.appendChild(document.createTextNode(release));

    popularMoviesGrid.appendChild(divCard);
  });
};

//fetches 20 most popular tv shows
const displayPopularShows = async () => {
  const { results } = await fetchAPIData('tv/popular');
  const popularShowsGrid = document.querySelector('#popular-shows');
  results.forEach((show) => {
    const divCard = document.createElement('div');
    divCard.className = 'card';
    const a = document.createElement('a');
    a.href = `tv-details.html?id=${show.id}`;
    const img = document.createElement('img');
    img.className = 'card-img-top';
    const posterPath = show.poster_path
      ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
      : './images/no-image.jpg';
    img.setAttribute('src', posterPath);
    img.setAttribute('alt', show.name);
    const divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    const title = show.name;
    const p = document.createElement('p');
    p.className = 'card-text';
    const small = document.createElement('small');
    small.className = 'text-muted';
    const release = `Aired: ${show.first_air_date}`;

    divCard.appendChild(a);
    a.appendChild(img);
    divCard.appendChild(divCardBody);
    divCardBody.appendChild(h5);
    h5.appendChild(document.createTextNode(title));
    divCardBody.appendChild(p);
    p.appendChild(small);
    small.appendChild(document.createTextNode(release));

    popularShowsGrid.appendChild(divCard);
  });
};

const displayMovieDetails = async () => {
  const movieDetailsContainer = document.querySelector('#movie-details');
  const id = window.location.search.substring(4);

  const movie = await fetchAPIData(`movie/${id}`);

  //Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.createElement('div');
  const posterPath = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : './images/no-image.jpg';

  const genres = movie.genres.map((el) => `<li>${el.name}</li>`);
  const budget =
    movie.budget === 0 ? 'No Data' : `$ ${addCommasToNumber(movie.budget)}`;
  const reveue =
    movie.revenue === 0 ? 'No Data' : `$ ${addCommasToNumber(movie.revenue)}`;
  const companies = movie.production_companies.map((el) => el.name);

  div.innerHTML = `
  <div class="details-top">
    <div>
      <img src="${posterPath}" class="card-img-top" alt="${movie.title}">
    </div>
    <div>
      <h2>${movie.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${movie.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie.release_date}</p>
      <p>
      ${movie.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${genres.join('')}
      </ul>
      <a href="${
        movie.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> ${budget}</li>
      <li><span class="text-secondary">Revenue:</span> ${reveue}</li>
      <li><span class="text-secondary">Runtime:</span> ${
        movie.runtime
      } minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">${companies.join(', ')}</div>
  </div>`;

  movieDetailsContainer.appendChild(div);
};

const displayShowDetails = async () => {
  const showDetailsContainer = document.querySelector('#show-details');
  const id = window.location.search.substring(4);

  const show = await fetchAPIData(`tv/${id}`);

  //Overlay for background image
  displayBackgroundImage('show', show.backdrop_path);

  const div = document.createElement('div');
  const posterPath = show.poster_path
    ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
    : './images/no-image.jpg';

  const genres = show.genres.map((el) => `<li>${el.name}</li>`);
  const companies = show.production_companies.map((el) => el.name);

  div.innerHTML = `
  <div class="details-top">
    <div>
      <img src="${posterPath}" class="card-img-top" alt="${show.name}">
    </div>
    <div>
      <h2>${show.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${show.vote_average.toFixed(1)} / 10
      </p>
      <p class="text-muted">First Aired: ${show.first_air_date}</p>
      <p>
      ${show.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
        ${genres.join('')}
      </ul>
      <a href="${
        show.homepage
      }" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${companies.join(', ')}</div>
        </div>`;

  showDetailsContainer.appendChild(div);
};

const displayBackgroundImage = (type, bgPath) => {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${bgPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
};

const addCommasToNumber = (number) =>
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const displaySliderMovies = async () => {
  const { results } = await fetchAPIData('movie/now_playing');
  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');
    div.innerHTML = `
    <div class="swiper-slide">
    <a href="movie-details.html?id=${movie.id}">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
    </a>
    <h4 class="swiper-rating">
      <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
    </h4>
    </div>
    `;
    document.querySelector('.swiper-wrapper').appendChild(div);
    initSwiper();
  });
};

const initSwiper = () => {
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
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
};

const search = async () => {
  const queryString = document.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get('type');
  global.search.term = urlParams.get('search-term');

  if (global.search.term !== '' && global.search.term !== null) {
    const { results, total_pages, page, total_results } = await searchAPIData();

    global.search.page = page;
    global.search.totalPages = total_pages;
    global.search.totalResults = total_results;

    console.log(results, total_pages, page, total_results);
    if (results.length === 0) {
      showAlert('No results found');
      return;
    }

    displaySearchResults(results);
    document.querySelector('#search-term').value = '';
  } else {
    showAlert('Enter a search term');
  }
};

const displaySearchResults = (results) => {
  results.forEach((result) => {
    const divCard = document.createElement('div');
    divCard.className = 'card';
    const a = document.createElement('a');
    a.href = `${global.search.type}-details.html?id=${result.id}`;
    const img = document.createElement('img');
    img.className = 'card-img-top';
    const posterPath = result.poster_path
      ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
      : './images/no-image.jpg';
    img.setAttribute('src', posterPath);
    img.setAttribute(
      'alt',
      global.search.type === 'movie' ? result.title : result.name
    );
    const divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    const title = global.search.type === 'movie' ? result.title : result.name;
    const p = document.createElement('p');
    p.className = 'card-text';
    const small = document.createElement('small');
    small.className = 'text-muted';
    const release =
      global.search.type === 'movie'
        ? `Release: ${result.release_date}`
        : `First Aired: ${result.first_air_date}`;

    divCard.appendChild(a);
    a.appendChild(img);
    divCard.appendChild(divCardBody);
    divCardBody.appendChild(h5);
    h5.appendChild(document.createTextNode(title));
    divCardBody.appendChild(p);
    p.appendChild(small);
    small.appendChild(document.createTextNode(release));

    document.querySelector(
      '#search-results-heading'
    ).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for "${global.search.term}"</h2>`;

    document.querySelector('#search-results').appendChild(divCard);
  });

  displayPagination();
};

const displayPagination = () => {
  const div = document.createElement('div');
  div.classList.add('pagination');
  div.innerHTML = `
  <button class="btn btn-primary" id="prev">Prev</button>
  <button class="btn btn-primary" id="next">Next</button>
  <div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>
  `;

  document.querySelector('#pagination').appendChild(div);

  //Disable prev / next button if on first / last page
  if (global.search.page === 1) {
    document.querySelector('#prev').disabled = true;
  }
  if (global.search.page === global.search.totalPages) {
    document.querySelector('#next').disabled = true;
  }
  //Next page:
  document.querySelector('#next').addEventListener('click', nextPage);
  //Prev page:
  document.querySelector('#prev').addEventListener('click', prevPage);
};

const nextPage = () => {
  clearCurrentResults();
  global.search.page++;
  search();
};
const prevPage = () => {
  clearCurrentResults();
  global.search.page--;
  search();
};
const clearCurrentResults = () => {
  document.querySelector('#search-results').innerHTML = '';
  document.querySelector('#pagination').innerHTML = '';
};

const showAlert = (msg, className) => {
  const alertEl = document.createElement('div');
  alertEl.classList.add('alert', className);
  alertEl.appendChild(document.createTextNode(msg));
  document.querySelector('#alert').appendChild(alertEl);

  setTimeout(() => alertEl.remove(), 3000);
};

//Fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  try {
    //query string:
    showSpinner();
    const response = await fetch(
      `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
    );
    const data = await response.json();
    hideSpinner();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

//Fetch data from TMDB API
const searchAPIData = async () => {
  const API_KEY = global.api.apiKey;
  const API_URL = global.api.apiUrl;
  try {
    //query string:
    showSpinner();
    const response = await fetch(
      `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
    );
    const data = await response.json();
    hideSpinner();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

const showSpinner = () => {
  document.querySelector('.spinner').classList.add('show');
};

const hideSpinner = () => {
  document.querySelector('.spinner').classList.remove('show');
};

const highlightActiveLink = () => {
  document.querySelectorAll('.nav-link').forEach((el) => {
    if (el.getAttribute('href') === global.currentPage) {
      el.classList.add('active');
    }
  });
};

const init = () => {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displaySliderMovies();
      displayPopularMovies();
      break;
    case '/shows.html':
      displayPopularShows();
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
};

document.addEventListener('DOMContentLoaded', init);
