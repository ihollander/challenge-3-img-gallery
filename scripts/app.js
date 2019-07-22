import adapter from "./api.js";
import { arrayToGrid } from "./helpers.js";

// DOM elements
const searchForm = document.querySelector("#image-search");
const photoContainer = document.querySelector("#photo-container");
const imageTemplate = document.querySelector("#image-column");

// handlers
const handleSearchSubmit = e => {
  e.preventDefault();
  const search = e.target.elements["search"].value;
  updateImages(search);
};

// event listerers
searchForm.addEventListener("submit", handleSearchSubmit);

// render methods
const clearPhotos = () => {
  while (photoContainer.firstChild) {
    photoContainer.firstChild.remove();
  }
};

const renderPhoto = (photo, parentNode) => {
  const template = document.importNode(imageTemplate.content, true);

  const img = template.querySelector("img");
  img.src = photo.urls.regular;

  parentNode.appendChild(template);
};

const renderPhotos = grid => {
  grid.forEach(row => {
    const columns = document.createElement("div");
    columns.className = "columns";

    row.forEach(photo => renderPhoto(photo, columns));

    photoContainer.appendChild(columns);
  });
};

const updateImages = async search => {
  clearPhotos();
  try {
    const photos = await adapter.getImages(search);
    const grid = arrayToGrid(photos.results, 5);
    renderPhotos(grid);
  } catch (err) {
    console.warn(err);
  }
};

// initial render
const init = () => {
  updateImages("corgi");
};

init();
