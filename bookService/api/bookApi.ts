import { Router, response } from 'express';
import connection from '../index'
import { Res } from '../../commons/response';
const reso = new Res();

export const books = Router();

//get books 
books.get("/get", async (request, responce) => {
  connection.query(
    "SELECT * FROM books",
    (err, results) => {
      if (!err) {
        responce.json({
          statusCode: 200,
          message: 'Books return successfully',
          data: results,
          error: null,
          errorCode: null
        });
      } else {
        console.log(err);
        responce.json({
          statusCode: 500,
          message: 'Internal server error',
          data: {},
          error: null,
          errorCode: null
        });
      }
    }
  );
});

//add book

// books.post("/add", async (request, response) => {

//   const newBook = request.body;
//   const checkBook = "SELECT * FROM books WHERE BookName = ?";
//   console.log("checkSql=>", checkBook);
//   connection.query(checkBook, [newBook.BookName], (err, Results) => {
//     if (!err) {
//       if (Results.length > 0) {
//         reso.statusCode = 400,
//           reso.message = "Book already exists",
//           response.json(reso);
//       } else {
//         // Add the book record
//         const addBook = "INSERT INTO books (BookID,BookName, Author, Category, Quantity) VALUES (?, ?, ?, ?, ?)";
//         connection.query(
//           addBook,
//           [newBook.BookID, newBook.BookName, newBook.Author, newBook.Category, newBook.Quantity],
//           (err, addResults) => {
//             if (!err && addResults.affectedRows > 0) {
//               reso.statusCode = 200,
//                 reso.message = "Book added successfully",
//                 reso.data = newBook,
//                 response.json(reso);

//             } else {
//               console.log(err);
//               reso.statusCode = 500,
//                 reso.message = "",
//                 reso.error = "An error occurred while adding the book",
//                 response.json(reso);
//             }
//           }
//         );
//       }
//     } else {
//       console.log(err);
//       reso.statusCode = 500,
//         reso.message = "",
//         reso.error = "An error occurred while checking the book",
//         response.json(reso);
//     }
//   });
// });


//update book 
books.put("/update/:id", async (request, response) => {
  const bookId = request.params.id;
  const updatedBook = request.body;

  const sql = "UPDATE books SET BookName = ?, Author = ?, Category = ?, Quantity = ? WHERE BookID = ?";
  connection.query(
    sql,
    [updatedBook.BookName, updatedBook.Author, updatedBook.Category, updatedBook.Quantity, bookId],
    (err, results) => {
      if (!err) {
        if (results.affectedRows > 0) {

          reso.statusCode = 201,
            reso.message = "Book updated successfully",
            reso.data = updatedBook
          response.status(201).json(reso);

        } else {
          reso.statusCode = 404,
          reso.message = "Book not found",
          response.status(404).json(reso);

        }
      } else {
        console.log(err);
        reso.statusCode = 500,
        reso.message = "",
        reso.error = "An error occurred while updating the book"
        response.status(500).json(reso);

      }
    }
  );
});


books.post("/add", async (request, response) => {
  const newBook = request.body;

  const checkBookId = "SELECT * FROM books WHERE BookID = ?";
  connection.query(checkBookId, [newBook.BookID], (err, idResults) => {
    if (!err) {
      if (idResults.length > 0) {
          reso.statusCode = 400,
          reso.message = "Book ID already in use",
          response.status(400).json(reso);

      } else {
        const checkBookName = "SELECT * FROM books WHERE BookName = ?";
        connection.query(checkBookName, [newBook.BookName], (err, nameResults) => {
          if (!err) {
            if (nameResults.length > 0) {
              reso.statusCode = 400,
                reso.message = "Book name already exists",
                response.status(400).json(reso);

            } else {
              const addBook = "INSERT INTO books (BookID, BookName, Author, Category, Quantity) VALUES (?, ?, ?, ?, ?)";
              connection.query(
                addBook,
                [newBook.BookID, newBook.BookName, newBook.Author, newBook.Category, newBook.Quantity],
                (err, addResults) => {
                  if (!err && addResults.affectedRows > 0) {

                    reso.statusCode = 200,
                      reso.message = "Book added successfully",
                      reso.data = newBook
                    response.status(200).json(reso);

                  } else {
                    console.log(err);
                    reso.statusCode = 400,
                      reso.message = "An error occurred while adding the book",
                      response.status(400).json(reso);
                  }
                }
              );
            }
          } else {
            console.log(err);
            reso.statusCode = 500,
              reso.message = "An error occurred while checking the book name",
              response.status(500).json(reso);

          }
        });
      }
    } else {
      console.log(err);
      reso.statusCode = 500,
        reso.message = "An error occurred while checking the book ID",
        response.status(500).json(reso);

    }
  });
});


//delete book 
books.delete("/delete/:id", async (request, response) => {
  const bookId = request.params.id;

  const sql = "DELETE FROM books WHERE BookID = ?";
  connection.query(
    sql,
    [bookId],
    (err, results) => {
      if (!err) {
        if (results.affectedRows > 0) {

          reso.statusCode = 200,
            reso.message = "Book deleted successfully",
            response.status(200).json(reso);

        } else {
          reso.statusCode = 404,
            reso.message = "Book not found",
            response.status(404).json(reso);

        }
      } else {
        console.log(err);
        reso.statusCode = 500,
          reso.message = "An error occurred while deleting the book",
          response.status(500).json(reso);

      }
    }
  );
});


