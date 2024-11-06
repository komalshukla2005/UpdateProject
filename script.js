const countryList = document.getElementById("country-list");
const searchInput = document.getElementById("search");
const regionFilter = document.getElementById("region-filter");
const languageFilter = document.getElementById("language-filter");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const favoriteButton = document.getElementsByClassName("Favorite")[0]; 

let countries = [];
let filteredCountries = [];
let currentPage = 1;
const countriesPerPage = 10;

// Fetch countries data from API
async function fetchCountries() {
    try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        countries = await response.json();
        filteredCountries = countries;
        displayCountries();
    } catch (error) {
        console.error("Error fetching countries:", error);
    }
}

// Display countries on the page
function displayCountries() {
    const start = (currentPage - 1) * countriesPerPage;
    const end = currentPage * countriesPerPage;
    const countriesToDisplay = filteredCountries.slice(start, end);

    countryList.innerHTML = ""; // Clear the list before displaying new countries

    countriesToDisplay.forEach(country => {
        const countryCard = document.createElement("div");
        countryCard.className = "country-card";
        countryCard.innerHTML = `
            <img src="${country.flags.png}" alt="${country.name.common} flag" />
            <h2>${country.name.common}</h2>
        `;
        countryCard.addEventListener("click", () => {
            viewCountryDetails(country.name.common);
        });

        countryList.appendChild(countryCard);
    });
    updatePaginationButtons();
}
// Update pagination buttons (Next/Previous)
function updatePaginationButtons() {
    const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
    // Disable "Previous" button if on the first page
    if (currentPage === 1) {
        prevButton.disabled = true;
    } else {
        prevButton.disabled = false;
    }
    // Disable "Next" button if on the last page
    if (currentPage === totalPages) {
        nextButton.disabled = true;
    } else {
        nextButton.disabled = false;
    }
}
// Navigate to next page
function nextPage() {
    const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayCountries();
    }
}
// Navigate to previous page
function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayCountries();
    }
}
// Filter countries based on search, region, and language
function filterCountries() {
    const searchValue = searchInput.value.toLowerCase();
    const selectedRegion = regionFilter.value;
    const selectedLanguage = languageFilter.value;

    filteredCountries = countries.filter(country => {
        const matchesSearch = country.name.common.toLowerCase().includes(searchValue);
        const matchesRegion = selectedRegion === "all" || country.region === selectedRegion;
                const matchesLanguage = selectedLanguage === "all" || country.languages && Object.values(country.languages).includes(selectedLanguage);
    
        return matchesSearch && matchesRegion && matchesLanguage;
    });

    currentPage = 1; 
    displayCountries();
}
// View country details
function viewCountryDetails(countryName) {
    const country = countries.find(c => c.name.common === countryName);
    localStorage.setItem("selectedCountry", JSON.stringify(country)); 
    window.location.href = "country-details.html"; 
}
// Event listener for the "Favorite" button
favoriteButton.addEventListener("click", () => {
    window.location.href = "Like.html"; // Navigate to the Like.html page
});
// Event listeners for the search, region, language filters, and pagination buttons
searchInput.addEventListener("input", filterCountries);
regionFilter.addEventListener("change", filterCountries);
languageFilter.addEventListener("change", filterCountries);
nextButton.addEventListener("click", nextPage);
prevButton.addEventListener("click", previousPage);

// Fetch countries on page load
fetchCountries();
