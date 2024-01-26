const fileHandler = require("./fileHandlers");
const path = require("node:path");
const booksDbPath = path.join(__dirname, "db", "books.json");

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

function addBook(req, res) {
	const body = [];

	req.on("data", (chunk) => {
		body.push(chunk);
	});

	req.on("end", () => {
		const parsedBook = Buffer.concat(body).toString();
		const newBook = JSON.parse(parsedBook);

		//add the new book to the end of the existing books array
		fileHandler.readFromFiles(booksDbPath).then((response) => {
			const oldBooks = JSON.parse(response);
			const allBooks = [...oldBooks, newBook];

			fileHandler.writeToBook(booksDbPath, allBooks).then((response) => {
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

module.exports = {
	getAllBooks,
	addBook,
	deleteBook,
};
