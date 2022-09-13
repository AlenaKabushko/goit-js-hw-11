
//const BASE_URL = "https://restcountries.com/v3.1/name"

// function fetchCountries(name) {
//     return fetch(`${BASE_URL}/${name}?fields=name,capital,population,flags,languages`).then(
//     (response) => {
//         if (!response.ok) {
//             throw new Error(response.status);
//         }
//         return response.json();
//     }
//     )
// };

import axios from "axios";

axios.defaults.baseURL = "https://pixabay.com/api/";
const KEY = "29758121-e6e3453f02405b4aa1525a8f6&q";

async function fetchImage(fromInput, page) {
  try {
    const response = await axios.get(`?key=${KEY}&q=${fromInput}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=40`);
      console.log(response);
      return response;
  } catch (error) {
    console.error(error);
  }
}

// 
// function fetchImage() {
//     const options = {
//         key: "29758121-e6e3453f02405b4aa1525a8f6"
//     }

//     fetch(url, options)
// }

export { fetchImage };