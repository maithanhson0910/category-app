const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/category');
        const categories = response.data;
        res.render('index', { categories });
    } catch (error) {
        console.error(error);
        res.render('index', { categories: [] });
    }
});

app.post('/create-category', async (req, res) => {
    try {
        const newCategory = {
            id: req.body.id,
            description: req.body.description,
        };
        await axios.post('http://localhost:8080/category', newCategory);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.redirect('/');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
