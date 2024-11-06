// Function to display a single country's details
function displayCountryDetails(country) {
  const allitemsContainer = document.getElementById("allitems"); 
  const countryCard = document.createElement("div");
  countryCard.classList.add("country-details"); 
  const countryName = document.createElement("h2");
  countryName.textContent = country.name.common;

  const flag = document.createElement("img");
  flag.src = country.flags.png;
  flag.alt = `${country.name.common} flag`;
  flag.width = 150;

  const region = document.createElement("p");
  region.textContent = `Region: ${country.region}`;

  const population = document.createElement("p");
  population.textContent = `Population: ${country.population.toLocaleString()}`;
  const capital = document.createElement("p");
  capital.textContent = `Capital: ${country.capital ? country.capital[0] : "N/A"}`;
  const tld = document.createElement("p");
  tld.textContent = `Top Level Domain: ${country.tld ? country.tld.join(", ") : "N/A"}`;
  const area = document.createElement("p");
  area.textContent = `Area: ${country.area ? country.area.toLocaleString() + " km²" : "N/A"}`;
  const languages = document.createElement("p");
  const languageNames = country.languages ? Object.values(country.languages).join(", ") : "N/A";
  languages.textContent = `Languages: ${languageNames}`;
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-btn")
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    deleteCountry(country.name.common); 
  });
  countryCard.appendChild(flag);
  countryCard.appendChild(countryName);
  countryCard.appendChild(region);
  countryCard.appendChild(population);
  countryCard.appendChild(capital);
  countryCard.appendChild(tld)
  countryCard.appendChild(area)
  countryCard.appendChild(languages)
  countryCard.appendChild(deleteButton);
  allitemsContainer.appendChild(countryCard);
}
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
