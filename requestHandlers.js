const fileHandler = require("./fileHandlers");
const path = require("path");
const fs = require("fs")
const booksDbPath = path.join(__dirname, "db", "books.json");

//RETREIVE ALL BOOKS ==> GET /books
const getAllBooks = function (req, res) {
	fileHandler.readFromFiles(booksDbPath).then((response) => {
        res.writeHead(200);
		res.end(`${response}`); 
        console.log(response);
	});
}

module.exports = {
	getAllBooks,
};