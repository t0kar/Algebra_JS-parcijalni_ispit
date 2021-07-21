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

                    var row = searchResultElement.insertRow(i);

                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    var cell3 = row.insertCell(2);

                    cell1.innerHTML = i;
                    cell2.innerHTML = `${track}`;
                    cell3.innerHTML = `${artist}`;
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