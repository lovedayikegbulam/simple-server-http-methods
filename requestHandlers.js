//RETREIVE ALL BOOKS ==> GET /books
function getAllBooks(req, res) {
  res.end(JSON.stringify(`message: Hello from GET /books`));
}

function replaceBook(req, res) {
	res.end(JSON.stringify(`message: Hello from PUT /books`));
  }

// DELETE A BOOK ==> DELETE: /books
function deleteBook(req, res) {
  res.end(JSON.stringify(`message: Hello from DELETE /books`));
}

function getAllAuthor(req, res) {
	res.end(JSON.stringify(`message: Hello from GET /books/authors`));
  }

function addNewAuthor(req, res) {
  res.end(JSON.stringify(`message: Hello from POST /books/author`));
}

function replaceAuthor(req, res) {
  res.end(JSON.stringify(`message: Hello from PUT /books/authors`));
}

module.exports = {
  getAllBooks,
  replaceBook,
  deleteBook,
  getAllAuthor,
  addNewAuthor,
  replaceAuthor,
};
