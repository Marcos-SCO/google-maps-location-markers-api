function drawDashedLine(map, coords) {
  
  // Create a polyline with a dashed line
  const dashedLine = new google.maps.Polyline({
    path: coords,
    strokeColor: "#FF0000",  // Line color (red in this case)
    strokeOpacity: .2,
    strokeWeight: 0,
    icons: [{
      icon: {
        path: google.maps.SymbolPath.CIRCLE,  // Circle for dashed pattern
        strokeColor: "#FF0000", // Same as line color
        fillColor: "#FF0000",   // Same as line color
        fillOpacity: 1,
        scale: 1,               // Dash size
        strokeWeight: .3
      },
      offset: '0',             // Starting point of dashes
      repeat: '5px'           // Repeat every 10px to make it a dashed line
    }]
  });

  dashedLine.setMap(map);  // Add polyline to the map
}

function drawBoundDashedLines(map, markerPositions) {
  const bounds = new google.maps.LatLngBounds();

  // Extend bounds to include all marker positions
  markerPositions.forEach(pos => {
    bounds.extend(new google.maps.LatLng(pos.lat, pos.lng));
  });

  const ne = bounds.getNorthEast();  // North-East corner
  const sw = bounds.getSouthWest();  // South-West corner

  // Define the coordinates for the dashed line (edges of the bounds)
  const coords = [
    { lat: sw.lat(), lng: sw.lng() },  // SW corner
    { lat: ne.lat(), lng: sw.lng() },  // Bottom-left to top-left
    { lat: ne.lat(), lng: ne.lng() },  // Top-left to top-right
    { lat: sw.lat(), lng: ne.lng() },  // Top-right to bottom-right
    { lat: sw.lat(), lng: sw.lng() }   // Bottom-right to bottom-left (closing the loop)
  ];

  drawDashedLine(map, coords);
}


export { drawDashedLine, drawBoundDashedLines }