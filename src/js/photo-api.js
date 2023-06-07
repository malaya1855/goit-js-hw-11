import axios from 'axios';

export default class NewApiService {
    constructor () {
        this.BASE_URL = "https://pixabay.com/api/";
        this.searchParams = new URLSearchParams({
        key: "37072285-b3efa6f8cf1db58cd30a34c91",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 40,
          })
        this.page = 1;
        this.searchInput = "";
        this.totalPhotos = "";
    }
      async getPhotos() {
        try {
            const response = await axios.get(`${this.BASE_URL}?${this.searchParams}&q=${this.searchInput}&page=${this.page}`);
                const items = response.data.hits;
                this.totalPhotos = response.data.totalHits;
                
                if (this.totalPhotos !== 0){return items}

        } catch (error) {console.log(error)}
        }

        async loadmorePhotos() {
            try {
                const response = await axios.get(`${this.BASE_URL}?${this.searchParams}&q=${this.searchInput}&page=${this.page}`);
                    const items = response.data.hits;
                    this.totalPhotos = response.data.totalHits;
                    let renderedPhoto = this.page*40;
    if (renderedPhoto <= this.totalPhotos){return items}
    
            } catch (error) {console.log(error)}
            }
        
}