const http = require("http");
const {getAllBooks,replaceBook,deleteBook,getAllAuthor, addNewAuthor, replaceAuthor} = require("./requestHandlers");

const hostname = "0.0.0.0";
const port = 8000;

// Add Request Handler to the server
const requestHandler = function (req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.url === "/books" && req.method === "GET") {
    getAllBooks(req, res);
  } else if (req.url === "/books" && req.method === "PUT") {
    replaceBook(req, res);
  } else if (req.url === "/books" && req.method === "DELETE") {
    deleteBook(req, res);
  } else if (req.url === "/books/author" && req.method === "GET") {
    getAllAuthor(req, res);
  } else if (req.url === "/books/author" && req.method === "POST") {
    addNewAuthor(req, res);
  } else if (req.url === "/books/author" && req.method === "PUT") {
    replaceAuthor(req, res);
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
  console.log(`Server running at http://localhost:${port}/`);
});
