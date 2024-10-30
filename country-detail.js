window.onload = function() {
    // Get query parameters from the URL
    const params = new URLSearchParams(window.location.search);

    // Retrieve country details from query parameters
    const countryName = params.get('name');
    const countryFlag = params.get('flag');
    const countryDomain = params.get('domain');
    const countryCapital = params.get('capital');
    const countryRegion = params.get('region');
    const countryPopulation = params.get('population');
    const countryArea = params.get('area');
    const countryLanguages = params.get('languages');

    // Debugging logs to verify the data
    console.log('Country Name:', countryName);
    console.log('Flag URL:', countryFlag);
    console.log('Domain:', countryDomain);
    console.log('Capital:', countryCapital);
    console.log('Region:', countryRegion);
    console.log('Population:', countryPopulation);
    console.log('Area:', countryArea);
    console.log('Languages:', countryLanguages);

    // Populate the HTML elements with country details, check if values are non-null
    if (countryName) document.getElementById('country-name').innerText = countryName;
    if (countryFlag) document.getElementById('country-flag').src = countryFlag;
    if (countryDomain) document.getElementById('country-domain').innerText = countryDomain;
    if (countryCapital) document.getElementById('country-capital').innerText = countryCapital;
    if (countryRegion) document.getElementById('country-region').innerText = countryRegion;
    if (countryPopulation) document.getElementById('country-population').innerText = countryPopulation;
    if (countryArea) document.getElementById('country-area').innerText = countryArea;
    if (countryLanguages) document.getElementById('country-languages').innerText = countryLanguages;

    // Add functionality to the favorite button
    document.getElementById('favorite-button').addEventListener('click', function() {
        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

        if (favorites.length < 5 && !favorites.includes(countryName)) {
            favorites.push(countryName);
            localStorage.setItem('favorites', JSON.stringify(favorites));
            alert(`${countryName} added to favorites!`);
        } else if (favorites.includes(countryName)) {
            alert(`${countryName} is already in your favorites.`);
        } else {
            alert('You can only have up to 5 favorites.');
        }
    });

    // Back link functionality
    document.getElementById('back-link').addEventListener('click', function() {
        window.history.back(); // Go back to the previous page
    });
};
