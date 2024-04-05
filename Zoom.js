// const dom = {
//   container: document.getElementById("container"),
//   perspective: document.getElementById("perspective"),
//   zoom: document.getElementById("zoom"),
// };

// const totalScrollDistance = 10000; // Scroll distance to reach max zoom
// const maxZoomDistance = 40000; // Maximum depth of images, based on what you've set in CSS
// let looping = false;

// dom.container.style.height = `${totalScrollDistance}px`;

// window.addEventListener("scroll", update);

// function update() {
//   // Check if we are waiting for a frame to render
//   if (!looping) {
//     looping = true;
//     raf(zoom);
//   }
// }

// function zoom() {
//   const rect = dom.container.getBoundingClientRect(); // Get bounding rect of container, .top is relative to top of viewport

//   if (rect.top <= 0 && rect.top > -rect.height) {
//     // Update zoom only when container is in viewport
//     dom.perspective.classList.add("perspective--is-fixed");

//     const scrollPos = -rect.top; // Get scroll position relative to zoom container
//     const progress = scrollPos / (totalScrollDistance - window.innerHeight); // Turn this into a number between 0 and 1 (0 is when top of zoom container is at top of viewport, 1 is when bottom of zoom container is at bottom of viewport)

//     dom.zoom.style.transform = `translate3d(0, 0, ${
//       progress * maxZoomDistance
//     }px)`; // Apply transform
//   } else {
//     dom.perspective.classList.remove("perspective--is-fixed");
//   }

//   looping = false;
// }

// // Runs callback on next available animation frame
// function raf(cb) {
//   const raf =
//     window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.msRequestAnimationFrame ||
//     window.oRequestAnimationFrame ||
//     function (cb) {
//       window.setTimeout(cb, 1000 / 60);
//     };

//   raf.call(window, () => {
//     return cb();
//   });
// }

// var modal = document.querySelector(".modal");

// // Get the image inside the modal
// var modalImg = document.querySelector("#modalImage");

// // When the user scrolls, perform zooming
// modal.addEventListener("wheel", function (event) {
//   event.preventDefault();
//   var delta = event.deltaY || event.detail || event.wheelDelta;
//   var zoom = delta > 0 ? 0.9 : 1.1; // Adjust the zooming speed as needed

//   var mouseX = event.clientX - modal.offsetLeft; // Mouse X position relative to the modal
//   var mouseY = event.clientY - modal.offsetTop; // Mouse Y position relative to the modal

//   // Calculate the new image size and position
//   var newWidth = modalImg.width * zoom;
//   var newHeight = modalImg.height * zoom;
//   var newX = modal.scrollLeft + mouseX * (1 - zoom);
//   var newY = modal.scrollTop + mouseY * (1 - zoom);

//   // Apply the new size and position
//   modalImg.style.width = newWidth + "px";
//   modalImg.style.height = newHeight + "px";
//   modal.scrollLeft = newX;
//   modal.scrollTop = newY;
// });
//new code

// var modalImage1 = document.getElementById("modalImage1");
// var modalImage2 = document.getElementById("modalImage2");
// var images = document.querySelectorAll(".modalImage");

// // Set initial zoom state
// var zoomLevel = 1;

// // Function to handle zooming
// function handleZoom(event) {
//   event.preventDefault();

//   // Detect scroll direction
//   var deltaY = event.deltaY || event.detail || event.wheelDelta;
//   var zoomFactor = deltaY > 0 ? 0.05 : -0.05; // Decreased zoom speed

//   // Update zoom level
//   zoomLevel += zoomFactor;

//   // Apply zoom level constraints
//   zoomLevel = Math.max(1, zoomLevel); // Minimum zoom
//   zoomLevel = Math.min(3, zoomLevel); // Maximum zoom

//   // Update image size based on zoom level
//   images.forEach(function (image) {
//     image.style.width = 200 * zoomLevel + "px"; // Initial width * zoom level
//     image.style.height = "auto"; // Maintain aspect ratio
//   });

//   // Show/hide second image based on zoom level
//   if (zoomLevel >= 2) {
//     modalImage1.classList.add("hidden");
//     modalImage2.classList.remove("hidden");
//   } else if (zoomLevel >= 1.5) {
//     // Adjust this threshold as needed
//     setTimeout(function () {
//       modalImage1.classList.add("hidden");
//       modalImage2.classList.remove("hidden");
//     }, 500); // Show second image after 500 milliseconds
//   } else {
//     modalImage1.classList.remove("hidden");
//     modalImage2.classList.add("hidden");
//   }
// }

// // Attach zoom event listener to body
// document.body.addEventListener("wheel", handleZoom);

//new most
// document.addEventListener("DOMContentLoaded", function () {
//   var modalImage1 = document.getElementById("modalImage1");
//   var modalImage2 = document.getElementById("modalImage2");
//   var currentZoomLevel = 1; // Initial zoom level
//   var currentImageIndex = 1; // Start with the first image

//   // Initially hide the second image
//   modalImage2.style.display = "none";

//   function updateImageSize() {
//     // Calculate new size
//     var newSize = 200 * currentZoomLevel;
//     if (currentImageIndex === 1) {
//       modalImage1.style.width = newSize + "px";
//       modalImage1.style.height = "auto"; // Keep aspect ratio
//     } else {
//       modalImage2.style.width = newSize + "px";
//       modalImage2.style.height = "auto"; // Keep aspect ratio
//     }
//   }

//   function handleZoom(event) {
//     event.preventDefault();
//     var zoomFactor = event.deltaY > 0 ? 0.1 : -0.1; // Adjust zoom speed
//     currentZoomLevel += zoomFactor;

//     // Keep zoom level in a reasonable range
//     currentZoomLevel = Math.max(1, currentZoomLevel);
//     currentZoomLevel = Math.min(9, currentZoomLevel); // Set maximum zoom to prevent too much zoom

//     // Check if it's time to switch images
//     if (currentZoomLevel === 9 && currentImageIndex === 1) {
//       currentImageIndex = 2; // Switch to the second image
//       modalImage1.style.display = "none"; // Hide the first image
//       modalImage2.style.display = "block"; // Show the second image
//       currentZoomLevel = 1; // Reset zoom for the second image
//     }

//     updateImageSize();
//   }

//   // Listen for wheel scroll to zoom in and out
//   document.addEventListener("wheel", handleZoom, { passive: false });

//   // Initially set the size of the first image
//   updateImageSize();
// });

document.addEventListener("DOMContentLoaded", function () {
  // var modalImage1 = document.querySelector(".modal .imgContainer");
  // var modalImage2 = document.getElementById("modalImage2");
  var modalImage1 = document.getElementById("modalImage1");
  var modalImage2 = document.getElementById("modalImage2");
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
});
