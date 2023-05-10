const addBtn = document.getElementById("add")

const notes = JSON.parse(localStorage.getItem("notes"))

if (notes) {
  notes.forEach((note) => addNewNote(note))
}

addBtn.addEventListener("click", () => addNewNote())

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

    const editBtn = document.createElement("button")
    editBtn.classList.add("edit")
    editBtn.innerHTML = '<i class="fas fa-edit"></i>'
    editBtn.addEventListener("click", () => {
        addProductSelect(main)
    })

    const deleteNoteBtn = document.createElement("button")
    deleteNoteBtn.classList.add("deleteNote")
    deleteNoteBtn.innerHTML = '<i class="fas fa-times"></i>'
    deleteNoteBtn.addEventListener("click", () => {
        note.remove()
        updateLS()
    })

    const downloadBtn = document.createElement("button")
    downloadBtn.textContent = "Download"
    downloadBtn.addEventListener("click", () => {
        createShoppingList()
    })

    tools.appendChild(deleteNoteBtn)
    tools.appendChild(downloadBtn)
    buttons.appendChild(editBtn)

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

    //Create submit button
    const submitBtn = document.createElement("button")
    submitBtn.type = "button"
    submitBtn.textContent = "Add"
    submitBtn.addEventListener("click", () => {
        updateLS()
    })

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
    container.appendChild(submitBtn)
    container.appendChild(deleteBtn)

    parent.appendChild(container)

    // Set the display style
    container.style.display = "inline-block"
    container.style.marginRight = "10px"
}

function removeProductSelect(selectContainer) {
    const amountInput = selectContainer.querySelector(".amount-input")
    const submitBtn = selectContainer.querySelector("button[type='button']")
    selectContainer.removeChild(amountInput)
    selectContainer.removeChild(submitBtn)
    selectContainer.remove()
}


function updateLS() {
    const productContainers = document.querySelectorAll(".product-container")
    const notes = []

    productContainers.forEach((container) => {
        const select = container.querySelector(".product-select")
        const amount = container.querySelector(".amount-input")
        const note = {
            product: select.value,
            amount: amount.value
        }
        notes.push(note)
    })

    localStorage.setItem("notes", JSON.stringify(notes))
}


function createShoppingList() {
    const notes = JSON.parse(localStorage.getItem("notes")) || []
    const shoppingListContent = notes.map((note) => `${note.product} ${note.amount}`).join("\n")
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

