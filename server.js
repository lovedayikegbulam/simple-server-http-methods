const http = require("http");
const requestHandlers = require("./requestHandlers")

const hostname = "localhost";
const port = 8000;

// Add Request Handler to the server
const requestHandler = function (req, res) {
	res.setHeader("Content-Type", "application/json");

	if (req.url === "/books" && req.method === "GET") {
		requestHandlers.getAllBooks(req, res);
	} else if (req.url === "/books" && req.method === "PUT") {
		requestHandlers.updateBook(req, res);
	} else if (req.url === "/books" && req.method === "DELETE") {
		requestHandlers.deleteBook(req, res);
    } else if (req.url === "/books/author" && req.method === "GET") {
		requestHandlers.getAllAuthor(req, res);
    } else if (req.url === "/books/author" && req.method === "POST") {
			requestHandlers.addNewAuthor(req, res);
		} else if (req.url === "/books/author" && req.method === "PUT") {
			requestHandlers.updateAuthor(req, res);
		} else {
			res.writeHead(404);
			res.end(
				JSON.stringify({
					message: "Method Not Supported",
				})
			);
		}
};

// Create the server
const server = http.createServer(requestHandler);
server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
