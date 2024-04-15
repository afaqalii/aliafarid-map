import storeList from "./Store.js";
const map = L.map("map", { zoomControl: false }).setView(
  [22.9074872, 79.07306671],
  4
);

// Url for the Sattelite view
const tileUrl =
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
// const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const attribution =
  '&copy; <a href="https://www.smashcode.dev/">Smash Code</a> contributors, Coded by Smash Code with ❤️';
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
function isMobileDevice() {
  return window.innerWidth <= 540;
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
  const { image } = store.properties; // Ensure each store has an 'image' property with the URL to the image

  // Define image options
  const imageOptions = {
    opacity: 1,
    zIndex: 1,
    interactive: true,
    title: "Image", // Title for the image overlay
    alt: store.properties.name, // Alt text for the image overlay
    content: store.properties.address, // Content for the image overlay
  };
  // Create and add image overlay to the map
  const imageOverlay = L.imageOverlay(image, coordinates, imageOptions).addTo(map);

  // Ensure the image overlay is interactive
  // // Create custom icon for the marker
  // const customIcon = L.icon({
  //   iconUrl: image, // Use the same image URL for the icon
  //   iconSize: [100, 100], // Adjust icon size as needed
  // });

  // // Create and add marker to the map
  // const marker = L.marker([coordinates[1], coordinates[0]], {
  //   icon: customIcon,
  // }).addTo(map);

  // Bind tooltip to the marker
  imageOverlay.bindTooltip(store.properties.name, {
    direction: "top",
    offset: [0, -20],
    permanent: isMobileDevice(),
  });

  // Add 'click' event listener to the image overlay
  imageOverlay.on('click', function (e) {
    showModal(store)
  });
  // Add the marker's coordinates to the bounds array
  markerBounds.push([coordinates[1], coordinates[0]]);
});


let markerLatLngs = markerBounds.map((coord) => L.latLng(coord[0], coord[1]));
let markerGroupBounds = L.latLngBounds(markerLatLngs);

// Set the map view to fit the calculated bounds
map.fitBounds(markerGroupBounds);


// video overlay
var videoOverlay = L.videoOverlay("./assets/video1.webm", [[49.5, 98.8], [38.5, 97.8]], {
  opacity: 0.9,
  zIndex: 1,
  interactive: true,
  title: "Video 1",
  alt: "overlay.altText",
  content: "overlay.videoContent",
}).addTo(map);
// Custom marker icon with video
// const videoIcon = L.divIcon({
//   html: '<video id="videoMarker" autoplay muted width="50" height="50"><source src="./assets/video1.webm" ></video>',
//   iconSize: [20, 20],
//   className: "video-marker",
// });

// // Add marker to the map
// const videomarker = L.marker([35.8617, 104.1954], { icon: videoIcon }).addTo(
//   map
// );

videoOverlay.on("click", () => {
  document.querySelector(".modal19").classList.add("show");
  scrollimage(19);
});
videoOverlay.bindTooltip("This is the video marker", {
  direction: "top",
  offset: [0, -20],

  permanent: isMobileDevice(),
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.keyCode === 27) {
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("show");
    });
    document.querySelectorAll(".modalmobile").forEach((modal) => {
      modal.classList.remove("showmobilemodal");
    });
  }
});

