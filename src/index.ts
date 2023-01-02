import { createRecipeCard, emptySection } from "./recipeCards";
import { recipes } from "../data/recipes.json";
/* import { filterRecipesWithWords } from "./searchRecipes"; */

const recipeSection = document.querySelector(".recipe-section");
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
let filteredRecipes: any = recipes;

/** Initialize UI elements and basic functionnalities */
function init() {
  createRecipeCard(recipes);
  createArrays(recipes);
}

init();

export function filterRecipesWithWords(recipes: any) {
  const searchInputValue: string = searchInput.value;

  filteredRecipes = recipes.filter((recipe: any) => {
    const filterByName = recipe.name.toLowerCase().includes(searchInputValue.toLowerCase());
    const filterByDescription = recipe.description.toLowerCase().includes(searchInputValue.toLowerCase());
    /* const filterByIngredients = recipe.ingredients.filter(({ ingredient : any  }) => ingredient.toLowerCase().includes(searchInputValue.toLowerCase())).length > 0; */
    return filterByName || filterByDescription;
  });
  emptySection();
  if (filteredRecipes.length === 0) {
    recipeSection!.innerHTML = "<span class='error'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</span>";
  }
  return createRecipeCard(filteredRecipes);
}

/** Create arrays for the tag filters */

function createArrays(recipes: any) {
  const ingredientsArray: string[] = [];
  const appliancesArray: string[] = [];
  const ustensilsArray: string[] = [];

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      if (!ingredientsArray.includes(ingredient.ingredient)) {
        ingredientsArray.push(ingredient.ingredient);
      }
    }

    if (!appliancesArray.includes(recipe.appliance)) {
      appliancesArray.push(recipe.appliance);
    }

    for (const ustensil of recipe.ustensils) {
      if (!ustensilsArray.includes(ustensil)) {
        ustensilsArray.push(ustensil);
      }
    }
  }
  assignArrayElements(ingredientsArray, appliancesArray, ustensilsArray);
  return { ingredientsArray, appliancesArray, ustensilsArray };
}



function assignArrayElements(ingredients: any[],appliances: any[], ustensils: any[]) {
  const ingredientsContainer = document.querySelector(".ingredients") as HTMLDivElement;
  const appliancesContainer = document.querySelector(".appliances") as HTMLDivElement;
  const ustensilsContainer = document.querySelector(".ustensils") as HTMLDivElement;

  for (const ingredient of ingredients) {
    const ingredientSpan = document.createElement("span");
    ingredientsContainer.appendChild(ingredientSpan);
    ingredientSpan.innerText = ingredient;
  }
  for (const appliance of appliances) {
    const applianceSpan = document.createElement("span");
    appliancesContainer.appendChild(applianceSpan);
    applianceSpan.innerText = appliance;
  }
  for (const ustensil of ustensils) {
    const ustensilSpan = document.createElement("span");
    ustensilsContainer.appendChild(ustensilSpan);
    ustensilSpan.innerText = ustensil;
  }

  return { ingredientsContainer, appliancesContainer, ustensilsContainer };
} 

searchInput.addEventListener("input", () => filterRecipesWithWords(recipes));
createArrays(recipes);


function openTagsMenu() {
  const menus = document.querySelectorAll('.filter')
  const itemsContainer = document.querySelectorAll('.container')
  const menusArray = Array.prototype.slice.call(menus)
  const itemsContainerArray = Array.prototype.slice.call(itemsContainer)

   for(let menu of menusArray) {
    menu.addEventListener('click', (index:number) => {
      console.log(index)
      menu.classList.add('open')
      itemsContainerArray[index].classList.add('show')
    })

  } 
}
openTagsMenu()