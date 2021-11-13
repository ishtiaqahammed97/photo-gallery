/// get data from api
const unsplashAPI = {
    accessKey: 'uWq_4AeoXFi2rleJvkgc5w55ohGvJvyWtVNllCCcPJ8',
    secretKey: '8jCGN2UDB4DlAmMONW0iqpu8f7Sok8UbxESizAqg0Xk',
    page: 1,
    async getData(e) {
        const res = await fetch(`https://api.unsplash.com/search/photos/?client_id=${this.accessKey}&query=flower&per_page=8&page=${e}`);
        const data = await res.json();
        return data;
    }
};

const dataShow = {
    btn() {
        const { prevBtnElm, nextBtnElm } = UI.loadSelector();
        let result = 1;
        prevBtnElm.addEventListener("click", async (e) => {
            if (result < 2) {
                alert("This is a invalid number")
            } else {
                result--;
                const data = await unsplashAPI.getData(result)
                UI.showPhotoFromApi(data);
            }
        })
        nextBtnElm.addEventListener("click", async () => {
            result++
            const data = await unsplashAPI.getData(result);
            UI.showPhotoFromApi(data);
        })
        return result;
    }
};

/// ui 
const UI = {
    loadSelector() {
        const photos = document.querySelectorAll(".card-image");
        const title = document.querySelectorAll(".card-title");
        const description = document.querySelectorAll(".description");
        const previewPhotosElm = document.querySelector(".preview-section");
        const showImage = document.querySelector(".preview-image");
        const closeBtnElm = document.querySelector(".close");
        const cardsElm = document.querySelector(".cards");
        const photoCard = document.querySelector(".photo-card");
        const prevBtnElm = document.querySelector(".previous");
        const nextBtnElm = document.querySelector(".next");
        return {
            photos,
            title,
            description,
            previewPhotosElm,
            showImage,
            closeBtnElm,
            cardsElm,
            photoCard,
            prevBtnElm,
            nextBtnElm
        }
    },
    /// zoom effect of picture
    zoomPicture() {
        const { cardsElm } = this.loadSelector();
        const photo = document.querySelector(".card-title");
        cardsElm.addEventListener("click", (e) => {
            if (e.target.classList === "card-title") {
                console.log("zoom")
            }
        })
    },
    /// show data from api
    showPhotoFromApi(data) {
        const { cardsElm } = this.loadSelector();
        let result = '';
        data.results.forEach(async item => {
            result += `
                        <div class="photo-card">
                        <div class="card-image">
                            <img src="${item.urls.thumb}" class="image" id=${item.id} alt="">
                        </div>
                        <h2 class="card-title">${item.alt_description.slice(0, 16)}......</h2>
                        <p class="description">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                        </div>
                        `
        })
        cardsElm.innerHTML = result;
    },
    /// display image
    displayImage(index) {
        const { showImage } = this.loadSelector();
        let item = document.getElementById(index).src;
        showImage.src = item
    },
    async init() {
        const { cardsElm, previewPhotosElm, closeBtnElm } = this.loadSelector();
        cardsElm.addEventListener('click', (e) => {
            if (e.target.classList.contains("image")) {
                const item = e.target.id
                this.displayImage(item)
                previewPhotosElm.classList.add("show");
            }
        })
        closeBtnElm.addEventListener("click", () => {
            previewPhotosElm.classList.remove("show")
        })
        const item = dataShow.btn();
        const data = await unsplashAPI.getData(item);
        this.showPhotoFromApi(data);
        this.zoomPicture();
    }
};

UI.init();

