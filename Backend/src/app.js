const express  = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes/user.route.js');
const questionRoutes = require('./routes/questionRoutes/question.route.js')
const interviewRoutes = require('./routes/interviewRoutes/interview.route.js')

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler.js')
const cors = require('cors');

app.use(cors({
    origin:true,
    credentials:true,
}))

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());
app.use(morgan('tiny'));

app.get('/',(req,res)=>{
    res.send('hello from server');
})

app.use('/api/auth',userRoutes);
app.use('/api/question',questionRoutes);
app.use('/api/interview',interviewRoutes);

app.use(errorHandler);

module.exports = app;
