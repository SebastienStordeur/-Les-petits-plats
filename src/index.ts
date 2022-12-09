import { createRecipeCard } from "./recipeCards";
import { recipes } from "../data/recipes.json";
/* import { filterRecipesWithWords } from "./searchRecipes"; */


const recipeSection = document.querySelector('.recipe-section');
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
let filteredRecipes:any = recipes

/** Initialize UI elements and basic functionnalities */

function init() {
  createRecipeCard(recipes);
  createArrays(recipes)
}

init()

export function filterRecipesWithWords(recipes: any) {
  const searchInputValue:string = searchInput.value;
  
  console.log(filteredRecipes)
  filteredRecipes = recipes.filter((recipe:any) => {
    const filterByName = recipe.name.toLowerCase().includes(searchInputValue.toLowerCase())
    const filterByDescription = recipe.description.toLowerCase().includes(searchInputValue.toLowerCase())
    /* const filterByIngredients = recipe.ingredients.filter(({ ingredient : any  }) => ingredient.toLowerCase().includes(searchInputValue.toLowerCase())).length > 0; */
    return filterByName || filterByDescription
  })

  if(filteredRecipes.length === 0) {
    recipeSection!.innerHTML =  "<span class='error'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</span>"
  }
  
}

/** Create arrays for the tag filters */

function createArrays(recipes:any) {
  const ingredientsArray: string[] = []
  const appliancesArray: string[] = []
  const ustensilsArray: string[] = []

  for(const recipe of recipes) {
    for(const ingredient of recipe.ingredients) {
      if(!ingredientsArray.includes(ingredient.ingredient)) {
        ingredientsArray.push(ingredient.ingredient)
      }
    }

    if(!appliancesArray.includes(recipe.appliance)) {
      appliancesArray.push(recipe.appliance)
    }

     for(const ustensil of recipe.ustensils) {
      if(!ustensilsArray.includes(ustensil)) {
        ustensilsArray.push(ustensil)
      }
     }
  }
  return { ingredientsArray, appliancesArray, ustensilsArray }
}


searchInput.addEventListener('input', () =>  filterRecipesWithWords(recipes) )
createArrays(recipes)