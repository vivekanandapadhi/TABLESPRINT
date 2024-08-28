require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const productRoutes=require('./routes/productRoutes')
const { authenticateToken } = require('./middleware/authMiddleware');


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"))

connectDB();
// console.log(authenticateToken)

// Routes
app.use('/auth', authRoutes);
app.use('/categorys',authenticateToken, categoryRoutes);
app.use('/subcategorys',authenticateToken, subcategoryRoutes);
app.use('/products',authenticateToken,productRoutes)


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
