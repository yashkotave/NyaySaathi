const express = require('express');
const userRouter = require('./routers/userRoutes');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const chatRouter = require('./routers/chatRouter');
const cors = require("cors");

const connectToDb = require('./db');

const app = express();
const port = 3000;

app.use(cookieParser());

app.use(express.json());
dotenv.config();

connectToDb();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: "GET, POST, PUT, DELETE, OPTIONS",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true
};

app.use(cors(corsOptions));


app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use("/users", userRouter);

app.use("/chats", chatRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});

module.exports = app;