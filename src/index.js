import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Описан в документации
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";
import { fetchImage } from './fetch';


const refs = {
    formRef: document.querySelector("#search-form"),
    galleryRefs: document.querySelector(".gallery"),
    inputRef: document.querySelector("input")
}

function render(response) {
    const renderItems = response.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
        `<a class="gallery__link" href="${largeImageURL}">
            <div class="photo-card">
                <img src="${webformatURL}" alt="${tags}" loading="lazy" width=300px height=200px/>
                <div class="info">
                    <p class="info-item">
                        <b>Likes</b> ${likes}
                    </p>
                    <p class="info-item">
                        <b>Views</b> ${views}
                    </p>
                    <p class="info-item">
                        <b>Comments</b> ${comments}
                    </p>
                    <p class="info-item">
                        <b>Downloads</b> ${downloads}
                    </p>
                </div>
            </div>
        </a>`).join("");
    refs.galleryRefs.innerHTML = renderItems;
}

function openLightbox() {
    const lightbox = new SimpleLightbox('.gallery a');
}

function onFormSubmit(event) {
    event.preventDefault();
    console.log("worked");
    let fromInput = event.target.searchQuery.value;


    fetchImage(fromInput).then(( { data }) => {
        console.log(data);
        console.log(data.hits);
        console.log(fromInput);
        Notify.info("test");

        render(data.hits);
        openLightbox();


        if (data.totalHits === 0) {
            Notify.warning("Oh sorry, there are no images matching your search query. Please try again.")
        }


    });
}

refs.formRef.addEventListener("submit", onFormSubmit);

