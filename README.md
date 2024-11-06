# Country Explorer

A web application that allows users to search for and explore information about countries around the world. Built with a focus on clean design, usability, and responsiveness.

## Description

Country Explorer is a tool designed to provide users with comprehensive information about countries worldwide. Users can explore details such as population, area, languages, and more. The app allows users to favorite countries and filter results by language or region, making it a comprehensive tool for learning about countries.

## Usage

Upon opening the application, users will be presented with a landing page featuring a list of countries represented as interactive cards. Users can:

- **Search** for countries using the search bar at the top, which provides real-time search suggestions on webpage.
- **Click** on country cards to view detailed information about each country.
- **Filter** countries by language or region using dropdowns.
- **Favorite** countries by clicking the heart icon, which saves them in local storage for future reference.

The app is fully responsive and works well on all screen sizes.

## Features

- **Country Cards**: Interactive cards displaying the name, flag, population, and region of each country.
- **Pagination**: Load more countries with a "Show More" button to view additional countries on each page.

- **Details Page**: A dedicated page showing comprehensive information about each country, including population, area, languages, etc.
- **Filtering**: Filter countries by region and language to narrow down search results.
- **Favorites**: Users can favorite countries, which are saved in local storage (up to 5 countries).
- **Responsive Design**: The application is fully responsive and adjusts to fit all screen sizes, including mobile devices.

## Design Decisions

- **User Experience**: Focused on creating an intuitive and clean layout to ensure easy navigation and a pleasant user experience.
- **Responsiveness**: Used CSS media queries to make sure the app works across various screen sizes, from mobile phones to large desktops.
- **Code Structure**: Organized the code into reusable functions and modules for maintainability and scalability.
- **Error Handling**: Added robust error handling to handle failed API requests and display appropriate error messages when the user enters an empty search query.

## Known Issues

During development, I encountered an issue where the data was not displaying correctly on the next page of results when using pagination. Here's a summary of the issue and how I resolved it:

- **Description**: Pagination was not working as expected, and the next page of countries was not loading.
- **Cause**: The issue was caused by incorrect pagination parameters in the API request, which prevented the fetching of the next set of countries.
- **Solution**:
  - Corrected the pagination logic by ensuring the API request includes the correct parameters for the next page.
  - Improved state management to track the current page number.
  - Added error handling to display meaningful messages when pagination fails or when no data is returned.

After these changes, the pagination now works as intended, allowing users to load additional countries smoothly.

## Future Improvements

- **Improved Search**: Implementing a more sophisticated search system (e.g., fuzzy matching) for better results when users type country names.
- **More Filters**: Adding additional filters (e.g., population range, capital city) to further narrow down search results.
