const fs = require("fs");
const path = require("path");

 function readFromFiles(filePath) {
	return fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			console.log(err);
		}
		console.log(data)
	})
}

module.exports = {
	readFromFiles
}



