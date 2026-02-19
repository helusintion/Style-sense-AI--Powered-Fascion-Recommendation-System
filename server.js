const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Sample products data
const products = [
  {
    _id: '1',
    name: 'Classic White Shirt',
    description: 'Timeless white cotton shirt perfect for any occasion. Made from 100% premium cotton with a classic fit.',
    price: 49.99,
    brand: 'Zara',
    category: 'Men',
    subcategory: 'Shirts',
    image: 'https://images.unsplash.com/photo-1598033121413-9c4f7aa0735d?w=600',
    images: [
      'https://images.unsplash.com/photo-1598033121413-9c4f7aa0735d?w=600',
      'https://images.unsplash.com/photo-1598033121413-9c4f7aa0735d?w=600&rot=90',
      'https://images.unsplash.com/photo-1598033121413-9c4f7aa0735d?w=600&rot=180'
    ],
    rating: 4.5,
    numReviews: 128,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Blue', 'Black'],
    material: 'Cotton',
    occasion: ['Casual', 'Formal'],
    season: ['All']
  },
  {
    _id: '2',
    name: 'Little Black Dress',
    description: 'Elegant black dress perfect for evening events. Features a flattering A-line silhouette and delicate lace details.',
    price: 89.99,
    brand: 'H&M',
    category: 'Women',
    subcategory: 'Dresses',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&rot=90',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&rot=180'
    ],
    rating: 4.8,
    numReviews: 256,
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Black'],
    material: 'Polyester',
    occasion: ['Party', 'Evening'],
    season: ['All']
  },
  {
    _id: '3',
    name: 'Slim Fit Jeans',
    description: 'Modern slim fit jeans in dark wash. Stretchy comfort fabric for all-day wear with a classic five-pocket design.',
    price: 79.99,
    brand: "Levi's",
    category: 'Men',
    subcategory: 'Jeans',
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&rot=90',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&rot=180'
    ],
    rating: 4.6,
    numReviews: 189,
    inStock: true,
    sizes: ['30', '32', '34', '36'],
    colors: ['Blue', 'Dark Blue', 'Black'],
    material: 'Denim',
    occasion: ['Casual'],
    season: ['All']
  },
  {
    _id: '4',
    name: 'Floral Summer Dress',
    description: 'Beautiful floral print maxi dress. Light and breezy fabric perfect for summer days and beach vacations.',
    price: 59.99,
    brand: 'Forever 21',
    category: 'Women',
    subcategory: 'Dresses',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600',
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&rot=90',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&rot=180'
    ],
    rating: 4.3,
    numReviews: 92,
    inStock: true,
    sizes: ['XS', 'S', 'M'],
    colors: ['Pink', 'Blue', 'Yellow'],
    material: 'Cotton',
    occasion: ['Casual', 'Vacation'],
    season: ['Summer']
  },
  {
    _id: '5',
    name: 'Leather Biker Jacket',
    description: 'Classic biker style leather jacket. Made from premium genuine leather with silver-tone hardware.',
    price: 199.99,
    brand: 'AllSaints',
    category: 'Men',
    subcategory: 'Jackets',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&rot=90',
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&rot=180'
    ],
    rating: 4.7,
    numReviews: 67,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Brown'],
    material: 'Leather',
    occasion: ['Casual', 'Party'],
    season: ['Fall', 'Winter']
  },
  {
    _id: '6',
    name: 'Silk Blouse',
    description: 'Luxurious silk blouse with a subtle sheen. Perfect for office wear or evening events.',
    price: 69.99,
    brand: 'Equipment',
    category: 'Women',
    subcategory: 'Tops',
    image: 'https://images.unsplash.com/photo-1588353293547-b83b9ab79d5f?w=600',
    images: [
      'https://images.unsplash.com/photo-1588353293547-b83b9ab79d5f?w=600',
      'https://images.unsplash.com/photo-1588353293547-b83b9ab79d5f?w=600&rot=90',
      'https://images.unsplash.com/photo-1588353293547-b83b9ab79d5f?w=600&rot=180'
    ],
    rating: 4.5,
    numReviews: 78,
    inStock: true,
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Cream', 'Navy', 'Burgundy'],
    material: 'Silk',
    occasion: ['Formal', 'Business'],
    season: ['All']
  },
  {
    _id: '7',
    name: 'Hooded Sweatshirt',
    description: 'Cozy cotton blend hoodie with kangaroo pocket. Perfect for casual days and lounging.',
    price: 39.99,
    brand: 'Gap',
    category: 'Unisex',
    subcategory: 'Sweatshirts',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&rot=90',
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&rot=180'
    ],
    rating: 4.4,
    numReviews: 156,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Gray', 'Black', 'Navy'],
    material: 'Cotton Blend',
    occasion: ['Casual', 'Sporty'],
    season: ['Fall', 'Winter']
  },
  {
    _id: '8',
    name: 'Running Shoes',
    description: 'Professional running shoes with cushioned sole and breathable mesh upper.',
    price: 89.99,
    brand: 'Nike',
    category: 'Unisex',
    subcategory: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&rot=90',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&rot=180'
    ],
    rating: 4.9,
    numReviews: 345,
    inStock: true,
    sizes: ['7', '8', '9', '10', '11', '12'],
    colors: ['Red', 'White', 'Black', 'Blue'],
    material: 'Synthetic',
    occasion: ['Sports', 'Workout'],
    season: ['All']
  }
];

