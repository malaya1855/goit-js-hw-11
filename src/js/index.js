import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import renderPhotos from './render-photo';
import NewApiService from './photo-api';

const searchForm = document.querySelector('.search-form')
const searchQuery = document.querySelector("input[name='searchQuery']")
const loadMoreBtn = document.querySelector('.load-more')
const photoCard = document.querySelector('.photo-card')
export const pageGallery = document.querySelector('.gallery')

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
    console.log(newApiService.page);
    loadMoreBtn.classList.remove('visually-hidden');
})
.catch (erorr => Report.failure("Searching Failure", "Sorry, there are no images matching your search query. Please try again.", "Okay"))
}

// loadMoreBtn.addEventListener('click', onLoadMorePhotos)

// function onLoadMorePhotos (){
//     newApiService.loadMorePhotos()
//     .then (items => {
//         renderPhotos(items);
//         newApiService.page += 1;
//         scrollSmooth();
//     })
//     .catch (erorr => {
//         Notify.failure("We're sorry, but you've reached the end of search results.")
//     loadMoreBtn.classList.add('visually-hidden')  
// })
    
// }
// function scrollSmooth () { 
// const { height: cardHeight } = pageGallery.firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });
// }

window.addEventListener("scroll", onLoadMorePhotos)

function onLoadMorePhotos (){
        newApiService.loadMorePhotos()
        .then (items => {
    const contentHeight = pageGallery.offsetHeight; 
    const yOffset       = window.pageYOffset;
    const window_height = window.innerHeight;  
    const y             = yOffset + window_height;y
    if(y <= contentHeight) {renderPhotos(items);
    newApiService.page += 1;
    }
        })
        .catch (erorr => {
            Notify.failure("We're sorry, but you've reached the end of search results.")})  
}