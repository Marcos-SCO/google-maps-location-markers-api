import { barueriTouristicLocationMarkers } from './markers.js';

window.initMap = function initMap() {
  const googleMapElement = document.querySelector('[data-js="google-map"]');
  if (!googleMapElement) return;

  const iconMarkerImage = '';

  const centerMap = { lat: -23.50239213242458, lng: -46.87863477329331 };

  const mapStyles = [
    {
      "featureType": "poi.business",  // Target business points of interest
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"  // Set visibility to "off" to hide it
        }
      ]
    },
    {
      "featureType": "poi",  // Specifically show POI (Points of Interest) icons
      "elementType": "geometry",
      "stylers": [
        {
          "visibility": "off"  // Hide POI geometry
        }
      ]
    },
  ];

  const mapOptions = {
    center: centerMap,
    zoom: 12,
    disableDefaultUI: true,
    styles: mapStyles
    // mapId: '6c69da475e7f7301'
  };

  const map = new google.maps.Map(googleMapElement, mapOptions);

  const bounds = new google.maps.LatLngBounds();

  if (!barueriTouristicLocationMarkers) return;

  const infoWindow = new google.maps.InfoWindow({
    minWidth: 210,
    maxWidth: 210,
  });

  barueriTouristicLocationMarkers.forEach((location) => {

    // Create custom content for each marker
    const content = document.createElement("div");
    content.classList.add("marker-content");
    content.innerHTML = `
      <h3>${location.name}</h3>
      <address>
        <p>${location.description}</p>
        <small>${location.address}</small>
        <small>${location.cep}</small>
      </address>
      `;


    // const marker = new google.maps.marker.AdvancedMarkerElement({
    const marker = new google.maps.Marker({
      map: map,
      position: { lat: location.lat, lng: location.lng },
      content: content,
      title: location.name,
      animation: google.maps.Animation.DROP,
      // animation: google.maps.Animation.BOUNCE,
      icon: iconMarkerImage,
    });

    google.maps.event.addListener(marker, "click", function () {
      infoWindow.setContent(content);
      infoWindow.open(map, marker);
    });

    bounds.extend(new google.maps.LatLng(location.lat, location.lng));

    // Listen for close click event on InfoWindow
    google.maps.event.addListener(infoWindow, 'closeclick', function () {
      map.fitBounds(bounds);
    });

  });

  map.fitBounds(bounds);

  // Close all info windows when clicking on the map (outside of any InfoWindow)
  google.maps.event.addListener(map, "click", function () {
    infoWindow.close();
    map.fitBounds(bounds);
  });

};
