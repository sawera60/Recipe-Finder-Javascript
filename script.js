// const searchInput = document.getElementById("search-input");
// const searchButton = document.getElementById("search-button");
// const results = document.getElementById("results");

// // forkify_url= "https://forkify-api.herokuapp.com/api/v2/recipes?search=pizza&key=<insert your key>"
// //forkify key = "3e5136dd-83fc-4df6-b023-e2e21ec46f49"

// async function getReceipes() {
//     try {
//         const userValue = searchInput.value.trim();
//         if (!userValue) {
//             results.innerHTML = "<p>Please enter a meal name 🍝</p>";
//             return;
//         }
//         //meal serach my name
//         const api_url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userValue}`;
//         const response = await fetch(api_url);
//         if (!response.ok) throw new Error("Failed to fetch recent repos");
//         const data = await response.json();
//         console.log(data)
//         const mealsArray = data.meals;
//         results.innerHTML = ""; // clear old results

//         if (mealsArray === null) {
//             results.innerHTML = "<p>No recipes found 😔</p>";
//             return;
//         }

//         //dynamically adding the data in meal card
//         mealsArray.forEach(meal => {
//             const div = document.createElement("div");
//             div.classList.add("meal-card");
//             div.innerHTML = `<h3>${meal.strMeal}</h3>
//         <img src= "${meal.strMealThumb} "> 
//  <p><strong>Category:</strong> ${meal.strCategory}</p>
//         <button>View Recipe</button>
//  `
//             results.appendChild(div)
//         });


//         // search meal by first letter
//         const mealAPi_url = "https://www.themealdb.com/api/json/v1/1/search.php?f=a";
//         const response2 = await fetch(mealAPi_url)
//         const data2 = await response2.json();
//         console.log(data2)

//         //random meal api
//         const randomMeal = "https://www.themealdb.com/api/json/v1/1/random.php"
//         const response3 = await fetch(randomMeal)
//         const data3 = await response3.json();
//         console.log(data3)

//     }
//     catch (error) {
//         results.innerHTML = "Error fetching data..";
//         console.error(error);
//     }
// }
// searchButton.addEventListener("click", (e) => {
//     e.preventDefault();
//     getReceipes();
// })


const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const randomButton = document.getElementById("random-button");
const results = document.getElementById("results");


//function for getting random recipe
async function getRandomRecipe() {

    try {
        const keywords = ["chicken", "pasta", "salad", "rice", "pizza", "cake", "soup", "burger", "fish"];
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${randomKeyword}`;
        results.innerHTML = "<p>Loading recipes... 🍳</p>";
        const response = await fetch(url);
        const data1 = await response.json();
        const recipes = data1.data.recipes;

        if (!recipes || recipes.length === 0) {
            results.innerHTML = "<p>No random recipe found 😔</p>";
            return;
        }

        // Pick one random recipe from results
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
        //just incase it doesnt directly get us to the source url
        const recipeLink = randomRecipe.source_url || `https://forkify-api.herokuapp.com/api/v2/recipes/${randomRecipe.id}`;


        results.innerHTML = `
    <div class="meal-card">
      <h3>${randomRecipe.title}</h3>
      <img src="${randomRecipe.image_url}" alt="${randomRecipe.title}">
      <p><strong>By:</strong> ${randomRecipe.publisher}</p>
      <button onclick="window.open('${recipeLink}', '_blank')">View Recipe</button>
    </div>
  `;

    }
    catch (error) {
        results.innerHTML = "eror fetching recipe"
        console.log(error)
    }
}

