const mongoose = require("mongoose");
const Product = require("./models/Product");
require("dotenv").config();

const products = [
  {
    name: "Red Apple",
    price: 5.99,
    category: "Fruits",
    description: "Fresh and crunchy organic red apples, packed with vitamins.",
    image: "/images/redapple-img.png",
  },
  {
    name: "Broccoli",
    price: 7.99,
    category: "Vegetables",
    description:
      "Nutritious green broccoli florets, perfect for steaming or stir-fry.",
    image: "/images/broccoli-img.png",
  },
  {
    name: "Milk Bottle",
    price: 5.0,
    category: "Dairy",
    description: "Pure farm-fresh whole milk in a classic glass bottle.",
    image: "/images/milkbottle-img.jpeg",
  },
  {
    name: "Orange Juice",
    price: 4.99,
    category: "Beverages",
    description: "100% freshly squeezed orange juice with no added sugar.",
    image: "/images/orangejuice-img.jpeg",
  },
  {
    name: "Orange",
    price: 4.99,
    category: "Fruits",
    description: "Sweet and juicy citrus oranges, high in Vitamin C.",
    image: "/images/orange-img.jpeg",
  },
  {
    name: "Cabbage",
    price: 3.49,
    category: "Vegetables",
    description: "Fresh green cabbage, ideal for salads and slaws.",
    image: "/images/cabbage-img.png",
  },
  {
    name: "Carrot",
    price: 2.99,
    category: "Vegetables",
    description: "Sweet and crunchy garden carrots, great for snacking.",
    image: "/images/carrot-img.jpeg",
  },
  {
    name: "Curd",
    price: 2.49,
    category: "Dairy",
    description: "Creamy and thick natural curd, rich in probiotics.",
    image: "/images/curd-img.jpeg",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB for seeding...");

    await Product.deleteMany({});

    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Success: ${createdProducts.length} Products Seeded!`);

    process.exit();
  } catch (err) {
    console.error("❌ Seeding Error:", err);
    process.exit(1);
  }
};

seedDB();
