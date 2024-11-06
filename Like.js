// Function to display a single country's details
function displayCountryDetails(country) {
  const allitemsContainer = document.getElementById("allitems"); // Correct the element reference

  // Create a container for each country's details
  const countryCard = document.createElement("div");
  countryCard.classList.add("country-details"); // Add a class for styling

  // Create country name element
  const countryName = document.createElement("h2");
  countryName.textContent = country.name.common;

  // Create country flag element
  const flag = document.createElement("img");
  flag.src = country.flags.png;
  flag.alt = `${country.name.common} flag`; // Corrected template literal
  flag.width = 150;

  // Create region element
  const region = document.createElement("p");
  region.textContent = `Region: ${country.region}`;

  // Create population element
  const population = document.createElement("p");
  population.textContent = `Population: ${country.population.toLocaleString()}`;

  // Create capital element
  const capital = document.createElement("p");
  capital.textContent = `Capital: ${country.capital ? country.capital[0] : "N/A"}`;
  // Top Level Domain (TLD)
  const tld = document.createElement("p");
  tld.textContent = `Top Level Domain: ${country.tld ? country.tld.join(", ") : "N/A"}`;

  // Area
  const area = document.createElement("p");
  area.textContent = `Area: ${country.area ? country.area.toLocaleString() + " km²" : "N/A"}`;

  // Languages
  const languages = document.createElement("p");
  const languageNames = country.languages ? Object.values(country.languages).join(", ") : "N/A";
  languages.textContent = `Languages: ${languageNames}`;

  // Create a delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn")
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteCountry(country.name.common);  // Call delete function when clicked
  });

  // Append the details to the country card
  countryCard.appendChild(flag);
  countryCard.appendChild(countryName);
  countryCard.appendChild(region);
  countryCard.appendChild(population);
  countryCard.appendChild(capital);
  countryCard.appendChild(tld)
  countryCard.appendChild(area)
  countryCard.appendChild(languages)
  countryCard.appendChild(deleteButton);

  // Append the country card to the allitems container
  allitemsContainer.appendChild(countryCard);
}

// Function to delete a country from the liked countries
function deleteCountry(countryName) {
  // Retrieve existing liked countries
  let likedCountries = JSON.parse(localStorage.getItem("likedCountries")) || [];

  // Filter out the country to be deleted
  likedCountries = likedCountries.filter(c => c.name.common !== countryName);

  // Update local storage
  localStorage.setItem("likedCountries", JSON.stringify(likedCountries));

  // Refresh the displayed list
  refreshCountryList();
}

// Function to refresh the displayed list of liked countries
function refreshCountryList() {
  const allitemsContainer = document.getElementById("allitems");
  allitemsContainer.innerHTML = ""; // Clear existing list

  const likedCountries = JSON.parse(localStorage.getItem("likedCountries")) || []; // Retrieve liked countries

  likedCountries.forEach(country => {
    displayCountryDetails(country); // Display details for each liked country
  });
}

// Event listener for the back button
document.getElementById("back-button").addEventListener("click", () => {
  window.history.back(); // Go back to the previous page
});

// Retrieve country data on page load
document.addEventListener("DOMContentLoaded", () => {
  refreshCountryList(); // Display the liked countries when the page loads
});
