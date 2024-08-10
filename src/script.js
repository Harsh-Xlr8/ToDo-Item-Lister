const listContainer = document.getElementById("list-container");
const formElement = document.getElementById("form");
const searchField = document.getElementById("search-item");

listContainer.addEventListener("click", handleDeleteItem);
formElement.addEventListener("submit", handleAddItem);
searchField.addEventListener("keyup", handleFilterItem);

let itemList = [];

// Function to add a new item

function handleAddItem(event) {
  event.preventDefault();
  const inputField = document.getElementById("form-input");
  const newItem = inputField.value.trim();
  if (newItem !== "") {
    itemList.push(newItem);
    inputField.value = "";
    renderItems(itemList);
  }
}

// Function to delete an item

function handleDeleteItem(event) {
  if (event.target.classList.contains("delete-btn")) {
    const confirmation = confirm("Are you sure you want to delete this item?");
    if (confirmation) {
      const itemElement = event.target.parentElement;
      const itemText = itemElement.querySelector("p").textContent;
      itemList = itemList.filter((item) => item !== itemText);
      renderItems(itemList);
    }
  }
}

// Function to filter the item list

function handleFilterItem() {
  const searchTerm = searchField.value.trim().toLowerCase();
  if (searchTerm === "") {
    renderItems(itemList);
  } else {
    const filteredList = itemList.filter((item) =>
      item.toLowerCase().includes(searchTerm)
    );
    renderItems(filteredList);
  }
}

// Function to render items to the DOM

function renderItems(items) {
  listContainer.innerHTML = "";

  if (items.length === 0) {
    listContainer.innerHTML = `<li class="text-center">No items found!</li>`;
    return;
  }

  items.forEach((item) => {
    const listItemElement = document.createElement("li");
    listItemElement.className =
      "px-10 py-4 border-2 border-slate-200 flex justify-between items-center";
    listItemElement.innerHTML = `
      <p class="text-lg">${item}</p>
      <button class="py-2 px-4 bg-red-600 text-white rounded-md delete-btn">X</button>
    `;
    listContainer.appendChild(listItemElement);
  });
}
