const Agent = require('../models/Agent');

exports.createAgent = async (req, res) => {
    try {
        const { name, task } = req.body;

        // Validate required fields
        if (!name || !task) {
            return res.status(400).json({ error: 'Name and task are required' });
        }

        // Validate that the task is a valid string
        if (typeof task !== 'string' || task.trim().length === 0) {
            return res.status(400).json({ error: 'Task must be a non-empty string' });
        }

        // Optional: Add more complex validation for the task field
        if (task.length > 200) {
            return res.status(400).json({ error: 'Task must be less than 200 characters' });
        }

        if (/[^a-zA-Z0-9\s]/.test(task)) {
            return res.status(400).json({ error: 'Task contains invalid characters' });
        }

        const agent = new Agent({ name, task });

        // Attempt to save the agent to the database
        await agent.save();

        res.status(201).json({ agent });
    } catch (err) {
        if (err.name === 'ValidationError') {
            // Mongoose validation error
            return res.status(400).json({ error: `Validation error: ${err.message}` });
        }
        
        if (err.code === 11000) {
            // Duplicate key error (e.g., unique field violation)
            return res.status(409).json({ error: 'Agent with this name already exists' });
        }

        // Generic server error
        console.error('Error saving agent:', err);
        res.status(500).json({ error: 'Failed to create agent' });
    }
};
