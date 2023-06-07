import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const photoCard = document.querySelector('.gallery')

export default function renderPhotos(items){
    const pageGallery = items.map(
        item => `<div class="photo-card">
        <a class="gallery__link" href="${item.largeImageURL}">
<img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
</a>
<div class="info">
  <p class="info-item">
    <b>Likes</b>
    <span>${item.likes}</span>
  </p>
  <p class="info-item">
    <b>Views</b>
    <span>${item.views}</span>
  </p>
  <p class="info-item">
    <b>Comments</b>
    <span>${item.comments}</span>
  </p>
  <p class="info-item">
    <b>Downloads</b>
    <span>${item.downloads}</span>
  </p>
</div>
</div>`)
.join("")
photoCard.insertAdjacentHTML('beforeend', pageGallery)
let gallery = new SimpleLightbox('.gallery a', {'captionsData': 'alt', 'captionDelay': 250});
gallery.refresh(); 
    }