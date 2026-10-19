// Jason Schmitz 10/18/2026 Browser Info Dashboard

console.log(`Page URL: ${window.location.href}`);
console.log(`Browser language: ${navigator.language}`);
console.log(`Browser online: ${navigator.onLine}`);
console.log(`Screen width: ${screen.width}`);
console.log(`Screen height: ${screen.height}`);

console.log(`Window width: ${window.innerWidth}`);
console.log(`Window height: ${window.innerHeight}`);

const form = document.querySelector("#form");
const output = document.querySelector("#output");

function handleFormSubmit(event) {
	event.preventDefault();

	const name = form.elements.name.value;
	const website = form.elements.website.value;

	output.textContent = `Name: ${name}, Favorite website: ${website}`;

	const url = new URL(website);

	console.log(`Hostname: ${url.hostname}`);
	console.log(`Protocol: ${url.protocol}`);
	console.log(`Pathname: ${url.pathname}`);
	
	localStorage.setItem("name", name);

	const savedName = localStorage.getItem("name");
	console.log(`Saved name: ${savedName}`);
	
	sessionStorage.setItem("website", website);

	const savedWebsite = sessionStorage.getItem("website");
	console.log(`Saved website: ${savedWebsite}`);
}

form.addEventListener("submit", handleFormSubmit);

const nameField = form.elements.name;

function handleNameFocus() {
	console.log("Name field selected.");
}

function handleNameBlur() {
	console.log("Name field left.");
}

nameField.addEventListener("focus", handleNameFocus);
nameField.addEventListener("blur", handleNameBlur);
