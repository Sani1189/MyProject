// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

const testDataSchema = new mongoose.Schema({
  id: String,
  type: String,
  clientName: String,
  clientImage: String,
  myName: String,
  myImage: String,
  description: String,
  reactorImages: [String],
  likes: Number,
  commentCount: Number,
  attachmentCount: Number,
  date: Date,
});

const TestData = mongoose.model('TestData', testDataSchema, 'testCollection');

app.get('/api/data', async (req, res) => {
  try {
    const data = await TestData.find();
    res.status(200).json(data);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ message: 'Error fetching data from database' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
