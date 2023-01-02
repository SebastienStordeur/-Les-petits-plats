import { createRecipeCard, emptySection } from "./recipeCards";
import { recipes } from "../data/recipes.json";

const recipeSection = document.querySelector(".recipe-section");
const searchInput = document.querySelector(".search-input") as HTMLInputElement;
let filteredRecipes: any = recipes;
const searchInputValue: string = searchInput.value;
const tagsList:string[] = []

/** Initialize UI elements and basic functionnalities */
function init() {
  createRecipeCard(recipes);
  createArrays(recipes);
  openTagsMenu()
  createArrays(filteredRecipes)
}

init();

export function filterRecipesWithWords(recipes: any) {
  /** if tagslist === 0 && searchinput is empty, reset  */

  if(tagsList.length === 0) {
    filteredRecipes = recipes.filter((recipe: any) => {
      const filterByName = recipe.name.toLowerCase().includes(searchInputValue.toLowerCase());
      const filterByDescription = recipe.description.toLowerCase().includes(searchInputValue.toLowerCase());
      const filterByIngredients = recipe.ingredients.filter(({ ingredient }:any) => ingredient.toLowerCase().includes(searchInputValue.toLowerCase())).length > 0; 
      return  filterByName || filterByDescription ||  filterByIngredients;
    });
  } else {
    filteredRecipes = filteredRecipes((recipe:any) => {
      const filterByName = recipe.name.toLowerCase().includes(searchInputValue.toLowerCase());
      const filterByDescription = recipe.description.toLowerCase().includes(searchInputValue.toLowerCase());
      const filterByIngredients = recipe.ingredients.filter(({ ingredient }:any) => ingredient.toLowerCase().includes(searchInputValue.toLowerCase())).length > 0; 
      return  filterByName || filterByDescription ||  filterByIngredients;
    })
  }

  emptySection();
  if (filteredRecipes.length === 0) {
    return recipeSection!.innerHTML = "<span class='error'>Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc</span>";
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



function assignArrayElements(ingredients: string[],appliances: string[], ustensils: string[]) {
  const ingredientsContainer = document.querySelector(".ingredients") as HTMLDivElement;
  const appliancesContainer = document.querySelector(".appliances") as HTMLDivElement;
  const ustensilsContainer = document.querySelector(".ustensils") as HTMLDivElement;

  for (const ingredient of ingredients) {
    const ingredientSpan = document.createElement("span");
    ingredientsContainer.appendChild(ingredientSpan);
    ingredientSpan.innerText = ingredient;
    ingredientSpan.classList.add('element')
    ingredientSpan.classList.add('ingredient-tag')
  }
  for (const appliance of appliances) {
    const applianceSpan = document.createElement("span");
    appliancesContainer.appendChild(applianceSpan);
    applianceSpan.innerText = appliance;
    applianceSpan.classList.add('element')
    applianceSpan.classList.add('appliance-tag')
  }
  for (const ustensil of ustensils) {
    const ustensilSpan = document.createElement("span");
    ustensilsContainer.appendChild(ustensilSpan);
    ustensilSpan.innerText = ustensil;
    ustensilSpan.classList.add('element')
    ustensilSpan.classList.add('ustensil-tag')
  }

  return { ingredientsContainer, appliancesContainer, ustensilsContainer };
} 

searchInput.addEventListener("input", () => {
  filterRecipesWithWords(recipes)
  createArrays(filteredRecipes)
});


function addTag() {
  const tagsMenu = document.querySelectorAll('.element')
  const tagsMenuArray = Array.from(tagsMenu)
  const tagList = document.querySelector('.tag-list') as HTMLDivElement

  for(let tag of tagsMenuArray) {
    
    tag.addEventListener('click', () => {console.log(tag)
      const newTag = document.createElement('span')
      tagList.appendChild(newTag)
      newTag.innerHTML = tag.innerHTML
      filterByTag(tag)  
      console.log(filteredRecipes)
      return filteredRecipes
    })
  } 
}

function filterByTag(tag:Element) {
  console.log(tag.innerHTML)
  if(tag.classList.contains('ingredient-tag')) {
    console.log('filtre')
    return console.log(filteredRecipes = filteredRecipes.filter((recipe:any) => {
      recipe.ingredients.some(({ ingredient }:any) => ingredient.includes(tag.innerHTML))
    }))
    
  }

  /** filter recipes by appliances */
  if(tag.classList.contains('appliance-tag')) {
    return filteredRecipes = filteredRecipes.filter((recipe:any) => recipe.appliance.includes(tag.innerHTML));
  }

  if(tag.classList.contains('ustensil-tag')) {
    return filteredRecipes = filteredRecipes.filter((recipe:any) => recipe.ustensils.includes(tag.innerHTML));
  }
}

addTag()


function openTagsMenu() {
  const menus = document.querySelectorAll('.filter')
  const menusArray = Array.prototype.slice.call(menus)

  for(let menu of menusArray) {
    menu.addEventListener('click', () => {
      menu.classList.add('open')
      menu.nextElementSibling.classList.add('show')
    })
  } 
}
openTagsMenu()