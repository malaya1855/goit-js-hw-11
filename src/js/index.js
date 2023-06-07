import { Report } from 'notiflix/build/notiflix-report-aio';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import renderPhotos from "./render-photo";
import NewApiService from './photo-api';

const searchForm = document.querySelector('.search-form')
const searchQuery = document.querySelector("input[name='searchQuery']")
const loadMoreBtn = document.querySelector('.load-more')

const newApiService = new NewApiService()


loadMoreBtn.classList.add('visually-hidden')  

searchForm.addEventListener('submit', onSearchPhoto)

function onSearchPhoto(e){
    e.preventDefault();
    newApiService.searchInput = searchQuery.value.toLowerCase().trim()

    newApiService.getPhotos()
.then (items => {
    Notify.success(`Hooray! We found ${newApiService.totalPhotos} images.`);
    console.log(items);
    renderPhotos(items);
    console.log("ass");
    loadMoreBtn.classList.remove('visually-hidden')
    newApiService.page += 1;
    console.log("fuck");
})
.catch (erorr => Report.failure("Searching Failure", "Sorry, there are no images matching your search query. Please try again.", "Okay"))
}

loadMoreBtn.addEventListener('click', onLoadMorePhotos)

function onLoadMorePhotos (){
    
    newApiService.loadmorePhotos()
    .then (items => {
        console.log(items);

        renderPhotos(items)
        newApiService.page += 1;
        console.log(newApiService.page);
    })
    .catch (erorr => {Notify.failure("We're sorry, but you've reached the end of search results.")
    loadMoreBtn.classList.add('visually-hidden')  
})
    
}