const shopsLayer = L.geoJSON(storeList, {
  onEachFeature: onEachFeature,
  pointToLayer: function (feature, latlng) { },
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
  // Get modal element
  const modal = document.querySelector(".modal");
  // Get image element inside modal
  const modalImg = document.getElementById("modal-image");
  // Show modal
  modal.classList.add("show");
  // Set image source
  modalImg.src = store.properties.image;
  console.log(store);
}

document.querySelector(".quadrant").classList.add("hidden");
document.addEventListener("DOMContentLoaded", function () {
  const mapDiv = document.getElementById("map");
  const quadrantDiv = document.querySelector(".quadrant");
  const toggleButton = document.getElementById("toggleButton");
  let isMapVisible = false;

  toggleButton.addEventListener("click", function () {
    isMapVisible = !isMapVisible;
    console.log("CLicked")
    if (isMapVisible) {
      toggleButton.innerText = "Map View";
      mapDiv.classList.add("hidden");
      quadrantDiv.classList.remove("hidden");
    } else {
      mapDiv.classList.remove("hidden");
      toggleButton.innerText = "Graph View";
      quadrantDiv.classList.add("hidden");
    }
  });
});
document.querySelectorAll(".img").forEach((item) => {
  item.addEventListener("click", (event) => {
    const modalNumber = event.target.classList[0].slice(3);
    if (isMobileDevice()) {
      const modal = document.querySelector(`.modalmobile${modalNumber}`);
      modal.classList.add("showmobilemodal");
      console.log(modalNumber, modal);
    } else {
      const modal = document.querySelector(`.modal${modalNumber}`);
      modal.classList.add("show");
      scrollimage(modalNumber);
    }
  });
});

document.querySelectorAll(".close").forEach((item) => {
  item.addEventListener("click", () => {
    console.log("triggrered")
    document.querySelectorAll(".modal").forEach((modal) => {
      modal.classList.remove("show");
    });
  });
});
document.querySelectorAll(".modalmobile .close").forEach((item) => {
  item.addEventListener("click", () => {
    document.querySelectorAll(".modalmobile").forEach((modal) => {
      modal.classList.remove("showmobilemodal");
    });
  });
});

//Zoom JS

function scrollimage(modalNumber) {
  var modalMedia1 = document.querySelector(`.modal${modalNumber} #modalImage1`);
  var modalMedia2 = document.querySelector(`.modal${modalNumber} #modalImage2`);
  var currentZoomLevel = 1; // Initial zoom level
  var currentMediaIndex = 1; // Start with the first media

  // Initially hide the second media
  modalMedia2.style.display = "none";

  function updateMediaSize() {
    // Calculate new size
    var newSize = 200 * currentZoomLevel;
    if (currentMediaIndex === 1) {
      if (modalMedia1.tagName == "VIDEO") {
        var videoDuration = modalMedia1.duration || 0; // Get video duration or default to 0
        var currentTime = modalMedia1.currentTime || 0; // Get current playback time or default to 0
        var newPosition = (currentTime / videoDuration) * newSize; // Calculate new position based on zoom level
        modalMedia1.currentTime = (newPosition / newSize) * videoDuration; // Update currentTime
      }
      modalMedia1.style.width = newSize + "px";
      modalMedia1.style.height = newSize + "px"; // Keep aspect ratio
      modalMedia1.style.display = "block"; // Ensure it's displayed
    } else {
      modalMedia2.style.width = newSize + "px";
      modalMedia2.style.height = newSize + "px"; // Keep aspect ratio
      modalMedia2.style.display = "block"; // Ensure it's displayed
      if (modalMedia2.tagName === "VIDEO") {
        var videoDuration = modalMedia2.duration || 0; // Get video duration or default to 0
        var currentTime = modalMedia2.currentTime || 0; // Get current playback time or default to 0
        var newPosition = (currentTime / videoDuration) * newSize; // Calculate new position based on zoom level
        modalMedia2.currentTime = (newPosition / newSize) * videoDuration; // Update currentTime
      }
    }
  }

  function handleZoom(event) {
    event.preventDefault();
    var zoomFactor = event.deltaY > 0 ? 0.1 : -0.1; // Adjust zoom speed
    currentZoomLevel += zoomFactor;
    console.log("zoomFactor", zoomFactor)
    if (currentMediaIndex === 2 && currentZoomLevel < 1) {
      // If we're on the second media and scaling down below the initial size,
      // switch back to the first media
      currentMediaIndex = 1;
      modalMedia1.style.display = "block";
      modalMedia2.style.display = "none";
      currentZoomLevel = 9; // Set to max zoom level for the first media to start scaling down from
    } else {
      // Keep zoom level in a reasonable range for the current media
      currentZoomLevel = Math.max(1, currentZoomLevel);
      currentZoomLevel = Math.min(9, currentZoomLevel); // Set maximum zoom to prevent too much zoom

      // Check if it's time to switch media on zooming in
      if (currentZoomLevel === 9 && currentMediaIndex === 1) {
        currentMediaIndex = 2; // Switch to the second media
        modalMedia1.style.display = "none"; // Hide the first media
        modalMedia2.style.display = "block"; // Show the second media
        currentZoomLevel = 1; // Reset zoom for the second media
      }
    }

    updateMediaSize();
  }

  // Listen for wheel scroll to zoom in and out
  document.addEventListener("wheel", handleZoom, { passive: false });

  // Initially set the size of the first media
  updateMediaSize();
}

//Modal for the About
document.querySelector(`#about`).addEventListener("click", () => {
  document.querySelector(".modal18").classList.add("show");

  scrollimage(18);
});
document.querySelector(`#about2`).addEventListener("click", () => {
  document.querySelector(".modal18").classList.add("show");

  scrollimage(18);
});

//Changing Logo on every time we referesh the page
document.addEventListener("DOMContentLoaded", function () {
  // Array of logo image URLs
  const logoImages = [
    "./assets/Logo/1.png",
    "./assets/Logo/2.png",
    "./assets/Logo/3.png",
    "./assets/Logo/4.png",
    "./assets/Logo/5.png",
  ];

  // Get a random index within the range of logoImages array
  const randomIndex = Math.floor(Math.random() * logoImages.length);

  // Get the logo element by its id
  const logoElement = document.getElementById("logo");

  // Set the src attribute of the logo element to a randomly selected logo image URL
  logoElement.src = logoImages[randomIndex];
});
;


var newBtn = document.getElementById("new-btn")

newBtn.addEventListener("click",() => {
  console.log("triggered")
})