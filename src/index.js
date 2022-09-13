import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImage } from './js/fetch';
import { render } from './js/render'


const refs = {
    formRef: document.querySelector("#search-form"),
    inputRef: document.querySelector("input"),
    loadMoreBtnRef: document.querySelector(".load-more")
};

let page = 1;
let fromInput = "";

function openLightbox() {
    const lightbox = new SimpleLightbox('.gallery a').refresh();
};

function onFormSubmit(event) {
    event.preventDefault();
    console.log("worked");
    fromInput = event.target.searchQuery.value;


    fetchImage(fromInput, page).then(( { data }) => {
        console.log(data);
        console.log(data.hits);
        console.log(fromInput);

        if (data.totalHits === 0) {
            return Notify.warning("Oh sorry, there are no images matching your search query. Please try again.")
        }

        render(data.hits);
        openLightbox();
    });
}

function onLoadMoreBtn(event) {
    console.log("load more")

    page += 1;

    fetchImage(fromInput, page).then(({ data }) => {
        console.log(data);
        console.log(data.hits);
        console.log(fromInput);

        const totalPages = Math.ceil(data.totalHits / 40);
        if (page > totalPages) {
            return Notify.info("We're sorry, but you've reached the end of search results.")
        }

        render(data.hits);
        openLightbox();       
        
    })
};

refs.formRef.addEventListener("submit", onFormSubmit);
refs.loadMoreBtnRef.addEventListener("click", onLoadMoreBtn)

// вынести все нотифай в функции?
