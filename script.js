const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let isInitialLoad = true;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API

let initialCount = 5;
const apiKey = "gATSasyZk4RV2ztESjK83pLOcWGQ7L-4oryYxVN5rHQ";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initialCount}`;

function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes on DOM Elements

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function displayPhotos(photosArray) {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Event Listener, check when each is finished loading
    img.addEventListener("load", imageLoaded());
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    const photosArray = await response.json();
    displayPhotos(photosArray);
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (error) {}
}

//Check to see if scrolling near bottom of the page, load more photos

window.addEventListener("scroll", () => {
  const windowHeight = window.innerHeight;
  const ScrollHeight = window.scrollY;
  const totalHeight = document.body.offsetHeight;

  if (windowHeight + ScrollHeight >= totalHeight - 1000 && ready) {
    ready = false;
    loader.hidden = false;
    getPhotos();
  }
});

//On load
getPhotos();
