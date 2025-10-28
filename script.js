const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const results = document.getElementById("results");

async function getReceipes() {
    try {
        const userValue = searchInput.value.trim();
        if (!userValue) {
            results.innerHTML = "<p>Please enter a meal name 🍝</p>";
            return;
        }
        //meal serach my name
        const api_url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userValue}`;
        const response = await fetch(api_url);
        if (!response.ok) throw new Error("Failed to fetch recent repos");
        const data = await response.json();
        console.log(data)
        const mealsArray = data.meals;
        results.innerHTML = ""; // clear old results

        if (mealsArray === null) {
            results.innerHTML = "<p>No recipes found 😔</p>";
            return;
        }


        //dynamically adding the data in meal card
        mealsArray.forEach(meal => {
            const div = document.createElement("div");
            div.classList.add("meal-card");
            div.innerHTML = `<h2>${meal.strMeal}</h2>
        <img src= "${meal.strMealThumb} "> 
 <p><strong>Category:</strong> ${meal.strCategory}</p>
        `
            results.appendChild(div)
        });


        // search meal by first letter
        const mealAPi_url = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";
        const response2 = await fetch(mealAPi_url)
        const data2 = await response2.json();
        console.log(data2)

        //random meal api
        const randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php"
        const response3 = await fetch(randomMeal)
        const data3 = await response3.json();
        console.log(data3)

    }
    catch (error) {
        results.innerHTML = "Error fetching data..";
        console.error(error);
    }
}
searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    getReceipes();
})
