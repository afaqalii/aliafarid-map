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
    document.querySelector(".modal").classList.add("show");
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
    document.querySelector(".modal").classList.add("show");
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

// let checkbox = document.getElementById("flexSwitchCheckDefault");

// // Add an event listener to the checkbox
// checkbox.addEventListener("change", function () {
//   if (this.checked) {
//     console.log("checked");
//     document.querySelector("#map").classList.add("hidden");
//     document.querySelector(".quadrant").classList.remove("hidden");
//   } else {
//     document.querySelector("#map").classList.remove("hidden");
//     document.querySelector(".quadrant").classList.add("hidden");
//   }
// });
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
  item.addEventListener("click", () => {
    document.querySelector(".modal").classList.add("show");
  });
});
