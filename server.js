const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors')
const SignupRoute = require('./routes/SignupRoute');
const LoginRoute = require('./routes/LoginRoute')

const app = express();
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('MongoDb connected')
})
.catch((err) => console.log(err))

app.use(cors ({
    origin : ['http://localhost:3000', 'https://mernfront-hlb2.onrender.com'],
    methods : ['GET', 'POST', 'DELETE', 'PUT'],
    credentials : true,
}));

app.use('/signup', SignupRoute);
app.use('/login', LoginRoute);

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`)
})