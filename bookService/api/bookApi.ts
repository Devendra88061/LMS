import { Router } from 'express';
import connection from '../index'


export const books = Router();

//get books 
books.get("/get",  async (request, responce) => {
    connection.query(
    "SELECT * FROM books",
    (err, results) => {
      if (!err) {
        responce.status(200).json({
           message: 'Book return successfully',
           results 
          });
      } else {
        console.log(err);
      }
    }
  );
});

//add book

books.post("/add", async (request, response) => {

    const newBook = request.body;
    const checkBook = "SELECT * FROM books WHERE BookName = ?";
    console.log("checkSql=>",checkBook);
    connection.query(checkBook, [newBook.BookName], (err,Results) => {
      if (!err) {
        if (Results.length > 0) {
          response.status(400).json({
            message: 'Book already exists',
            bookID :newBook.BookID
        });
        } else {
          // Add the book record
          const addBook = "INSERT INTO books (BookID,BookName, Author, Category, Quantity) VALUES (?, ?, ?, ?, ?)";
          connection.query(
            addBook,
            [newBook.BookID, newBook.BookName, newBook.Author, newBook.Category, newBook.Quantity],
            (err, addResults) => {
              if (!err && addResults.affectedRows > 0) {
                response.json({ 
                    message: 'Book added successfully',
                    response : newBook
                 });
              } else {
                console.log(err);
                response.status(500).json({ error: 'An error occurred while adding the book' });
              }
            }
          );
        }
      } else {
        console.log(err);
        response.status(500).json({ error: 'An error occurred while checking the book' });
      }
    });
  });
  
  
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
            response.json({
                 message: 'Book updated successfully',
                 results : updatedBook 
                });
          } else {
            response.status(404).json({ message: 'Book not found' });
          }
        } else {
          console.log(err);
          response.status(500).json({ error: 'An error occurred while updating the book' });
        }
      }
    );
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
            response.json({ 
                message: 'Book deleted successfully',
                bookId : bookId
             });
          } else {
            response.status(404).json({ message: 'Book not found' });
          }
        } else {
          console.log(err);
          response.status(500).json({ error: 'An error occurred while deleting the book' });
        }
      }
    );
  });
  

