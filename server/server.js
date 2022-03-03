const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');

dotenv.config({ path: __dirname + '../../server/.env' });

// App
const app = express();

// Database
const DB = process.env.DB_NAME.replace('<password>', process.env.DB_PASSWORD);

console.log(DB);

mongoose.connect(DB).then(() => console.log('DB connection successful'));

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/categories', categoryRoute);
app.use('/api/subCategory', subCategoryRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`App is listening on port ${port}!`));
