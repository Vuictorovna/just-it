// import products from './products.js'
// const { products } = require('./products.js')

const addBtn = document.getElementById("add")
const notes = JSON.parse(localStorage.getItem("notes"))

if (notes) {
  notes.forEach((note) => addNewNote(note))
}
addBtn.addEventListener("click", () => addNewNote())

const shoppingListBtn = document.getElementById("shopping_list")
shoppingListBtn.addEventListener("click", () => createShoppingList())

const PRODUCTS = ["Apples", "Oranges", "Bananas", "Grapes"]

function addNewNote() {
    const note = document.createElement("div")
    note.classList.add("note")

    const tools = document.createElement("div")
    tools.classList.add("tools")

    const main = document.createElement("div")
    main.classList.add("main")

    const buttons = document.createElement("div")
    buttons.classList.add("buttons")

    const recipeNameInput = document.createElement("input")
    recipeNameInput.type = "text"
    recipeNameInput.placeholder = "Recipe Name"
    recipeNameInput.classList.add("recipe-input")

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit")
    editBtn.innerHTML = '<i class="fas fa-edit"></i>'
    editBtn.addEventListener("click", () => addProductSelect(main))

    const submitBtn = document.createElement("button")
    submitBtn.type = "button"
    submitBtn.textContent = "Add"
    submitBtn.addEventListener("click", () => updateLS())

    const deleteNoteBtn = document.createElement("button")
    deleteNoteBtn.classList.add("deleteNote")
    deleteNoteBtn.innerHTML = '<i class="fas fa-times"></i>'
    deleteNoteBtn.addEventListener("click", () => {
        note.remove()
        updateLS()
    })

    const downloadBtn = document.createElement("button")
    downloadBtn.textContent = "Download"
    downloadBtn.addEventListener("click", (event) => createDownload(event))

    tools.appendChild(deleteNoteBtn)
    tools.appendChild(downloadBtn)
    buttons.appendChild(editBtn)
    buttons.appendChild(submitBtn)

    main.appendChild(recipeNameInput)
    main.appendChild(buttons)
    note.appendChild(tools)
    note.appendChild(main)

    document.body.appendChild(note)
}

function addProductSelect(parent) {
    const container = document.createElement("div")
    container.classList.add("product-container")

    // Create the options
    const select = document.createElement("select")
    select.classList.add("product-select")

    const noneOption = document.createElement("option")
    noneOption.value = ""
    noneOption.text = "Select product"
    select.add(noneOption)

    for (const product of PRODUCTS) {
        const option = document.createElement("option")
        option.value = product
        option.text = product
        select.add(option)
    }

    // Create the amount input
    const amountInput = document.createElement("input")
    amountInput.classList.add("amount-input")

    amountInput.type = "number"
    amountInput.min = 1
    amountInput.max = 10000
    amountInput.value = 1

    //Create delete button
    const deleteBtn = document.createElement("button")
    deleteBtn.classList.add("delete")
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>'
    deleteBtn.addEventListener("click", () => {
        container.remove()
        updateLS()
    })

    container.appendChild(select)
    container.appendChild(amountInput)
    container.appendChild(deleteBtn)

    parent.appendChild(container)

    // Set the display style
    container.style.display = "inline-block"
    container.style.marginRight = "10px"
}

function updateLS() {
    const notes = document.querySelectorAll(".note")

    const savedRecipes = []

    notes.forEach((note) => {
      const recipeNameInput = note.querySelector(".recipe-input")
      const productContainers = note.querySelectorAll(".product-container")

      const recipeName = recipeNameInput.value.trim()
      if (!recipeName) {
        alert("Please enter a recipe name.")
        return
      }

      const ingredients = []

      productContainers.forEach((container) => {
        const select = container.querySelector(".product-select")
        const amount = container.querySelector(".amount-input")
        const ingredient = {
          product: select.value.trim(),
          amount: amount.value.trim()
        }
        ingredients.push(ingredient)
      })

      const recipe = {
        "recipe name": recipeName,
        "ingredients": ingredients
      }

      savedRecipes.push(recipe)
    })

    localStorage.setItem("recipes", JSON.stringify(savedRecipes))
}

function createDownload(event) {
    const selectedNote = event.target.closest('.note')
    const recipeName = selectedNote.querySelector('.recipe-input').value.trim()

    const recipes = JSON.parse(localStorage.getItem("recipes")) || []
    const recipe = recipes.find((r) => r["recipe name"] === recipeName)

    if (!recipe) {
        console.log("Recipe not found.")
        return
    }

    const shoppingListContent = recipe.ingredients
        .map((ingredient) => `${ingredient.product} ${ingredient.amount}`)
        .join("\n")

    const blob = new Blob([shoppingListContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${recipeName}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

function createShoppingList() {
  const recipes = JSON.parse(localStorage.getItem("recipes")) || []
  const shoppingList = {}

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const { product, amount } = ingredient
      if (shoppingList[product]) {
        shoppingList[product] += parseInt(amount)
      } else {
        shoppingList[product] = parseInt(amount)
      }
    })
  })

  const shoppingListContent = Object.entries(shoppingList)
    .map(([product, amount]) => `${product} ${amount}`)
    .join("\n")

  if (!shoppingListContent) {
    alert("Shopping list is empty.")
    return
  }
  const blob = new Blob([shoppingListContent], { type: "text/plain" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = "shopping-list.txt"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  }

