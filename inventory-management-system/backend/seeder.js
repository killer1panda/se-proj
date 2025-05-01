const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Item = require('./models/Item');

dotenv.config();

const items = [
  {
    name: 'Laptop',
    description: '15-inch display, 8GB RAM',
    quantity: 10,
    price: 75000,
    category: 'Electronics',
  },
  {
    name: 'Smartphone',
    description: 'Android, 128GB storage',
    quantity: 25,
    price: 25000,
    category: 'Electronics',
  },
  {
    name: 'Keyboard',
    description: 'Wireless keyboard',
    quantity: 50,
    price: 1500,
    category: 'Accessories',
  },
];

async function seedDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // Remove existing items before seeding new ones
    await Item.deleteMany({});
    console.log('Old items removed');

    // Insert new items
    const createdItems = await Item.insertMany(items);
    console.log('Dummy items inserted:', createdItems);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDB();
