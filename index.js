import storeList from "./Store.js";
const map = L.map("map").setView([22.9074872, 79.07306671], 5);
const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Coded by Raja Muhamad Asim with ❤️';
const tileLayer = L.tileLayer(tileUrl, { attribution });
tileLayer.addTo(map);

function makePopupContent(shop) {
  return `
    <div>
        <h4>${shop.properties.name}</h4>
        <p>${shop.properties.address}</p>
        <div class="phone-number">
            <a href="tel:${shop.properties.phone}">${shop.properties.phone}</a>
        </div>
    </div>
  `;
}

function onEachFeature(feature, layer) {
  layer.on("click", () => {
    // document.querySelector(".modal").classList.add("show");

    const h1 = document.querySelector(".store");
    console.log(feature);
    const name = feature.properties.name;
    h1.innerHTML = `${name}`;
  });
  layer.bindPopup(makePopupContent(feature), {
    closeButton: false,
    offset: L.point(0, -8),
  });
}

let markerBounds = []; // Array to hold coordinates for all markers

storeList.forEach((store) => {
  const { coordinates } = store.geometry;
  const { icon } = store.properties; // Ensure each store has an 'icon' property with the URL to the image
  var customIcon = L.icon({
    iconUrl: icon,
    iconSize: [38, 38], // Adjust as needed
  });

  // Create and add marker to the map
  const marker = L.marker([coordinates[1], coordinates[0]], {
    icon: customIcon,
  }).addTo(map);
  marker.on("click", function () {
    // document.querySelector(".modal").classList.add("show");
    const modalNumber = store.id; // Change this according to your modal number
    document.querySelector(`.modal${modalNumber}`).classList.add("show");
    scrollimage(modalNumber);
    document.querySelector(".store").innerHTML = store.properties.name;
  });

  // Add the marker's coordinates to the bounds array
  markerBounds.push([coordinates[1], coordinates[0]]);
});

// After all markers have been added, adjust the map's view to show all markers
if (markerBounds.length > 0) {
  map.fitBounds(markerBounds);
}

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".modal").classList.remove("show");
});

const shopsLayer = L.geoJSON(storeList, {
  onEachFeature: onEachFeature,
  pointToLayer: function (feature, latlng) {
    // return L.marker(latlng, { icon: feature.properties.icon });
  },
});
shopsLayer.addTo(map);

function flyToStore(store) {
  const lat = store.geometry.coordinates[1];
  const lng = store.geometry.coordinates[0];
  map.flyTo([lat, lng], 14, {
    duration: 3,
  });
  setTimeout(() => {
    L.popup({ closeButton: false, offset: L.point(0, -8) })
      .setLatLng([lat, lng])
      .setContent(makePopupContent(store))
      .openOn(map);
  }, 3000);
}

function showModal(store) {
  document.querySelector(".modal").classList.add("show");
  console.log(store);
}

document.querySelector(".close").addEventListener("click", () => {
  document.querySelector(".modal").classList.remove("show");
});

document.querySelector(".quadrant").classList.add("hidden");
document.addEventListener("DOMContentLoaded", function () {
  const mapDiv = document.getElementById("map");
  const quadrantDiv = document.querySelector(".quadrant");
  const toggleButton = document.getElementById("toggleButton");
  let isMapVisible = true;

  toggleButton.addEventListener("click", function () {
    isMapVisible = !isMapVisible;
    if (isMapVisible) {
      mapDiv.classList.add("hidden");
      quadrantDiv.classList.remove("hidden");
    } else {
      mapDiv.classList.remove("hidden");
      quadrantDiv.classList.add("hidden");
    }
  });
});
document.querySelectorAll(".img").forEach((item) => {
  item.addEventListener("click", (event) => {
    const modalNumber = event.target.classList[0].slice(3); // Extract the modal number from the class name
    const modal = document.querySelector(`.modal${modalNumber}`);
    modal.classList.add("show");
    scrollimage(modalNumber);
  });
});

document.querySelectorAll(".close").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("show");
    });
  });
});

//Zoom JS
function scrollimage(modalNumber) {
  var modalImage1 = document.querySelector(
    `.modal${modalNumber} #modalImage1`
    // `.modal${modalNumber} .modalImage:nth-child(1)`
  );
  var modalImage2 = document.querySelector(
    `.modal${modalNumber} #modalImage2`
    // `.modal${modalNumber} .modalImage:nth-child(2)`
  );
  var currentZoomLevel = 1; // Initial zoom level
  var currentImageIndex = 1; // Start with the first image

  // Initially hide the second image
  modalImage2.style.display = "none";

  function updateImageSize() {
    // Calculate new size
    var newSize = 200 * currentZoomLevel;
    if (currentImageIndex === 1) {
      modalImage1.style.width = newSize + "px";
      modalImage1.style.height = "auto"; // Keep aspect ratio
      modalImage1.style.display = "block"; // Ensure it's displayed
    } else {
      modalImage2.style.width = newSize + "px";
      modalImage2.style.height = "auto"; // Keep aspect ratio
      modalImage2.style.display = "block"; // Ensure it's displayed
    }
  }

  function handleZoom(event) {
    event.preventDefault();
    var zoomFactor = event.deltaY > 0 ? 0.1 : -0.1; // Adjust zoom speed
    currentZoomLevel += zoomFactor;

    if (currentImageIndex === 2 && currentZoomLevel < 1) {
      // If we're on the second image and scaling down below the initial size,
      // switch back to the first image
      currentImageIndex = 1;
      modalImage1.style.display = "block";
      modalImage2.style.display = "none";
      currentZoomLevel = 9; // Set to max zoom level for the first image to start scaling down from
    } else {
      // Keep zoom level in a reasonable range for the current image
      currentZoomLevel = Math.max(1, currentZoomLevel);
      currentZoomLevel = Math.min(9, currentZoomLevel); // Set maximum zoom to prevent too much zoom

      // Check if it's time to switch images on zooming in
      if (currentZoomLevel === 9 && currentImageIndex === 1) {
        currentImageIndex = 2; // Switch to the second image
        modalImage1.style.display = "none"; // Hide the first image
        modalImage2.style.display = "block"; // Show the second image
        currentZoomLevel = 1; // Reset zoom for the second image
      }
    }

    updateImageSize();
  }

  // Listen for wheel scroll to zoom in and out
  document.addEventListener("wheel", handleZoom, { passive: false });

  // Initially set the size of the first image
  updateImageSize();
}
