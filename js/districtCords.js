async function getDistrictCoordinates(districtName, cityName) {
  const baseUrl = 'https://nominatim.openstreetmap.org/search';
  const query = encodeURIComponent(`${districtName}, ${cityName}`);
  const url = `${baseUrl}?format=json&q=${query}&polygon_geojson=1`;

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'YourAppName', // Include a user-agent header
      }
    });

    const data = await response.json();

    // Get the first result that matches the search
    if (!data || data.length < 0) {
      console.error('No results found for the specified district.');
      return null;
    }

    const { geojson, display_name } = data[0];

    // Check if GeoJSON data is available
    const polygonGeoCoords = geojson && geojson.type === 'Polygon';

    if (!polygonGeoCoords) {
      console.error('No polygon data available for the specified district.');
      return null;
    }

    // Extract the coordinates (this will be an array of arrays of [lng, lat] pairs)
    const coordinates = geojson.coordinates[0].map(coord => ({
      lat: coord[1],
      lng: coord[0]
    }));

    console.log(`Coordinates for ${display_name}:`, coordinates);
    return coordinates;

  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
}

// Example usage:
// getDistrictCoordinates('Centro', 'Barueri');
// getDistrictCoordinates('Jardim California', 'Barueri');

export { getDistrictCoordinates };
