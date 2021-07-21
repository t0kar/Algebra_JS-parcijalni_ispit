const searchInputElement = document.querySelector("[data-search-input]");
const searchResultElement = document.querySelector("[data-search-table]");

function showLoader() {
    const loader = document.querySelector(".lds-spinner");
    loader.style.display = "inline-block";
};

function hideLoader() {
    const loader = document.querySelector(".lds-spinner");
    loader.style.display = "none";
};

function showError() {
    const error = document.querySelector("[data-result-error]");
    error.innerText = "Fetch error! Check console for more info.";
};

function hideError() {
    const error = document.querySelector("[data-result-error]");
    error.innerText = "";
};

function noResults() {
    const noResults = document.querySelector("[data-result-none]");
    noResults.innerText = "No results! Try again!";
};

function hideNoResults() {
    const noResults = document.querySelector("[data-result-none]");
    noResults.innerText = "";
};

searchInputElement.addEventListener('keyup', (event) => {
    const value = event.target.value;
    searchResultElement.innerHTML = "";

    fetch(`https://itunes.apple.com/search?term=${value}&entity=song`)
        .then((response) => {
            showLoader();
            hideError();

            return response.json();
        })
        .then((data) => {
            console.log(data);
            hideLoader();
            hideError();

            if (data.results.length <= 0) {
                noResults();
            } else {

                for (i = 0; i < data.results.length; i++) {
                    const item = data.results[i];
                    const track = item.trackName;
                    const artist = item.artistName;

                    const itemElement = document.createElement("li");
                    itemElement.innerText = `|${i}|${track}|${artist}|`;
                    searchResultElement.appendChild(itemElement);
                };
            };
        })
        .catch((error) => {
            hideLoader();
            hideNoResults();
            showError();
            console.log(error);
        });
});