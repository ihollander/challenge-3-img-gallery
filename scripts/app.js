import adapter from "./api.js";
import { arrayToGrid } from "./helpers.js";

const app = (() => {
  const searchForm = document.querySelector("#image-search");
  const photoContainer = document.querySelector("#photo-container");
  const imageTemplate = document.querySelector("#image-column");

  searchForm.addEventListener("submit", e => {
    e.preventDefault();
    const search = e.target.elements["search"].value;
    updateImages(search);
  });

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

  const updatePhotos = async search => {
    clearPhotos();
    try {
      const photos = await adapter.getImages(search);
      const grid = arrayToGrid(photos.results, 5);
      renderPhotos(grid);
    } catch (response) {
      console.warn("Error in fetch", response);
    }
  };

  // initial render
  const init = () => {
    updatePhotos("corgi");
  };

  return {
    init
  };
})();

app.init();