//function for getting full recipe
async function getReceipes() {
    try {
        const userValue = searchInput.value.trim();
        if (!userValue) {
            results.innerHTML = "<p>Please enter a meal name 🍝</p>";
            return;
        }
        //Endpoint for basic info like ✅ title ✅ publisher ✅ image_url ✅ id
        const forkify_url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${userValue}`
        results.innerHTML = `<p style= "color:white"; >Loading recipes... 🍳</p>`;
        const response = await fetch(forkify_url);
        if (!response.ok) throw new Error("Failed to fetch recent repos");
        const data = await response.json();
        console.log(data)
        const recipeArray = data.data.recipes;
        results.innerHTML = ""; // clear old results

        if (!recipeArray || recipeArray.length === 0) {
            results.innerHTML = "<p>No recipes found 😔</p>";
            return;
        }

        //dynamically adding the data in meal card that we are fetching from api
        recipeArray.forEach(recipe => {
            const div = document.createElement("div");
            div.classList.add("meal-card");
            div.innerHTML = `<h3>${recipe.title}</h3>
                <img src="${recipe.image_url}" alt="${recipe.title}">
          <p><strong>By:</strong> ${recipe.publisher}</p>
                <button onclick="showRecipeDetails('${recipe.id}')">View Recipe</button> 
         `
            results.appendChild(div)
        });


    }
    catch (error) {
        results.innerHTML = "Error fetching data..";
        console.error(error);
    }
}

async function getRandomRecipe() {
    try {
        const keywords = ["chicken", "pasta", "salad", "rice", "pizza", "cake", "soup", "burger", "fish"];
        const randomKeyword = keywords[Math.floor(Math.random() * keywords.length)];
        const url = `https://forkify-api.herokuapp.com/api/v2/recipes?search=${randomKeyword}`;

        results.innerHTML = `<p style= "color:white;">Loading random recipe... 🍳</p>`;

        const response = await fetch(url);
        const data1 = await response.json();
        const recipes = data1.data.recipes;

        if (!recipes || recipes.length === 0) {
            results.innerHTML = "<p>No random recipe found 😔</p>";
            return;
        }

        // Pick one random recipe from results
        const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];

        // Fetch its full details to get source_url
        const detailsUrl = `https://forkify-api.herokuapp.com/api/v2/recipes/${randomRecipe.id}`;
        const detailsResponse = await fetch(detailsUrl);
        const detailsData = await detailsResponse.json();
        const fullRecipe = detailsData.data.recipe;

        // Use the real recipe link
        const recipeLink = fullRecipe.source_url || `https://forkify-api.herokuapp.com/api/v2/recipes/${fullRecipe.id}`;

        // Display the card
        results.innerHTML = `
      <div class="meal-card">
        <h3>${fullRecipe.title}</h3>
        <img src="${fullRecipe.image_url}" alt="${fullRecipe.title}">
        <p><strong>By:</strong> ${fullRecipe.publisher}</p>
        <button><a href="${recipeLink}" target="_blank" style="color:white;text-decoration:none;">View Full Recipe</a></button>
      </div>
    `;
    } catch (error) {
        results.innerHTML = "Error fetching recipe 😔";
        console.error(error);
    }
}

async function showRecipeDetails(id) {
    const popup = document.getElementById("recipe-popup");
    const title = document.getElementById("popup-title");
    const image = document.getElementById("popup-image");
    const publisher = document.getElementById("popup-publisher");
    const ingredientsList = document.getElementById("popup-ingredients");
    const directions = document.getElementById("popup-directions");

    try {
        // Fetch recipe details by ID
        const url = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`;
        const response = await fetch(url);
        const data = await response.json();
        const recipe = data.data.recipe;

        // Fill popup data
        title.textContent = recipe.title;
        image.src = recipe.image_url;
        publisher.textContent = recipe.publisher;
        if (recipe.instructions) {
            directions.textContent = recipe.instructions;
        } else {
            directions.innerHTML = `Instructions not available 😅<br>
  <a href="${recipe.source_url}" target="_blank">View full recipe here</a>`;
        }

        // Ingredients
        ingredientsList.innerHTML = "";
        recipe.ingredients.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${item.quantity || ""} ${item.unit || ""} ${item.description}`;
            ingredientsList.appendChild(li);
        });

        // Show popup
        popup.classList.remove("hidden");

    } catch (error) {
        console.error(error);
        alert("Error loading recipe details 😔");
    }
}

searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    getReceipes();
})
randomButton.addEventListener("click", (e) => {
    getRandomRecipe();
});

document.getElementById("close-popup").addEventListener("click", () => {
    document.getElementById("recipe-popup").classList.add("hidden");
});
