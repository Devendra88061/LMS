import express from 'express';
import mysql from 'mysql';
import {books} from './api/bookApi';

const app = express();
const port = 4002;

app.use(express.json());
//start server
app.listen(port, () => {
  console.log(`Application is running on port ${port}`);
});

const connection = mysql.createConnection({
    host: 'sql9.freesqldatabase.com',
    user: 'sql9625789',
    password: 'EgG6fbeKsy',
    database: 'sql9625789',
    multipleStatements : true,
  });
  
  connection.connect((error) => {
    if (error) {
      console.error('Error connecting to the database: ', error);
    } else {
      console.log('***********CONNECTED to SQL DATABASE***********');
    }
  });

  //routes 

  //get Book
  app.use('/book',books);

  //add Book
  app.use('/book/addBook',books);

  //update book
  app.use('/book/updatebook',books);

  //delete book
  app.use('/book/removeBook',books);

  export default connection;