// Function to display country details and add the Like heart icon
function displayCountryDetails(country) {
  const countryDetailsContainer = document.querySelector(".country-details"); // Corrected line
  
  // Clear existing details
  countryDetailsContainer.innerHTML = "";

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

  // Append elements to the container
  countryDetailsContainer.appendChild(flag);
  countryDetailsContainer.appendChild(countryName);
  countryDetailsContainer.appendChild(region);
  countryDetailsContainer.appendChild(population);
  countryDetailsContainer.appendChild(capital);
  countryDetailsContainer.appendChild(tld); // Appending TLD
  countryDetailsContainer.appendChild(area); // Appending Area
  countryDetailsContainer.appendChild(languages); // Appending Languages

  // Dynamically create the heart icon (Like functionality)
  const likeIcon = document.createElement("i");
  likeIcon.classList.add("fa-solid", "fa-heart"); // Add FontAwesome heart icon classes
  likeIcon.style.fontSize = "30px"; // Optional: Set the size of the icon
  likeIcon.style.cursor = "pointer"; // Change the cursor to pointer when hovering over the icon

  // Add the like icon after the Languages section
  countryDetailsContainer.appendChild(likeIcon);

  // Add event listener for the heart icon
  likeIcon.addEventListener("click", () => {
    console.log("Heart icon clicked!");  // Debugging
    // Toggle the 'liked' class to change the color to red when clicked
    likeIcon.classList.toggle("liked");
    
    // Add the country to favorites
    AddToFavorites(country);
  });
}

// Event listener for the back button
document.getElementById("back-button").addEventListener("click", () => {
  window.history.back(); // Go back to the previous page
});

// Retrieve country data on page load
document.addEventListener("DOMContentLoaded", () => {
  const countryData = JSON.parse(localStorage.getItem("selectedCountry")); // Retrieve country data
  console.log(countryData);  // Debugging step
  
  if (countryData) {
    displayCountryDetails(countryData);  // Display details for the selected country
  } else {
    console.error("No country data found in localStorage.");
  }
});

// Function to add the country to the favorites (localStorage)
function AddToFavorites(country) {
  // Retrieve existing liked countries or initialize an empty array
  const likedCountries = JSON.parse(localStorage.getItem("likedCountries")) || [];

  // Check if the user has reached the limit of 5 favorites
  if (likedCountries.length >= 5) {
    alert("You can only favorite up to 5 countries. Redirecting to favorites page.");
    // window.location.href = "Like.html"; 
    // Navigate to the favorites page
    return; // Exit without adding the new country
  }

  // Check if the country is already liked
  if (likedCountries.some(c => c.name.common === country.name.common)) {
    alert(`${country.name.common} is already in your favorites!`);
    return; // Exit if country is already a favorite
  }

  // Add the new country to the array
  likedCountries.push(country);

  // Save the updated list back to localStorage
  localStorage.setItem("likedCountries", JSON.stringify(likedCountries)); 

  alert(`${country.name.common} has been added to your favorites!`);
  // window.location.href = "Like.html";
   // Navigate to the favorites page
}
