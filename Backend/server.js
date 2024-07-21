const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDb = require('./config/connectDB');

dotenv.config();
connectDb();

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', require('./routes/userRoute'));
app.use('/api/v1/transections', require('./routes/transectionRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});
