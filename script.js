
// function to get user location
var x = document.getElementById("map");
function getLocation()
  {
  if (navigator.geolocation)
    {
    navigator.geolocation.getCurrentPosition(initAutocomplete,showError);
    }
  else{x.innerHTML="Geolocation is not supported by this browser.";}
  }

  function showError(error)
  {
  switch(error.code) 
    {
    case error.PERMISSION_DENIED:
      x.innerHTML="User denied the request for Geolocation."
      break;
    case error.POSITION_UNAVAILABLE:
      x.innerHTML="Location information is unavailable."
      break;
    case error.TIMEOUT:
      x.innerHTML="The request to get user location timed out."
      break;
    case error.UNKNOWN_ERROR:
      x.innerHTML="An unknown error occurred."
      break;
    }
   }

   // code to search 
function initAutocomplete(position) {
  var lat=position.coords.latitude;
  var lon=position.coords.longitude;
  const map = new google.maps.Map(document.getElementById("map"), {
  center: { lat: lat, lng: lon },
  zoom: 15,
  mapTypeId: "roadmap",
    });
    
    // Create the search box and link it to the UI element.
    var input = document.getElementById("pac-input"); 
    input.value = 'hospital'   
    const searchBox = new google.maps.places.SearchBox(input); 
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
 
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
          searchBox.setBounds(map.getBounds());
    });
    let marker = [];

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
          const places = searchBox.getPlaces();
    if (places.length == 0) {
            return;
      }
      // Clear out the old markers.
      marker.forEach((marker) => {
            marker.setMap(null);
      });
      marker = [];
      
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
              url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        // Create a marker for each place.
        markers.push(
              new google.maps.Marker({
              map,
              icon,
              title: place.name,
              position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
              // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
              bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
}
