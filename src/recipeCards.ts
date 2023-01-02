interface recipe {
  id: number;
  name: string;
  servings: number;
  ingredients: {
    ingredient: string;
    quantity?: number;
    unit?: undefined | string | number;
  }[];
  time: number;
  description: string;
  appliance: string;
  ustensils: string[];
}

class Recipe {
  id: number;
  name: string;
  description: string;
  time: number;
  ingredients: {
    ingredient: string;
    quantity?: number;
    unit?: string | number;
  }[];
  ustensils: string[];

  constructor(data: recipe) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.time = data.time;
    this.ingredients = data.ingredients;
    this.ustensils = data.ustensils;
  }

  emptySection(): Element | null {
    const recipeSection = document.querySelector(".recipe-section");
    recipeSection!.innerHTML = "";
    return recipeSection;
  }

  createCard(): HTMLElement {
    const card = document.createElement("article");
    const image = document.createElement("div");
    const infos = document.createElement("div");
    const header = document.createElement("header");
    const recipeDetails = document.createElement("div");
    const ingredientList = document.createElement("ul");
    const description = document.createElement("p");

    card.classList.add("recipe-card");
    image.classList.add("recipe-img");
    infos.classList.add("recipe-infos");

    card.appendChild(image);
    card.appendChild(infos);
    infos.appendChild(header);
    infos.appendChild(recipeDetails);
    recipeDetails.appendChild(ingredientList);
    recipeDetails.appendChild(description);

    for (let ingredient of this.ingredients) {
      const ingredientItem = document.createElement("p");
      ingredientList.appendChild(ingredientItem);
      if (!ingredient.quantity && !ingredient.unit) {
        ingredientItem.innerHTML = `<span class="ingredient-name">${ingredient.ingredient}</span>`;
      } else if (!ingredient.unit) {
        ingredientItem.innerHTML = `<span class="ingredient-name">${ingredient.ingredient}: </span>` + ingredient.quantity;
      } else
        ingredientItem.innerHTML = `<span class="ingredient-name">${ingredient.ingredient}: </span>` + ingredient.quantity + " " + ingredient.unit;
    }

    header.innerText = this.name;
    description.textContent = this.description;
    return card;
  }
}

export function emptySection() {
  const recipeSection = document.querySelector(".recipe-section") as HTMLDivElement;
  recipeSection.innerHTML = "";
  return recipeSection;
}
export function createRecipeCard(recipes: any[]): HTMLElement {
  const recipeSection = document.querySelector(".recipe-section") as HTMLElement;
  for (let recipe of recipes) {
    recipeSection.appendChild(new Recipe(recipe).createCard());
  }
  return recipeSection;
}
