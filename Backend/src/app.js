const express  = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes/user.route.js');
const questionRoutes = require('./routes/questionRoutes/question.route.js')
const interviewRoutes = require('./routes/interviewRoutes/interview.route.js')
const paymentRoutes = require('./routes/paymentRoutes/payment.route.js')

const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const errorHandler = require('./middlewares/errorHandler.js')
const cors = require('cors');
// const { sendMail } = require('./utils/email.js');

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
app.use('/api/payment',paymentRoutes);


// app.get('/test-mail', async (req, res) => {
//   try {
//     await sendMail(
//       'shivendrapatel01250@gmail.com',
//       'Test Email',
//       '<h1>This is a test mail from Nodemailer 🔥</h1>'
//     );
//     res.send('Mail sent!');
//   } catch (err) {
//     console.log(err);
//     res.send('Failed to send mail.');
//   }
// });


app.use(errorHandler);

module.exports = app;
