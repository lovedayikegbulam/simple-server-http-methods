const fileHandler = require("./fileHandlers");
const path = require("node:path");
const booksDbPath = path.join(__dirname, "db", "books.json");
const authorDbPath = path.join(__dirname, "db", "authors.json");

// genearte random numbers within a particular range
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

//RETREIVE ALL BOOKS ==> GET /books
function getAllBooks (req, res) {
	fileHandler.readFromFiles(booksDbPath).then((response) => {
		res.writeHead(200);
		res.end(`${response}`);
		console.log(response);
	});
};

function updateBook(req, res) {
	const body = [];

	req.on("data", (chunk) => {
		body.push(chunk);
	});

	req.on("end", () => {
		const parsedBook = Buffer.concat(body).toString();
		const detailsToUpdate = JSON.parse(parsedBook);
		const bookId = detailsToUpdate.id;

		//add the new book to the end of the existing books array
		fileHandler.readFromFiles(booksDbPath).then((book) => {
			const bookObj = JSON.parse(book);

			const bookIndex = bookObj.findIndex(
				(book) => book.id === bookId
			);

			if (bookIndex === -1) {
				res.writeHead(404);
				res.end("Book with the specified id not found!");
				return;
			}

			const updatedBook = { ...bookObj[bookIndex], ...detailsToUpdate };
			bookObj[bookIndex] = updatedBook;

			fileHandler.writeToBook(booksDbPath, bookObj).then((response) => {
				res.writeHead(200);
				const updatedBook = JSON.parse(response);
				const content = updatedBook[updatedBook.length - 1];
				res.end(JSON.stringify(content));
			});
		});
	});
}



// DELETE A BOOK ==> DELETE: /books
function deleteBook (req, res) {

	fileHandler.readFromFiles(booksDbPath).then((response) => {
		const books = JSON.parse(response);
		// delete random book from the db
		if(books.length > 0){
			indexOfbookToDelete = random(0, books.length);
			bookToBeDeleted = books[indexOfbookToDelete];
			books.splice(indexOfbookToDelete, 1);
			fileHandler.writeToBook(booksDbPath, books).then((response) => {
				res.writeHead(200);
				res.end(
					JSON.stringify(
						`message: Ooops you successfully deleted book at index ${indexOfbookToDelete}`
					)
				);
			});

		}else {
			res.writeHead(404);
			res.end(JSON.stringify("message: book not found"));
		}
	});
};

function getAllAuthor(req, res){
	fileHandler.readFromFiles(authorDbPath).then((response) => {
		res.writeHead(200);
		res.end(`${response}`);
		console.log(response);
	});
};

function addNewAuthor(req, res) {

	const body = [];

	req.on("data", (chunk) => {
		body.push(chunk);
	});

	req.on("end", () => {
		const parsedAuthor = Buffer.concat(body).toString();
		const newAuthor = JSON.parse(parsedAuthor);

		//add the new book to the end of the existing books array
		fileHandler.readFromFiles(authorDbPath).then((response) => {
			const oldAuthors = JSON.parse(response);
			const allBooks = [...oldAuthors, newAuthor];

			fileHandler.writeToBook(authorDbPath, allBooks).then((response) => {
				res.writeHead(200);
				const updatedAuthor = JSON.parse(response);
				const content = updatedAuthor[updatedAuthor.length - 1];
				res.end(JSON.stringify(content));
			});
		});
	});

}

function updateAuthor(req, res) {
	const body = [];

	req.on("data", (chunk) => {
		body.push(chunk);
	});

	req.on("end", () => {
		const parsedAuthor = Buffer.concat(body).toString();
		const detailsToUpdate = JSON.parse(parsedAuthor);
		const authorId = detailsToUpdate.id;

		//add the new book to the end of the existing books array
		fileHandler.readFromFiles(authorDbPath).then((author) => {
			const authorsObj = JSON.parse(author);

			const authorIndex = authorsObj.findIndex((author) => author.id === authorId);

			if (authorIndex === -1) {
				res.writeHead(404);
				res.end("Book with the specified id not found!");
				return;
			}

			const updatedAuthor = { ...authorsObj[authorIndex], ...detailsToUpdate };
			authorsObj[authorIndex] = updatedAuthor;

			fileHandler.writeToBook(authorDbPath, authorsObj).then((response) => {
				res.writeHead(200);
				const updatedAuthor = JSON.parse(response);
				const content = updatedAuthor[updatedAuthor.length - 1];
				res.end(JSON.stringify(content));
			});
		});
	});
}

module.exports = {
	getAllBooks,
	updateBook,
	deleteBook,
	getAllAuthor,
	addNewAuthor,
	updateAuthor
};
