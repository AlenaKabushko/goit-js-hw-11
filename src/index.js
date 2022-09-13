import { Notify } from 'notiflix/build/notiflix-notify-aio';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { fetchImage } from './js/fetch';
import { render } from './js/render'


const refs = {
    formRef: document.querySelector("#search-form"),
    inputRef: document.querySelector("input"),
    submitBtnRef: document.querySelector(".search"),
    loadMoreBtnRef: document.querySelector(".load-more"),
};

let page = "";
let fromInput = "";

function openLightbox() {
    const lightbox = new SimpleLightbox('.gallery a').refresh();
};

function isHidden(ref) {
    ref.classList.add("is-hidden")
};

function hidden(ref) {
    ref.classList.remove("is-hidden")
};

function endOfcollectionCheck(totalHits, page){
    const totalPages = Math.ceil(totalHits / 40);
        if (page >= totalPages) {
            Notify.info("We're sorry, but you've reached the end of search results.");
            isHidden(refs.loadMoreBtnRef);
            return;
    }
};


function onFormSubmit(event) {
    event.preventDefault();
    console.log("worked");
    fromInput = event.target.searchQuery.value;
    page = 1;
    

    fetchImage(fromInput, page).then(( { data }) => {
        console.log(data);
        console.log(data.hits);
        console.log(fromInput);

        if (data.totalHits === 0) {
            return Notify.failure("Oh sorry, there are no images matching your search query. Please try again.")
        }

        Notify.success(`Hooray! We found ${data.totalHits} images.`);

        hidden(refs.loadMoreBtnRef);
        render(data.hits);
        openLightbox();

        endOfcollectionCheck(data.totalHits, page);
    }).catch(error => console.log(error));
}

function onLoadMoreBtn(event) {
    console.log("load more")

    page += 1;

    fetchImage(fromInput, page).then(({ data }) => {
        console.log(data);
        console.log(data.hits);
        console.log(fromInput);
        console.log(`page #${page}`)

        endOfcollectionCheck(data.totalHits, page);

        render(data.hits);
        openLightbox();       
        
    }).catch(error => console.log(error))
};



refs.formRef.addEventListener("submit", onFormSubmit);
refs.loadMoreBtnRef.addEventListener("click", onLoadMoreBtn)

// вынести все нотифай в функции?
// кнопки дизайн
// followme regs

// const { height: cardHeight } = document
//   .querySelector(".gallery")
//   .firstElementChild.getBoundingClientRect();

// window.scrollBy({
//   top: cardHeight * 2,
//   behavior: "smooth",
// });