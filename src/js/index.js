import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import renderPhotos from './render-photo';
import NewApiService from './photo-api';

const searchForm = document.querySelector('.search-form')
const searchQuery = document.querySelector("input[name='searchQuery']")
const loadMoreBtn = document.querySelector('.load-more')

export const pageGallery = document.querySelector('.gallery')
export const lightbox = new SimpleLightbox('.gallery a');

const newApiService = new NewApiService()

loadMoreBtn.classList.add('visually-hidden')  

searchForm.addEventListener('submit', onSearchPhoto)

function onSearchPhoto(e){
    e.preventDefault();
    loadMoreBtn.classList.add('visually-hidden')  
    pageGallery.innerHTML = " ";
    newApiService.page = 1;
    newApiService.searchInput = searchQuery.value.toLowerCase().trim()
    newApiService.getPhotos()
.then (items => {
    renderPhotos(items);
    Notify.success(`Hooray! We found ${newApiService.totalPhotos} images.`);
    newApiService.page += 1;
    loadMoreBtn.classList.remove('visually-hidden');
})
.catch (error => {Report.failure("Searching Failure", "Sorry, there are no images matching your search query. Please try again.", "Okay"),
console.log(error)})
}

loadMoreBtn.addEventListener('click', onLoadMorePhotos)

function onLoadMorePhotos (){

    newApiService.loadMorePhotos()
    .then (items => {
        renderPhotos(items);
        newApiService.page += 1;
        scrollSmooth();
    })
    .catch (erorr => {
        Notify.failure("We're sorry, but you've reached the end of search results.")
    loadMoreBtn.classList.add('visually-hidden')  
})
    
}
function scrollSmooth () { 
const { height: cardHeight } = pageGallery.firstElementChild.getBoundingClientRect();

window.scrollBy({
  top: cardHeight * 2,
  behavior: "smooth",
});
}

