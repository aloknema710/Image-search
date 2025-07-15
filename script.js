const accesskey = "KDOZXed1MiPs4uC9IOyFtJ0XGb265SU68SfBpbZb60w";

const searchform = document.getElementById("search-form"); 
const searchbox = document.getElementById("search-box");    
const searchresults = document.getElementById("search-result");
const showmorebutton = document.getElementById("show-more-button");
// access key for the API :  KDOZXed1MiPs4uC9IOyFtJ0XGb265SU68SfBpbZb60w

let keyword = "";
let page = 1;

async function searchImages() {
    try {
        keyword = searchbox.value;
        const url = `https://api.unsplash.com/search/photos?query=${keyword}&page=${page}&per_page=21&client_id=${accesskey}`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        // displayImages(data.results);
        const results = data.results;
        if (page === 1) {
            searchresults.innerHTML = ""; // Clear previous results on new search
        }
        results.map((result) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            const imagelink = document.createElement("a");
            imagelink.href = result.links.html;
            imagelink.target = "_blank"; // Open in new tab
            imagelink.appendChild(image);
            searchresults.appendChild(imagelink);
        })
        showmorebutton.style.display = "block"; // Show the "Show More" button
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}


searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1; // Reset page number on new search
    searchImages();
});

showmorebutton.addEventListener("click", () => {
    page++; // Increment page number for next set of results
    searchImages();
});