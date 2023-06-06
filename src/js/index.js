import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';

const searchQuery = document.querySelector("input[name='searchQuery']")
const searchForm = document.querySelector('.search-form')
const photoCard = document.querySelector('.gallery')

const BASE_URL = "https://pixabay.com/api/";
const searchParams = new URLSearchParams({
key: "37072285-b3efa6f8cf1db58cd30a34c91",
// q: 'cat',
image_type: "photo",
orientation: "horizontal",
safesearch: true,
per_page: 40,
  })

let page = 1;
let totalPhotos = 0;

searchForm.addEventListener('submit', onSearchPhoto)

function onSearchPhoto(e){
    e.preventDefault();
    const searchInput = searchQuery.value.toLowerCase().trim()
    console.log(searchInput);
    
// const axios = require('axios');

const getPhotos = async () => {
    try {
        const response = await axios.get(`${BASE_URL}?${searchParams}&q=${searchInput}&page=${page}`);
            const items = response.data.hits;
            totalPhotos = response.data.totalHits;
            if (totalPhotos !== 0){return items}
            
    } catch (error) {console.log(error)}
    }
function renderPhotos(items){
    const pageGallery = items.map(
        item => `<div class="photo-card">
<img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes ${item.likes}</b>
  </p>
  <p class="info-item">
    <b>Views ${item.views}</b>
  </p>
  <p class="info-item">
    <b>Comments ${item.comments}</b>
  </p>
  <p class="info-item">
    <b>Downloads ${item.downloads}</b>
  </p>
</div>
</div>`)
.join("")
photoCard.insertAdjacentHTML('beforeend', pageGallery)
}

getPhotos()
.then (items => {
    Notify.success(`Hooray! We found ${totalPhotos} images.`);
    renderPhotos(items)})
.catch (erorr => Report.failure("Searching Failure", "Sorry, there are no images matching your search query. Please try again.", "Okay"))



}
