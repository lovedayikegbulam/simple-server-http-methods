const fs = require("fs");
const path = require("path");
const booksDbPath = path.join(__dirname, "db", "books.json");


function readFromFiles(filePath) {
	return new Promise(function (resolve, reject) {
		fs.readFile(filePath, "utf-8", (err, data) => {
			if (err) reject(err);
			resolve(data);
		});	
	});
};

module.exports = {
	readFromFiles
}



