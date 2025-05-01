const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const authRoutes = require('./routes/auth');
const inventoryRoutes = require('./routes/inventory');
const Item = require('./models/Item');

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/inventory', inventoryRoutes);

// Update Inventory Endpoint
app.put('/api/inventory/:id', async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  try {
    const item = await Item.findByIdAndUpdate(id, { quantity }, { new: true });

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating inventory' });
  }
});

// Serve frontend files (optional)
app.use(express.static(path.join(__dirname, '../frontend')));  // Adjust path if needed

// Start server
const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
