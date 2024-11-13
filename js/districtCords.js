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

    if (data && data.length > 0) {
      // Get the first result that matches the search
      const { geojson, display_name } = data[0];

      // Check if GeoJSON data is available
      if (geojson && geojson.type === 'Polygon') {
        // Extract the coordinates (this will be an array of arrays of [lng, lat] pairs)
        const coordinates = geojson.coordinates[0].map(coord => ({
          lat: coord[1],
          lng: coord[0]
        }));

        console.log(`Coordinates for ${display_name}:`, coordinates);
        return coordinates;
      } else {
        console.error('No polygon data available for the specified district.');
        return null;
      }
    } else {
      console.error('No results found for the specified district.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    return null;
  }
}

// Example usage:
// getDistrictCoordinates('Centro', 'Barueri');
// getDistrictCoordinates('Jardim California', 'Barueri');

export { getDistrictCoordinates };
