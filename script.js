const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API

const count = 10;
const apiKey = "gATSasyZk4RV2ztESjK83pLOcWGQ7L-4oryYxVN5rHQ";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
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
    loader.hidden = true;
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
