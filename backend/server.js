const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors({
  origin: 'https://dsa-tracker-nine-tau.vercel.app/',
  credentials: true,
  optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://varunkumararya832:TJxSVhSAbCi9NrTn@cluster0.ewryn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

const authRoutes = require('./routes/auth');
const progressRoutes = require('./routes/progress');

 
app.use('/api/auth', authRoutes);
app.use('/api/progress', progressRoutes);

 
app.get('/', (req, res) => {
  res.json({ message: 'DSA Sheet API is running!' });
});
 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ msg: 'Something went wrong!' });
});

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
//   console.log(`📝 API endpoints:`);
//   console.log(`   - POST http://localhost:${PORT}/api/auth/register`);
//   console.log(`   - POST http://localhost:${PORT}/api/auth/login`);
//   console.log(`   - GET  http://localhost:${PORT}/api/progress`);
// });

module.exports = app;