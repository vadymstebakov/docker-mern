const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const routes = require('./routes/note.routes');

const app = express();
const port = process.env.PORT ?? 5000;

app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api/note', routes);

if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '..', 'client', 'build')));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
    });
}

async function start() {
    try {
        const {
            MONGO_INITDB_ROOT_USERNAME: username,
            MONGO_INITDB_ROOT_PASSWORD: password,
            MONGO_HOST: host,
        } = process.env;
        const uri = `mongodb://${username}:${password}@${host}/notes?authSource=admin`;

        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected!');
        app.listen(port, console.log.bind(console, `Server has been started on port ${port}`));
    } catch (e) {
        console.log('MongoDB connection failed!', e.message);
        console.log(e);
    }
}

start();
