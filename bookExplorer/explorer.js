// Jason Schmitz - Week 4 Book Explorer

const books = [
	{ title: "IT", author: "Stephen King", pages: 1140 },
	{ title: "Greenlights", author: "Matthew McConaughey", pages: 304 },
	{ title: "The Alchemist", author: "Paulo Coelho", pages: 210 },
	{ title: "Frankenstein", author: "Mary Shelley", pages: 290 },
	{ title: "The Art of Happiness", author: "Dalai Lama and Howard C. Cutler", pages: 340 }
];

console.log(`\n Console Output`);

books.forEach(function (book) {
	console.log(`${book.title} by ${book.author} (${book.pages} pages)`);
});

console.log(`\n DOM Tree Exploration`);
console.log(`Document: `, document);
console.log(`Body: `, document.body);
console.log(`First child: `, document.body.firstChild);
console.log(`Body children: `, document.body.children);

console.log(`\n DOM Tree Exploration`);

const ulElement = document.body.children[2];
const firstLi = ulElement.children[0];
const parentOfLi = firstLi.parentElement;
const siblingLi = firstLi.nextElementSibling;

console.log(`Book list: `, ulElement);
console.log(`First list item: `, firstLi);
console.log(`Parent of list item: `, parentOfLi);
console.log(`Next list item: `, siblingLi);

console.log(`\n Node Properties`);
console.log(`First book title: ${firstLi.innerText}`);

console.log(`\n Styles & Classes`);

const listItems = ulElement.children;

books.forEach(function (book, index) {
	if (book.pages > 300) {
		listItems[index].classList.add("featured");
		console.log(`${book.title} has more than 300 pages.`);
		console.log(`The featured class was added to ${book.title}.`);
	}
});
