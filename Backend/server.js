const dotenv = require('dotenv').config();
const app = require('./src/app.js')
const connect = require('./src/config/db/db.js')

connect();

const port = process.env.PORT || 3000;

app.listen(port,()=>{
    console.log(`Server is started post ${port}`);
})

