import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import { PORT, MONGODB_URI } from './config.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

app.get('/', (request, response) => {
    console.log(request);
    return response.status(200).json({
        message: 'Welcome to the MERN Bookstore API',
    });
});

app.use('/books', booksRoute);

mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
});