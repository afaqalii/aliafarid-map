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
