import express from 'express';
import userModel from '../model/user.mjs';

const userRoutes = express.Router();

// GET all items
userRoutes.get('/', async (req, res) => {
    try {
        const items = await userModel.find();

        if (items.length === 0) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json({ data: items });
    } catch (err) {
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

// POST a new item
userRoutes.post('/', async (req, res) => {
    try {
        console.log("Received body:", req.body); // Debugging line

        const { serialno,name,email } = req.body;

        if (!serialno || !name || !email) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newItem = new userModel({
            serialno,
            name,
            email
        });

        await newItem.save();
        res.status(201).json({ message: 'New record added', data: newItem });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
});


// GET item by ID
userRoutes.get('/:id', async (req, res) => {
    try {
        const item = await userModel.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json({ data: item });
    } catch (err) {
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

// UPDATE item by ID
userRoutes.put('/:id', async (req, res) => {
    try {
        const item = await userModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json({ message: 'user updated', data: item });
    } catch (err) {
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

// DELETE item by ID
userRoutes.delete('/:id', async (req, res) => {
    try {
        const item = await userModel.findByIdAndDelete(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.status(200).json({ message: 'user deleted' });
    } catch (err) {
        res.status(500).json({ message: `Server error: ${err.message}` });
    }
});

export default userRoutes;