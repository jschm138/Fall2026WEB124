// Jason Schmitz 9/7/26 Week 2 Pet Card Creator

"use strict";


//  PET CONSTRUCTOR FUNCTION

//  Complete the constructor function to assign parameter values to instance properties using 'this'.
function Pet(name, type, age, owner = null, id = " ", image = "") {
  // Example: this.name = name;
  // Assign type, age, owner, id, and image properties below:
  this.name = name;
  this.type = type;
  this.age = age;
  this.owner = owner;
  this.id = id;
  this.image = image;
}

// PROTOTYPE METHODS
// Complete each prototype method according to its instructions.

Pet.prototype.getDescription = function () {
  // Return a string formatted like: "Stanley is a cat and is 6 years old."
  return `${this.name} is a ${this.type} and is ${this.age} years old.`;
};
 
Pet.prototype.haveBirthday = function () {
  // Increase the pet's age property by 1
  this.age += 1;
};

Pet.prototype.getOwnerName = function () {
  // Return owner's name using optional chaining (?.), or "none" if null
  return this.owner?.name ?? "none";
};

Pet.prototype.getOwnerPhone = function () {
  // Return owner's phone using optional chaining (?.), or "No phone on file"
  return this.owner?.phone ?? "No phone on file";
};

Pet.prototype.getID = function () {
  // Return the pet's id property
  return this.id;
};


// OBJECT INSTANTIATION & CONSOLE LOGGING

const owner1 = { name: "Sarah", phone: "555-0199" };
const owner2 = { name: "Alex", phone: "555-0142" };

// Instantiate 2 Pet objects using 'new Pet(...)' with image filenames for the dog and parrot
const pet1 = new Pet("Stanley", "cat", 6, owner1, "pet1", "cat.webp");
const pet2 = new Pet("Echo", "dog", 4, owner2, "pet2", "dog.webp");
const pet3 = new Pet("SquawksALot", "parrot", 12, null, "pet3", "parrots.jpg");

const pets = [pet1, pet2, pet3];

//  Use Array.prototype.forEach() to log each pet's details to the browser console.
// Log Name, Type, Age, Owner Name, Owner Phone, and ID.
pets.forEach(function (pet) {
  // Write your console.log statements here:
  console.log(`Name: ${pet.name}`);
  console.log(`Type: ${pet.type}`);
  console.log(`Age: ${pet.age}`);
  console.log(`Owners Name: ${pet.getOwnerName()}`);
  console.log(`Owners Phone: ${pet.getOwnerPhone()}`);
  console.log(`ID: ${pet.getID()}`);
});

pet1.haveBirthday();
console.log(`${pet1.name} had a birthday! They are now ${pet1.age}.`);

console.log(new Date());

// DOM SELECTION

let currentIndex = 0;

// Select the DOM elements using document.querySelector().
// Double check that element IDs match your HTML file exactly!
const headingElement = document.querySelector("#galleryHeading");
//finish the DOM definitions for PetImage, petName, petDetails, petOwner,OwnerPhone, and petID
const petImageElement = document.querySelector("#PetImage");
const petNameElement = document.querySelector("#petName");
const petDetailsElement = document.querySelector("#petDetails");
const petOwnerElement = document.querySelector("#petOwner");
const ownerPhoneElement = document.querySelector("#ownerPhone");
const petIdElement = document.querySelector("#petID");

const nextButton = document.querySelector("#next");
const prevButton = document.querySelector("#prev");

// DISPLAY LOGIC & NAVIGATION

//  Write the showPet function to update DOM elements with current pet data.
function showPet(index) {
  const pet = pets[index];

  // 1. Update gallery heading text content (e.g., "Pet 1 of 3")
  headingElement.textContent = `Pet ${index + 1} of ${pets.length}`;

  // 2. Update pet image src and alt attributes safely if petImageElement exists
  if (petImageElement) {
    petImageElement.src = pet.image;
    petImageElement.alt = `Photo of ${pet.name}`;
  }

  // 3. Update text content for name, details, owner, phone, and ID elements using prototype methods
  petNameElement.textContent = pet.name;
  petDetailsElement.textContent = pet.getDescription();
  petOwnerElement.textContent = pet.getOwnerName();
  ownerPhoneElement.textContent = pet.getOwnerPhone();
  petIdElement.textContent = pet.getID();
}

// Complete button handlers to update currentIndex and loop at boundaries.
function handleNextClick() {
  // Increment index. If index exceeds array length, reset to 0. Then update display.
  currentIndex++;
  if (currentIndex >= pets.length) {
    currentIndex = 0;
  }
  showPet(currentIndex);
}

function handlePrevClick() {
  // Decrement index. If index is less than 0, wrap to last item. Then update display.
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = pets.length - 1;
  }
  showPet(currentIndex);
}

// Event Listeners
nextButton.addEventListener("click", handleNextClick);
prevButton.addEventListener("click", handlePrevClick);

// Initial display on page load
showPet(currentIndex);
