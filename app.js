const express = require('express');
const config = require('config');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const authRoutes = require('./routes/auth.routes');
const linkRoutes = require('./routes/link.routes');
const redirectRoutes = require('./routes/redirect.routes');

app.use(express.json({extended: true})); // if we click register request.body is undefined, and this row make it an object
app.use('/api/auth', authRoutes);
app.use('/api/link', linkRoutes);
app.use('/t', redirectRoutes);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = config.get('port') || 1008

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'));

        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.warn('Server Error:', e.message);
        process.exit(1);
    }
}

start();
