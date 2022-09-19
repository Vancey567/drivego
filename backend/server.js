require('dotenv').config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

const router = require('./routes/routes');
const DbConnect = require('./database');
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
DbConnect();

const corsOptions = {
    origin: ['http://localhost:3000'], // Pass the server url(client in this case) from where you are making a request
    credentials:true,
    optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.use(router);
app.use('/storage', express.static('storage'));




app.listen(PORT, () => {
    console.log(`Listing on port ${PORT}`);
})
