// Jason Schmitz 9/7/26 Week 3 Movie Processor

// Creating an array of 5 movie strings with two of them missing info
const movies = [
	"Forrest Gump,Comedy,7,jason@email.com",
	"The Dark Knight,Action,9,lilly@email.com",
	"Big Trouble in Little China,Action,aidan@email.com",
	"Clue,Comedy",
	"Evil Dead II,Horror,10,isaac@email.com"
];

// Stores valid movie objects in a new array and assigns an ID
const validMovies = [];
let movieId = 1;

// Constructor function to create movie objects
function Movie(title, genre, rating, reviewEmail, id) {
	this.title = title;
	this.genre = genre;
	this.rating = rating;
	this.reviewEmail = reviewEmail;
	this.id = id;
}

// Splits each movie string into an array, checks for missing info,
// removes extra spaces, and creates a new movie object with the
// valid data
movies.forEach((movieString) => {
	try {
		const movieParts = movieString.split(",");
		const trimmed = movieParts.map((item) => item.trim());
		const [title, genre, rating, reviewEmail] = trimmed;

		if (!title || !genre || !rating) {
			throw new Error("Missing information.");
		}

		if (isNaN(Number(rating))) {
			throw new Error("Invalid movie rating.");
		}

		const movieRating = Number(rating);

		const movie = new Movie(
			title,
			genre,
			movieRating,
			reviewEmail,
			movieId
		);

		validMovies.push(movie);

		movieId++;
	} catch (error) {
		console.error(error.message);
	}
});

// Returns a summary of the movie title, genre, and rating
Movie.prototype.getSummary = function() {
	return `${this.title} is a ${this.genre} movie with a rating of ${this.rating}`;
};

// Returns true if the movie's rating is 8 or higher and false if it is not
Movie.prototype.isHighlyRated = function() {
	return this.rating >= 8;
};

// Returns the reviewer's email or "none" if it is missing
Movie.prototype.getReviewEmail = function() {
	return this.reviewEmail ?? "none";
};

// Returns the movie ID
Movie.prototype.getID = function() {
	return this.id;
};

// Displays all data for the valid movies
console.table(validMovies);

// Displays a summary for each valid movie
validMovies.forEach((movie) => {
	console.log(movie.getSummary());
});

// Creates an array of only movies rated 8 or higher
const highlyRatedMovies = validMovies.filter((movie) => {
	return movie.isHighlyRated();
});

// Displays the movies rated 8 or higher
highlyRatedMovies.forEach((movie) => {
	console.log(movie.title);
});

// Prints the movie with the highest rating by comparing each rating
let highestRatedMovie = validMovies[0];

validMovies.forEach((movie) => {
	if (movie.rating > highestRatedMovie.rating) {
		highestRatedMovie = movie;
	}
});

console.log(`The highest rated movie is ${highestRatedMovie.title}.`);
