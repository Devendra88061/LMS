import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import cors from 'cors';

const app = express();
app.use(cors());

const port = 8000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});

const obj = {
  auth: 'http://localhost:4000',
  book: 'http://localhost:4002',
};

const entries = Object.entries(obj);

for (const [key, value] of entries) {
  const options = {
    target: value,
    changeOrigin: true,
  };

  const proxy = createProxyMiddleware(options);

  // Enable CORS for each proxy route
  app.use(`/${key}`, cors(), proxy);
}
