// Jason Schmitz 10/4/2026 Week 5 Song Playlist

const playlistContainer = document.querySelector("#playlistContainer");
const addButton = document.querySelector("#addBtn");
const songTitle = document.querySelector("#songTitle");
const songArtist = document.querySelector("#songArtist");
const clearButton = document.querySelector("#clearBtn");

function addSong(title, artist) {
	const article = document.createElement("article");
	article.classList.add("songCard");

	const span = document.createElement("span");
	span.textContent = `${title} - ${artist}`;

	const deleteButton = document.createElement("button");
	deleteButton.textContent = "Delete";
	deleteButton.classList.add("deleteBtn");

	article.appendChild(span);
	article.appendChild(deleteButton);
	playlistContainer.appendChild(article);
}

function handleAddButtonClick() {
	const title = songTitle.value.trim();
	const artist = songArtist.value.trim();

	if (title !== "" && artist !== "") {
		addSong(title, artist);
		songTitle.value = "";
		songArtist.value = "";
	}
}

addButton.addEventListener("click", handleAddButtonClick);

function handleDeleteClick(event) {
	console.log("Click bubbled to container:", event.target);

	if (event.target.classList.contains("deleteBtn")) {
		event.target.parentElement.remove();
	}
}

playlistContainer.addEventListener("click", handleDeleteClick);

function handleClearButtonClick() {
	playlistContainer.textContent = "";
}

clearButton.addEventListener("click", handleClearButtonClick);
