const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const results = document.getElementById("results");



async function getReceipes() {
    const userValue = searchInput.value;
    //meal serach my name
    const api_url = "www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata";

    // search meal by first letter
    const mealAPi_url = "www.themealdb.com/api/json/v1/1/search.php?f=a";

    //random meal api
    const randomMeal = "www.themealdb.com/api/json/v1/1/random.php"



}

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
})
