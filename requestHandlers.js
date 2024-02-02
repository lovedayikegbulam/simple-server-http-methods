const fileHandler = require("./fileHandlers");
const path = require("node:path");
const booksDbPath = path.join(__dirname, "db", "books.json");

//RETREIVE ALL BOOKS ==> GET /books
const getAllBooks = function (req, res) {
	fileHandler.readFromFiles(booksDbPath).then((response) => {
		res.writeHead(200);
		res.end(`${response}`);
		// console.log(response);
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
                const updatedBook = JSON.parse(response)
                const content = updatedBook[updatedBook.length - 1]
				res.end(JSON.stringify(content));
			});
		});
	});
}

module.exports = {
	getAllBooks,
	addBook,
};
