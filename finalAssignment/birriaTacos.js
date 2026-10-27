// Jason Schmitz 10/26/2026 Final Assignment Birria Tacos

const ingredients = [
	{ quantity: 3, text: "lb chuck roast" },
	{ quantity: "", text: "Salt and pepper for the beef" },
	{ quantity: "", text: "Oil for searing (Avocado oil)" },
	{ quantity: "", text: "Water to cover the beef" },
	{ quantity: 9, text: "guajillo chiles" },
	{ quantity: 1, text: "sweet onion" },
	{ quantity: 8, text: "garlic cloves" },
	{ quantity: 2, text: "chipotle peppers with adobo sauce" },
	{ quantity: 0.25, text: "cup tomato paste" },
	{ quantity: 3, text: "tbsp apple cider vinegar" },
	{ quantity: 1, text: "tbsp chicken bouillon" },
	{ quantity: 0.5, text: "tsp black pepper" },
	{ quantity: 0.5, text: "tsp white pepper" },
	{ quantity: 1, text: "tbsp beef bouillon" },
	{ quantity: 1, text: "tbsp brown sugar" },
	{ quantity: 2, text: "tsp smoked paprika" },
	{ quantity: 2, text: "tsp oregano" },
	{ quantity: 0.5, text: "tsp thyme" },
	{ quantity: 0.25, text: "tsp ground cloves" },
	{ quantity: 0.25, text: "tsp cinnamon" },
	{ quantity: 1, text: "tbsp salt, adjusted to taste" },
	{ quantity: 0.5, text: "tsp cumin" },
	{ quantity: 4, text: "bay leaves" },
	{ quantity: 0.5, text: "cup neutral oil (Avocado oil)" },
	{ quantity: "", text: "Flour taco tortillas" },
	{ quantity: "", text: "Monterey jack cheese" },
	{ quantity: "", text: "Lime wedges" },
	{ quantity: 1, text: "red onion" },
	{ quantity: 2, text: "bunches of cilantro" }
];

let multiplier = 1;

const ingredientList = document.getElementById("ingredientList");
const assemblyList = document.querySelector("#assemblyList");
const groceryList = document.querySelector("#groceryList");
const groceryForm = document.querySelector("#groceryForm");
const extraItem = document.querySelector("#extraItem");
const quantity = document.querySelector("#quantity");
const message = document.querySelector("#message");
const pageAddress = document.querySelector("#pageAddress");
const connectionStatus = document.querySelector("#connectionStatus");
const doubleButton = document.querySelector("#doubleBtn");
const tripleButton = document.querySelector("#tripleBtn");
const sizeMessage = document.querySelector("#sizeMessage");

ingredients.forEach(function (ingredient, index) {
	const listItem = document.createElement("li");
	const span = document.createElement("span");
	const addButton = document.createElement("button");

	if (ingredient.quantity === "") {
		span.textContent = ingredient.text;
	} else {
		span.textContent = `${ingredient.quantity} ${ingredient.text}`;
	}

	addButton.textContent = "Add";
	addButton.classList.add("addBtn");

	listItem.appendChild(span);
	listItem.appendChild(addButton);

	if (index < ingredients.length - 5) {
		ingredientList.appendChild(listItem);
	} else {
		assemblyList.appendChild(listItem);
	}
});

function updateIngredients() {
	ingredients.forEach(function (ingredient, index) {
		let listItem;

		if (index < ingredients.length - 5) {
			listItem = ingredientList.children[index];
		} else {
			const assemblyIndex = index - ingredientList.children.length;
			listItem = assemblyList.children[assemblyIndex];
		}

		const span = listItem.children[0];

		if (ingredient.quantity === "") {
			span.textContent = ingredient.text;
		} else {
			span.textContent =
				`${ingredient.quantity * multiplier} ${ingredient.text}`;
		}
	});

	doubleButton.classList.remove("selected");
	tripleButton.classList.remove("selected");

	if (multiplier === 2) {
		doubleButton.classList.add("selected");
	} else if (multiplier === 3) {
		tripleButton.classList.add("selected");
	}

	if (multiplier === 1) {
		sizeMessage.textContent = "Recipe size: Original";
	} else {
		sizeMessage.textContent = `Recipe size: ${multiplier}x`;
	}
}

