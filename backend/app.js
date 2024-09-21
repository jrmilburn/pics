const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { passport, prisma } = require('./config/passport');
const cors = require('cors');

const http = require('http');
const { Server } = require("socket.io");

const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');
const postRouter = require('./routes/postRoutes');
const commentRouter = require('./routes/commentRoutes');
const messageRouter = require('./routes/messageRoutes');
const followerRouter = require('./routes/followerRoutes');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(passport.initialize());

app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/follower', passport.authenticate('jwt', { session: false }), followerRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/message', (req, res, next) => {
  req.io = io;
  next();
}, passport.authenticate('jwt', { session: false }),
 messageRouter);

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
})});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
})


module.exports = app;
