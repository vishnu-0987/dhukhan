const express = require('express')
const bodyParser = require('body-parser');
const usersRoute = require('./routes/users');
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()

const app = express()

app.use(bodyParser.json());

app.use(cors());


app.use('/users', usersRoute);

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
    console.log(`server is running in ${PORT}`);
});

