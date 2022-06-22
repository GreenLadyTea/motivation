require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const authRouter = require('./router/auth.routes');
const goalsRouter = require('./router/goals.routes');
const usersRouter = require('./router/users.routes');
const commentsRouter = require('./router/comments.routes');
const taskManager = require('./middlewares/TaskManager');
const nodeCron = require('node-cron');

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use('/api/auth', authRouter);
app.use('/api/goals', goalsRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);

app.use('/static', express.static('public'));

async function start() {
    try {
        await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
        nodeCron.schedule('* * * * *', () => taskManager.failUnfinishedTasks(Date.now()));
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();
