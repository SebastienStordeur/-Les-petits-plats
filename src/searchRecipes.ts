/** Filter recipes with search input value */
/* 
const searchInput = document.querySelector(".search-input") as HTMLInputElement;

export function filterRecipesWithWords(recipes: any) {
  console.log(recipes);

  
  const searchInputValue:string = searchInput.value;
  let filteredRecipes:any = []

  if(searchInputValue) {
    return filteredRecipes = recipes.title.filter((recipe:any) => {
      recipe.title.toLowerCase().includes(searchInputValue.toLowerCase())
    })
  }
console.log('filter',filteredRecipes)
}

searchInput.addEventListener('input', filterRecipesWithWords(recipes)) */