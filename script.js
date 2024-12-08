const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// 1 Unsplash API
let count = 5;
const apiKey = "OTl7-y0zmMTW100PKMAg5Gy36AHKctDDmKY9iGHO0UQ";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

//Chick if all image were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    const count = 30;
  }
}
// Helper Function to Set Attributes on DOM Elements
function setAttribute(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// 3 Create Element For Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //Run function for each object in photosArray
  photosArray.forEach((photo) => {
    //Create <a> to link to Unsplash
    const item = document.createElement("a");
    setAttribute(item, {
      href: photo.links.html,
      target: "_blank",
    });
    //  Create <img> for photo
    const img = document.createElement("img");
    setAttribute(img, {
      src: photo.urls.regular,
      alt: photo.alt,
      title: photo.alt,
    });
    //
    img.addEventListener("load", imageLoaded);

    //Put <img> inside <a>, then put both inside imgContainer Element.
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// 2 get photos from Unsplash API
async function getphotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (error) {
    console.log("Api got some error", error);
  }
}

// Check to see if scrolling near bottom of page, Load More photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    // loader.hidden = true;
    getphotos();
  }
});
//on loade
getphotos();















