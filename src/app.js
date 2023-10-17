import express from 'express';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import viewRouter from './routes/viewRouter.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import userRouter from './routes/userRouter.js';
import initEvents from './socket/index.js';
import initializePassport from './config/passport.congif.js';
import passport from 'passport';

mongoose.connect(
  'mongodb+srv://avoliofranco0:OurSGq162cAh3ZNh@cluster0.dsbpm6w.mongodb.net/?retryWrites=true&w=majority'
);

const app = express();
app.engine('handlebars', handlebars.engine());
app.set('views', './src/views');
app.set('view engine', 'handlebars');

app.use(express.static('./src/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.Router());

app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://avoliofranco0:OurSGq162cAh3ZNh@cluster0.dsbpm6w.mongodb.net/?retryWrites=true&w=majority',
      ttl: 100,
    }),
    secret: 'C0d3erS3cr37',
    resave: false,
    saveUninitialized: false,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', productRouter);
app.use('/api', cartRouter);
app.use('/', viewRouter);
app.use('/api', userRouter);

const httpServer = app.listen(8080, () =>
  console.log('Server is running on port 8080')
);
const socketServer = new Server(httpServer);

initEvents(socketServer);
