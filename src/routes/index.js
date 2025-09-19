const express = require('express');
const authRouter = require('./auth');
const userRouter = require('./user');
const wewardRouter = require('./weward');

const app = express();

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/weward', wewardRouter);

module.exports = app;
