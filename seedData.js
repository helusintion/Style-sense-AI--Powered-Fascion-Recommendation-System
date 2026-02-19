const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const Product = require('./models/Product');
const User = require('./models/User');

dotenv.config();

// Sample users
const users = [
  {
    name: 'Admin User',
    email: 'admin@stylescence.com',
    password: 'admin123',
    role: 'admin',
    gender: 'Male',
    isEmailVerified: true
  },
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    gender: 'Male',
    stylePreferences: ['Casual', 'Streetwear'],
    favoriteCategories: ['Men', 'Footwear'],
    preferredColors: ['Black', 'Blue', 'Gray'],
    budgetRange: { min: 50, max: 500 },
    isEmailVerified: true
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    gender: 'Female',
    stylePreferences: ['Classic', 'Minimalist'],
    favoriteCategories: ['Women', 'Accessories'],
    preferredColors: ['White', 'Pink', 'Burgundy'],
    budgetRange: { min: 100, max: 800 },
    isEmailVerified: true
  }
];

// Sample products
const products = [
  // Men's Products
  {
    name: 'Classic White Oxford Shirt',
    description: 'Timeless white oxford shirt crafted from 100% premium cotton. Perfect for both formal occasions and casual settings.',
    category: 'Formal Wear',
    price: 79.99,
    brand: 'Ralph Lauren',
    images: [{
      url: 'https://images.unsplash.com/photo-1598033121413-9c4f7aa0735d?w=800',
      isPrimary: true
    }],
    colors: ['White'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    gender: 'Men',
    occasion: ['Formal', 'Business', 'Casual'],
    season: ['Spring', 'Fall'],
    tags: ['Classic', 'Formal', 'Essential'],
    countInStock: 50,
    rating: 4.5,
    numReviews: 128,
    popularityScore: 85
  },
  {
    name: 'Slim Fit Dark Jeans',
    description: 'Modern slim fit jeans in dark wash. Stretchy comfort fabric for all-day wear.',
    category: 'Casual Wear',
    price: 89.99,
    brand: 'Levi\'s',
    images: [{
      url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800',
      isPrimary: true
    }],
    colors: ['Blue', 'Dark Blue'],
    sizes: ['30', '32', '34', '36', '38'],
    gender: 'Men',
    occasion: ['Casual', 'Everyday'],
    season: ['All'],
    tags: ['Casual', 'Denim', 'Comfortable'],
    countInStock: 75,
    rating: 4.7,
    numReviews: 256,
    popularityScore: 92
  },
  {
    name: 'Leather Biker Jacket',
    description: 'Classic biker style leather jacket. Made from premium genuine leather.',
    category: 'Outerwear',
    price: 299.99,
    brand: 'AllSaints',
    images: [{
      url: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800',
      isPrimary: true
    }],
    colors: ['Black', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
    gender: 'Men',
    occasion: ['Casual', 'Party', 'Evening'],
    season: ['Fall', 'Winter'],
    tags: ['Leather', 'Edgy', 'Statement'],
    countInStock: 25,
    rating: 4.8,
    numReviews: 89,
    popularityScore: 78
  },
  {
    name: 'Cashmere V-Neck Sweater',
    description: 'Luxuriously soft cashmere sweater. Perfect for layering or wearing alone.',
    category: 'Casual Wear',
    price: 159.99,
    brand: 'Brooks Brothers',
    images: [{
      url: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800',
      isPrimary: true
    }],
    colors: ['Navy', 'Burgundy', 'Charcoal'],
    sizes: ['S', 'M', 'L', 'XL'],
    gender: 'Men',
    occasion: ['Casual', 'Business'],
    season: ['Fall', 'Winter'],
    tags: ['Luxury', 'Warm', 'Classic'],
    countInStock: 30,
    rating: 4.6,
    numReviews: 67,
    popularityScore: 72
  },

  // Women's Products
  {
    name: 'Little Black Dress',
    description: 'Elegant black dress perfect for evening events. Features a flattering A-line silhouette.',
    category: 'Party Wear',
    price: 129.99,
    brand: 'H&M',
    images: [{
      url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800',
      isPrimary: true
    }],
    colors: ['Black'],
    sizes: ['XS', 'S', 'M', 'L'],
    gender: 'Women',
    occasion: ['Party', 'Evening', 'Cocktail'],
    season: ['All'],
    tags: ['Elegant', 'Evening', 'Classic'],
    countInStock: 45,
    rating: 4.9,
    numReviews: 312,
    popularityScore: 95
  },
  {
    name: 'Floral Maxi Dress',
    description: 'Beautiful floral print maxi dress. Light and breezy fabric perfect for summer.',
    category: 'Casual Wear',
    price: 89.99,
    brand: 'Zara',
    images: [{
      url: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800',
      isPrimary: true
    }],
    colors: ['Multicolor'],
    sizes: ['XS', 'S', 'M', 'L'],
    gender: 'Women',
    occasion: ['Casual', 'Vacation', 'Date'],
    season: ['Spring', 'Summer'],
    tags: ['Floral', 'Summer', 'Romantic'],
    countInStock: 60,
    rating: 4.5,
    numReviews: 178,
    popularityScore: 82
  },
  {
    name: 'Tailored Blazer',
    description: 'Professional tailored blazer for the modern woman. Versatile piece for office to evening.',
    category: 'Formal Wear',
    price: 149.99,
    brand: 'Banana Republic',
    images: [{
      url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800',
      isPrimary: true
    }],
    colors: ['Navy', 'Black', 'Beige'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    gender: 'Women',
    occasion: ['Business', 'Formal'],
    season: ['All'],
    tags: ['Professional', 'Tailored', 'Versatile'],
    countInStock: 35,
    rating: 4.6,
    numReviews: 94,
    popularityScore: 70
  },
  {
    name: 'Silk Blouse',
    description: 'Luxurious silk blouse with a subtle sheen. Perfect for office or special occasions.',
    category: 'Formal Wear',
    price: 79.99,
    brand: 'Equipment',
    images: [{
      url: 'https://images.unsplash.com/photo-1588353293547-b83b9ab79d5f?w=800',
      isPrimary: true
    }],
    colors: ['Cream', 'Navy', 'Burgundy'],
    sizes: ['XS', 'S', 'M', 'L'],
    gender: 'Women',
    occasion: ['Business', 'Formal', 'Date'],
    season: ['All'],
    tags: ['Silk', 'Elegant', 'Luxury'],
    countInStock: 40,
    rating: 4.7,
    numReviews: 112,
    popularityScore: 75
  },

  // Unisex/Accessories
  {
    name: 'Classic White Sneakers',
    description: 'Minimalist white sneakers. Goes with everything.',
    category: 'Footwear',
    price: 79.99,
    brand: 'Nike',
    images: [{
      url: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800',
      isPrimary: true
    }],
    colors: ['White'],
    sizes: ['7', '8', '9', '10', '11', '12'],
    gender: 'Unisex',
    occasion: ['Casual', 'Sporty'],
    season: ['All'],
    tags: ['Sneakers', 'Comfortable', 'Versatile'],
    countInStock: 100,
    rating: 4.8,
    numReviews: 445,
    popularityScore: 98
  },
  {
    name: 'Leather Crossbody Bag',
    description: 'Compact leather crossbody bag. Perfect for everyday use.',
    category: 'Accessories',
    price: 89.99,
    brand: 'Coach',
    images: [{
      url: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800',
      isPrimary: true
    }],
    colors: ['Black', 'Brown', 'Tan'],
    sizes: ['One Size'],
    gender: 'Women',
    occasion: ['Casual', 'Everyday'],
    season: ['All'],
    tags: ['Leather', 'Bag', 'Everyday'],
    countInStock: 55,
    rating: 4.7,
    numReviews: 156,
    popularityScore: 81
  },
  {
    name: 'Aviator Sunglasses',
    description: 'Classic aviator sunglasses with UV protection.',
    category: 'Accessories',
    price: 129.99,
    brand: 'Ray-Ban',
    images: [{
      url: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800',
      isPrimary: true
    }],
    colors: ['Gold/Green', 'Silver/Blue'],
    sizes: ['One Size'],
    gender: 'Unisex',
    occasion: ['Casual', 'Vacation'],
    season: ['Spring', 'Summer'],
    tags: ['Sunglasses', 'Classic', 'UV Protection'],
    countInStock: 70,
    rating: 4.9,
    numReviews: 289,
    popularityScore: 86
  },
  {
    name: 'Wool Blend Coat',
    description: 'Elegant wool blend coat. Keeps you warm and stylish.',
    category: 'Outerwear',
    price: 249.99,
    brand: 'Club Monaco',
    images: [{
      url: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800',
      isPrimary: true
    }],
    colors: ['Camel', 'Black', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    gender: 'Women',
    occasion: ['Formal', 'Business', 'Casual'],
    season: ['Fall', 'Winter'],
    tags: ['Coat', 'Warm', 'Elegant'],
    countInStock: 25,
    rating: 4.7,
    numReviews: 67,
    popularityScore: 68
  },
  {
    name: 'Leather Belt',
    description: 'Genuine leather belt with classic buckle.',
    category: 'Accessories',
    price: 39.99,
    brand: 'Tommy Hilfiger',
    images: [{
      url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
      isPrimary: true
    }],
    colors: ['Black', 'Brown'],
    sizes: ['S', 'M', 'L', 'XL'],
    gender: 'Unisex',
    occasion: ['Casual', 'Formal'],
    season: ['All'],
    tags: ['Belt', 'Leather', 'Essential'],
    countInStock: 150,
    rating: 4.5,
    numReviews: 234,
    popularityScore: 74
  },
  {
    name: 'Knit Beanie',
    description: 'Warm knit beanie. Essential winter accessory.',
    category: 'Accessories',
    price: 24.99,
    brand: 'The North Face',
    images: [{
      url: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=800',
      isPrimary: true
    }],
    colors: ['Black', 'Gray', 'Navy', 'Red'],
    sizes: ['One Size'],
    gender: 'Unisex',
    occasion: ['Casual', 'Winter'],
    season: ['Fall', 'Winter'],
    tags: ['Beanie', 'Winter', 'Warm'],
    countInStock: 200,
    rating: 4.6,
    numReviews: 178,
    popularityScore: 70
  }
];

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Hash passwords for users
    const salt = await bcrypt.genSalt(10);
    const seededUsers = await Promise.all(users.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, salt);
      return {
        ...user,
        password: hashedPassword
      };
    }));

    // Insert users
    const createdUsers = await User.insertMany(seededUsers);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Insert products
    const createdProducts = await Product.insertMany(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log('\n✨ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Users: ${createdUsers.length}`);
    console.log(`   Products: ${createdProducts.length}`);
    console.log('\n🔑 Test Credentials:');
    console.log('   Admin: admin@stylescence.com / admin123');
    console.log('   User: john@example.com / password123');
    console.log('   User: jane@example.com / password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();