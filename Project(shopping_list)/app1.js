const recipesData = JSON.parse(localStorage.getItem("recipes"));

// if (notes) {
//   notes.forEach((note) => addNewNote(note));
// }
// addBtn.addEventListener("click", () => addNewNote());

const addBtn = document.getElementById("add_recipe");
addBtn.addEventListener("click", () => addNewNote());

const shoppingListBtn = document.getElementById("shopping_list");
shoppingListBtn.addEventListener("click", () => createShoppingList());

const PRODUCTS = [
  "salt",
  "sugar",
  "flour",
  "butter",
  "eggs",
  "milk",
  "oil",
  "garlic",
  "onion",
  "pepper",
  "tomato",
  "chicken",
  "rice",
  "cheese",
  "lemon",
  "vanilla",
  "cinnamon",
  "chocolate",
  "honey",
  "cream",
  "bacon",
  "potato",
  "parsley",
  "oregano",
  "thyme",
];

let noteCounter = 0;

function generateUniqueId() {
  noteCounter++;
  return noteCounter;
}

function addNewNote() {
  const noteId = generateUniqueId();
  const note = document.createElement("div");
  note.classList.add("note");
  note.dataset.id = noteId;

  const tools = document.createElement("div");
  tools.classList.add("tools");

  const main = document.createElement("div");
  main.classList.add("main");

  const recipeNameInput = document.createElement("input");
  recipeNameInput.type = "text";
  recipeNameInput.placeholder = "Recipe Name";
  recipeNameInput.classList.add("recipe-input");

  const addBtn = document.createElement("button");
  addBtn.classList.add("add");
  addBtn.innerHTML = '<i class="fas fa-plus"></i>';
  addBtn.addEventListener("click", () => addProductSelect(main)); // addProductSelect(ingredients)

  const saveBtn = document.createElement("button");
  saveBtn.classList.add("saveBtn");
  saveBtn.innerHTML = '<i class="fas fa-save"></i>';
  saveBtn.addEventListener("click", () => {
    saveLS();
  });

  const deleteNoteBtn = document.createElement("button");
  deleteNoteBtn.classList.add("deleteNote");
  deleteNoteBtn.innerHTML = '<i class="fas fa-times"></i>';
  deleteNoteBtn.addEventListener("click", () => {
    note.remove();
    updateLS(note);
  });

  const downloadBtn = document.createElement("button");
  downloadBtn.classList.add("downloadBtn");
  downloadBtn.innerHTML = '<i class="fas fa-download"></i>';
  downloadBtn.addEventListener("click", (event) => createDownload(event));

  tools.appendChild(addBtn);
  tools.appendChild(saveBtn);
  tools.appendChild(downloadBtn);
  tools.appendChild(deleteNoteBtn);

  main.appendChild(recipeNameInput);
  note.appendChild(tools);
  note.appendChild(main);

  document.body.appendChild(note);
}

function addProductSelect(parent) {
  const container = document.createElement("div");
  container.classList.add("product-container");

  // Create the options
  const select = document.createElement("select");
  select.classList.add("product-select");

  const noneOption = document.createElement("option");
  noneOption.value = "";
  noneOption.text = "Select product";
  select.add(noneOption);

  for (const product of PRODUCTS) {
    const option = document.createElement("option");
    option.value = product;
    option.text = product;
    select.add(option);
  }

  // Create the amount input
  const amountInput = document.createElement("input");
  amountInput.classList.add("amount-input");

  amountInput.type = "number";
  amountInput.min = 1;
  amountInput.max = 10000;
  amountInput.value = 1;

  //Create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  deleteBtn.addEventListener("click", () => {
    deleteIngredient(container, deleteBtn);
  });

  container.appendChild(select);
  container.appendChild(amountInput);
  container.appendChild(deleteBtn);

  parent.appendChild(container);
}

function saveLS() {
  const notes = document.querySelectorAll(".note");

  const savedRecipes = {};

  notes.forEach((note) => {
    const recipeId = note.dataset.id;
    const recipeNameInput = note.querySelector(".recipe-input");
    const productContainers = note.querySelectorAll(".product-container");

    const recipeName = recipeNameInput.value.trim();
    if (!recipeName) {
      alert("Please enter a recipe name.");
      return;
    }

    const ingredients = [];

    productContainers.forEach((container) => {
      const select = container.querySelector(".product-select");
      const amount = container.querySelector(".amount-input");
      const ingredient = {
        name: select.value.trim(),
        amount: amount.value.trim(),
      };
      ingredients.push(ingredient);
    });

    savedRecipes[recipeId] = {
      name: recipeName,
      ingredients: ingredients,
    };
    console.log("hello, I'm here!");
  });

  const recipesData = JSON.parse(localStorage.getItem("recipes")) || {};

  for (const recipeId in savedRecipes) {
    recipesData[recipeId] = savedRecipes[recipeId];
  }

  localStorage.setItem("recipes", JSON.stringify(recipesData));
}

function updateLS(note) {
  const recipeId = note.dataset.id;

  const recipesData = JSON.parse(localStorage.getItem("recipes")) || {};

  delete recipesData[recipeId];

  localStorage.setItem("recipes", JSON.stringify(recipesData));
}

function deleteIngredient(container, deleteBtn) {
  const parentContainer = container.parentElement;
  const recipeNameInput = parentContainer.querySelector(".recipe-input");
  const productContainers =
    parentContainer.querySelectorAll(".product-container");

  const recipeName = recipeNameInput.value.trim();
  if (!recipeName) {
    alert("Please enter a recipe name.");
    return;
  }

  const updatedIngredients = [];

  productContainers.forEach((container) => {
    if (container !== deleteBtn.parentElement) {
      const select = container.querySelector(".product-select");
      const amount = container.querySelector(".amount-input");
      const ingredient = {
        product: select.value.trim(),
        amount: amount.value.trim(),
      };
      updatedIngredients.push(ingredient);
    }
  });

  const updatedRecipe = {
    "recipe name": recipeName,
    ingredients: updatedIngredients,
  };

  const recipesData = JSON.parse(localStorage.getItem("recipes")) || {};
  for (const recipeId in recipesData) {
    if (recipesData[recipeId]["recipe name"] === recipeName) {
      recipesData[recipeId] = updatedRecipe;
      break;
    }
  }

  localStorage.setItem("recipes", JSON.stringify(recipesData));

  container.remove();
}

function createDownload(event) {
  const selectedNote = event.target.closest(".note");
  const recipeName = selectedNote.querySelector(".recipe-input").value.trim();

  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const recipe = recipes.find((r) => r["recipe name"] === recipeName);

  if (!recipe) {
    console.log("Recipe not found.");
    return;
  }

  const shoppingListContent = recipe.ingredients
    .map((ingredient) => `${ingredient.product} ${ingredient.amount}`)
    .join("\n");

  const blob = new Blob([shoppingListContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${recipeName}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function createShoppingList() {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const shoppingList = {};

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const { product, amount } = ingredient;
      if (shoppingList[product]) {
        shoppingList[product] += parseInt(amount);
      } else {
        shoppingList[product] = parseInt(amount);
      }
    });
  });

  const shoppingListContent = Object.entries(shoppingList)
    .map(([product, amount]) => `${product} ${amount}`)
    .join("\n");

  if (!shoppingListContent) {
    alert("Shopping list is empty.");
    return;
  }
  const blob = new Blob([shoppingListContent], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "shopping-list.txt";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