function handleDoubleClick() {
	if (multiplier === 2) {
		multiplier = 1;
	} else {
		multiplier = 2;
	}

	updateIngredients();
}

function handleTripleClick() {
	if (multiplier === 3) {
		multiplier = 1;
	} else {
		multiplier = 3;
	}

	updateIngredients();
}

function addGroceryItem(text) {
	const listItem = document.createElement("li");
	const span = document.createElement("span");
	const removeButton = document.createElement("button");

	span.textContent = text;

	removeButton.textContent = "Remove";
	removeButton.classList.add("removeBtn");

	listItem.appendChild(span);
	listItem.appendChild(removeButton);
	groceryList.appendChild(listItem);
}

// Add clicks bubble up to the ingredient list.
// The event listener on the list handles those clicks.
function handleIngredientClick(event) {
	if (event.target.classList.contains("addBtn")) {
		const listItem = event.target.parentElement;
		const span = listItem.children[0];

		addGroceryItem(span.textContent);
	}
}

function handleGrocerySubmit(event) {
	event.preventDefault();

	const item = groceryForm.elements.extraItem.value.trim();
	const itemQuantity = groceryForm.elements.quantity.value.trim();

	if (item !== "" && itemQuantity !== "") {
		addGroceryItem(`${itemQuantity} ${item}`);

		localStorage.setItem("extraItem", item);
		localStorage.setItem("quantity", itemQuantity);

		message.textContent = "";
		extraItem.value = "";
		quantity.value = "";
	} else {
		message.textContent = "Enter an item and quantity.";
	}
}

// Remove clicks bubble up to the grocery list.
// The event listener on the list handles those clicks.
function handleGroceryClick(event) {
	if (event.target.classList.contains("removeBtn")) {
		event.target.parentElement.remove();
	}
}

pageAddress.textContent = `Page address: ${window.location.href}`;

if (navigator.onLine) {
	connectionStatus.textContent = "You are online.";
} else {
	connectionStatus.textContent =
		"You are offline. An internet connection is needed to open the original recipe.";
}

const savedItem = localStorage.getItem("extraItem");
const savedQuantity = localStorage.getItem("quantity");

if (savedItem !== null && savedQuantity !== null) {
	console.log(`Saved extra item: ${savedQuantity} ${savedItem}`);
}

ingredientList.addEventListener("click", handleIngredientClick);
assemblyList.addEventListener("click", handleIngredientClick);
doubleButton.addEventListener("click", handleDoubleClick);
tripleButton.addEventListener("click", handleTripleClick);
groceryForm.addEventListener("submit", handleGrocerySubmit);
groceryList.addEventListener("click", handleGroceryClick);

/*
Easiest JavaScript feature:
Creating the ingredient array was easiest because it was like
the array of book objects in my Book Explorer assignment.

Most challenging part:
The 2x and 3x buttons were the most challenging.  They were similar
to the navigation buttons in my Pet Card assignment because clicking
a button changed a variable and then updated the page.  I used that
same idea with a multiplier to double or triple the ingredient
quantities.  An if statement checks whether that size is already
selected.  If it is, the multiplier goes back to 1.  Each calculation
uses the original quantities in the array so the amounts do not
keep multiplying when I switch buttons.

How I used events:
I used click events to add and remove grocery items, similar
to adding and deleting songs in my Playlist assignment.  I also
used clicks to change the recipe size.  The submit event worked
like my Browser Info Dashboard form and prevented the page
from reloading.

How I used storage:
I used localStorage to save the last extra item entered by the user
and its quantity, similar to saving a name in my Browser Info
Dashboard assignment.  When the page loads again, it retrieves the
saved information and shows it in the console.  I really wasn't sure
how to complete this step in a way that made it useful for the page,
but I think I demonstrated how to store and retrieve information.
*/