// Sample users
const users = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    token: 'sample-token-123'
  }
];

// Auth routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  
  if (email === 'john@example.com' && password === 'password123') {
    res.json({
      success: true,
      token: 'sample-token-123',
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  
  res.json({
    success: true,
    token: 'sample-token-' + Date.now(),
    user: {
      id: Date.now().toString(),
      name,
      email
    }
  });
});

app.get('/api/auth/me', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (token === 'sample-token-123') {
    res.json({
      success: true,
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com'
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Not authorized'
    });
  }
});

// Product routes
app.get('/api/products', (req, res) => {
  const { category, search } = req.query;
  
  let filteredProducts = [...products];
  
  if (category) {
    filteredProducts = filteredProducts.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
  }
  
  if (search) {
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    );
  }
  
  res.json({
    success: true,
    count: filteredProducts.length,
    products: filteredProducts
  });
});

app.get('/api/products/featured', (req, res) => {
  const featured = products.slice(0, 4);
  res.json({
    success: true,
    products: featured
  });
});

app.get('/api/products/trending', (req, res) => {
  const trending = [...products].sort((a, b) => b.rating - a.rating).slice(0, 4);
  res.json({
    success: true,
    products: trending
  });
});

app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params;
  const filtered = products.filter(p => 
    p.category.toLowerCase() === category.toLowerCase()
  );
  
  res.json({
    success: true,
    count: filtered.length,
    products: filtered
  });
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  
  if (product) {
    res.json({
      success: true,
      product
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
});

app.get('/api/products/:id/related', (req, res) => {
  const product = products.find(p => p._id === req.params.id);
  
  if (product) {
    const related = products
      .filter(p => p._id !== product._id && p.category === product.category)
      .slice(0, 4);
    
    res.json({
      success: true,
      products: related
    });
  } else {
    res.json({
      success: true,
      products: []
    });
  }
});

app.get('/api/products/search', (req, res) => {
  const { q } = req.query;
  
  if (!q) {
    return res.json({
      success: true,
      products: []
    });
  }
  
  const results = products.filter(p => 
    p.name.toLowerCase().includes(q.toLowerCase()) ||
    p.description.toLowerCase().includes(q.toLowerCase()) ||
    p.brand.toLowerCase().includes(q.toLowerCase()) ||
    p.category.toLowerCase().includes(q.toLowerCase())
  );
  
  res.json({
    success: true,
    count: results.length,
    products: results
  });
});

app.get('/api/products/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json({
    success: true,
    categories
  });
});

// Order routes
app.get('/api/orders/myorders', (req, res) => {
  res.json({
    success: true,
    orders: []
  });
});

// Wishlist routes
app.get('/api/auth/wishlist', (req, res) => {
  res.json({
    success: true,
    wishlist: []
  });
});

// Recommendation routes
app.post('/api/recommendations', (req, res) => {
  const { occasion, gender, budgetMin, budgetMax } = req.body;
  
  let recommendations = [...products];
  
  if (gender) {
    recommendations = recommendations.filter(p => p.category === gender);
  }
  
  if (budgetMin) {
    recommendations = recommendations.filter(p => p.price >= budgetMin);
  }
  
  if (budgetMax) {
    recommendations = recommendations.filter(p => p.price <= budgetMax);
  }
  
  if (occasion) {
    recommendations = recommendations.filter(p => 
      p.occasion?.includes(occasion)
    );
  }
  
  res.json({
    success: true,
    recommendations: recommendations.slice(0, 8),
    styleAnalysis: "Based on your preferences, we've selected these items that match your style.",
    trendingStyles: ["Casual", "Formal", "Streetwear", "Minimalist"],
    metadata: {
      totalMatches: recommendations.length,
      timestamp: new Date()
    }
  });
});

app.get('/api/recommendations/quick', (req, res) => {
  const quick = [...products].sort(() => 0.5 - Math.random()).slice(0, 8);
  res.json({
    success: true,
    recommendations: quick
  });
});

app.get('/api/recommendations/occasion/:occasion', (req, res) => {
  const { occasion } = req.params;
  const filtered = products.filter(p => p.occasion?.includes(occasion));
  
  res.json({
    success: true,
    occasion,
    count: filtered.length,
    products: filtered.slice(0, 8)
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({
    message: '🚀 Stylescence Backend is running!',
    status: 'success',
    productsCount: products.length,
    timestamp: new Date()
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}/api/test`);
  console.log(`📦 Products loaded: ${products.length}`);
});