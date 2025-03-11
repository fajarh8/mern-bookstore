import express from 'express';
import { Book } from '../models/BookModel.js';

const route = express.Router();

route.get('/', async (request, response) => {
    try {
        const books = await Book.find({});
        return response.status(200).json({
            count: books.length,
            data: books,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ error: error.message });
    }
});
route.get('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const books = await Book.findById(id);
        return response.status(200).json(books);
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ error: error.message });
    }
});
route.put('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).json({ error: 'Book not found' });
        }

        if(!request.body.title || !request.body.author || !request.body.year) {
            return response.status(400).json({ error: 'Missing required fields: title, author, year' });
        }

        return response.status(200).json({
            message: 'Book updated successfully',
            data: result,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ error: error.message });
    }
});
route.post('/', async (request, response) => {
    try {
        if(!request.body.title || !request.body.author || !request.body.year) {
            return response.status(400).json({ error: 'Missing required fields: title, author, year' });
        }

        const newBook = {
            title: request.body.title,
            author: request.body.author,
            year: request.body.year,
        };

        const book = await Book.create(newBook);
        return response.status(201).json(book);
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ error: error.message });
    }
});
route.delete('/:id', async (request, response) => {
    try {
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).json({ error: 'Book not found' });
        }

        return response.status(200).json({
            message: 'Book deleted successfully',
            data: result,
        });
    } catch (error) {
        console.log(error.message);
        return response.status(500).json({ error: error.message });
    }
});

export default route;