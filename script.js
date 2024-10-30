let allCountries = [];
let currentPage = 1;
const countriesPerPage = 10;

async function fetchCountries() {
    const response = await fetch('https://restcountries.com/v3.1/all');
    allCountries = await response.json();
    displayCountries(allCountries);
    populateFilters();
    
    // Add search input event listener
    document.getElementById('search').addEventListener('input', searchCountries);
}

function displayCountries(countries) {
    const countryList = document.getElementById('country-list');
    countryList.innerHTML = '';

    const start = (currentPage - 1) * countriesPerPage;
    const end = start + countriesPerPage;
    const paginatedCountries = countries.slice(start, end);

    paginatedCountries.forEach(country => {
        const card = document.createElement('div');
        card.className = 'country-card';
        card.innerHTML = `
            <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
            <h3>${country.name.common}</h3>
        `;
        card.addEventListener('click', () => viewCountryDetails(country));
        countryList.appendChild(card);
    });

    document.getElementById('show-more').style.display = currentPage * countriesPerPage < countries.length ? 'block' : 'none';
}

function searchCountries() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    
    // Filter countries based on the search term
    const filteredCountries = allCountries.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm)
    );

    currentPage = 1; // Reset to first page
    displayCountries(filteredCountries);
}

function viewCountryDetails(country) {
    // Redirect to the country detail page with query parameters
    const queryParams = new URLSearchParams({
        name: country.name.common,
        flag: country.flags.svg,
        domain: country.tld.join(', '),
        capital: country.capital,
        region: country.region,
        population: country.population.toLocaleString(),
        area: country.area.toLocaleString(),
        languages: Object.values(country.languages).join(', ')
    }).toString();

    window.location.href = `country-detail.html?${queryParams}`;
}

document.getElementById('show-more').addEventListener('click', () => {
    currentPage++;
    displayCountries(allCountries);
});

function populateFilters() {
    const languageFilter = document.getElementById('language-filter');
    const regionFilter = document.getElementById('region-filter');

    const languages = new Set();
    const regions = new Set();

    allCountries.forEach(country => {
        if (country.languages) {
            for (const lang of Object.values(country.languages)) {
                languages.add(lang);
            }
        }
        regions.add(country.region);
    });

    languages.forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = lang;
        languageFilter.appendChild(option);
    });

    regions.forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionFilter.appendChild(option);
    });
}

document.getElementById('language-filter').addEventListener('change', filterCountries);
document.getElementById('region-filter').addEventListener('change', filterCountries);

function filterCountries() {
    const language = document.getElementById('language-filter').value;
    const region = document.getElementById('region-filter').value;

    const filteredCountries = allCountries.filter(country => {
        const matchesLanguage = language ? Object.values(country.languages).includes(language) : true;
        const matchesRegion = region ? country.region === region : true;
        return matchesLanguage && matchesRegion;
    });

    currentPage = 1; // Reset to first page
    displayCountries(filteredCountries);
}

const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

document.getElementById('favorites-button').addEventListener('click', () => {
    const modal = document.getElementById('favorites-modal');
    modal.style.display = 'block';
    updateFavorites();
});

// Close the modal when the close button is clicked
document.querySelector('.close-button').addEventListener('click', () => {
    document.getElementById('favorites-modal').style.display = 'none';
});

// Close the modal when clicking outside of the modal content
window.addEventListener('click', (event) => {
    const modal = document.getElementById('favorites-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function toggleFavorite() {
    const countryName = document.getElementById('detail-name').textContent;

    const isFavorite = favorites.includes(countryName);
    if (isFavorite) {
        const index = favorites.indexOf(countryName);
        favorites.splice(index, 1);
    } else if (favorites.length < 5) {
        favorites.push(countryName);
    } else {
        alert("You can only have up to 5 favorites.");
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavorites();
}

function updateFavorites() {
    const favoritesList = document.getElementById('favorites-list');
    favoritesList.innerHTML = '';
    
    if (favorites.length > 0) {
        favorites.forEach(favorite => {
            const listItem = document.createElement('li');
            listItem.textContent = favorite;
            favoritesList.appendChild(listItem);
        });
    } else {
        const listItem = document.createElement('li');
        listItem.textContent = "No favorites added.";
        favoritesList.appendChild(listItem);
    }
}

// Initial fetch
fetchCountries();
