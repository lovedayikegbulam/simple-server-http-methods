const fs = require("fs");
const path = require("path");

 function readFromFiles(filePath) {
	fs.readFile(filePath, "utf8", (err, data) => {
		if (err) {
			console.log(err);
		}
	})
}



