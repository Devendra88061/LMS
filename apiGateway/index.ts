import express from 'express';
import {createProxyMiddleware} from 'http-proxy-middleware';

//define routes
const app = express();

const port = 8000;
app.listen(port ,()=>{
    console.log("server is runnibg on port",port);
})

const obj = {
    auth: 'http://localhost:4000',
    book: 'http://localhost:4002',
};

const entries = Object.entries(obj);

for (const [key, value] of entries) {
  app.use(`/${key}`,createProxyMiddleware(value));
}


