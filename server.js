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
		requestHandlers.addBook(req, res);
	} else if (req.url === "/books" && req.method === "DELETE") {
		res.write("Hello from DELETE /books");
		res.end();
    } else if (req.url === "/books/author" && req.method === "GET") {
		res.write("Hello from GET /books/author");
		res.end();
    } else if (req.url === "/books/author" && req.method === "POST") {
			res.write("Hello from POST /books/author");
			res.end();
		} else if (req.url === "/books/author" && req.method === "PUT") {
			res.write("Hello from PUT /books/author");
			res.end();
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
