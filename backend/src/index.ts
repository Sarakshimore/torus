// backend/src/index.ts
import express from 'express';
import bodyParser from 'body-parser';
import formRoutes from './routes/formRoutes';
import cors from 'cors';

const app = express();

// Enable CORS for all origins (or specify your frontend URL)
app.use(cors({ origin: 'http://localhost:3000' }));

const port = 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', formRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
