var links = document.querySelectorAll(".nav-item .nav-link");
for (let i = 0; i < links.length; i++) {
  links[i].addEventListener(`click`, function (e) {
    getData(e.target.text);
    document.getElementById(`h1`).innerHTML = e.target.text;
  });
}
getData(`cauliflower`);
var recipes = [];
function getData(meal) {
  httpRequest = new XMLHttpRequest();
  httpRequest.open(
    "Get",
    `https://forkify-api.herokuapp.com/api/search?q=${meal}`
  );
  httpRequest.send();
  httpRequest.addEventListener("readystatechange", function () {
    if (this.readyState === 4 && httpRequest.status == 200) {
      recipes = JSON.parse(httpRequest.response).recipes;
      console.log(recipes);
      diplayDataRes();
    }
  });
}

function diplayDataRes() {
  var bBox = "";
  for (let i = 0; i < recipes.length; i++) {
    bBox += `<div class="col-6 col-sm-4 col-md-3 gy-3 gx-5 ">
        <div class="recipes  row  ">
            <img src="${recipes[i].image_url}" class="w-100 imageRes  rounded-5">
            <h5 class="text-center m-2">${recipes[i].title}</h5>
            <div class=" d-flex justify-content-center  align-items-end  ">
            <a class="btn btn-info fw-bold " target="_blank" href="${recipes[i].source_url}">Source</a>
            <a onclick= getRecipeDetailes(${recipes[i].recipe_id}) class="btn btn-danger mt-auto" target="_blank" href=""data-bs-toggle="modal" data-bs-target="#exampleModal">Details</a>
            </div>
            </div>
        </div>
        
        
        `;
  }
  document.getElementById("postsData").innerHTML = bBox;
}
async function getRecipeDetailes(recipeId) {
  var response = await fetch(
    `https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`
  );
  var recipeData = await response.json();
  var recipeData = recipeData.recipe;
  var recipe = `
    <img src="${recipeData.image_url}" class="w-100 imageRes rounded-5 m-2">
    <h5 class=" fw-bold">${recipeData.publisher}</h5>
    <p class="m-2 ">${recipeData.ingredients}</p>
    `;
  document.getElementById("modal-body").innerHTML = recipe;
}
