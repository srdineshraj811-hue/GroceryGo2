export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  unit: string;
  stock: number;
  categoryId: string;
  subcategoryId?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  products: Product[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  itemCount: number;
}

export const categories: Category[] = [
  { id: "fresh-produce", name: "Fresh Produce", image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&h=400&fit=crop", itemCount: 45 },
  { id: "dairy-eggs", name: "Dairy & Eggs", image: "https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&h=400&fit=crop", itemCount: 32 },
  { id: "meat-seafood", name: "Meat & Seafood", image: "https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=600&h=400&fit=crop", itemCount: 28 },
  { id: "bakery", name: "Bakery & Bread", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=400&fit=crop", itemCount: 24 },
  { id: "beverages", name: "Beverages", image: "https://images.unsplash.com/photo-1437418747212-8d9709afab22?w=600&h=400&fit=crop", itemCount: 38 },
  { id: "snacks", name: "Snacks & Chips", image: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&h=400&fit=crop", itemCount: 42 },
  { id: "frozen", name: "Frozen Foods", image: "https://images.unsplash.com/photo-1628773822990-202f6816fed8?w=600&h=400&fit=crop", itemCount: 36 },
  { id: "pantry", name: "Pantry Staples", image: "https://images.unsplash.com/photo-1596797882870-8c33deeac224?w=600&h=400&fit=crop", itemCount: 52 },
];

export const allProducts: Product[] = [
  {
    id: "prod-1",
    name: "Organic Bananas",
    price: 0.79,
    imageUrl: "https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&h=400&fit=crop",
    unit: "lb",
    stock: 150,
    categoryId: "fresh-produce",
    subcategoryId: "fruits"
  },
  {
    id: "prod-2",
    name: "Honeycrisp Apples",
    price: 2.99,
    imageUrl: "https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?w=400&h=400&fit=crop",
    unit: "lb",
    stock: 85,
    categoryId: "fresh-produce",
    subcategoryId: "fruits"
  },
  {
    id: "prod-3",
    name: "Fresh Strawberries",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400&h=400&fit=crop",
    unit: "16 oz",
    stock: 45,
    categoryId: "fresh-produce",
    subcategoryId: "fruits"
  },
  {
    id: "prod-4",
    name: "Blueberries",
    price: 5.99,
    imageUrl: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=400&h=400&fit=crop",
    unit: "pint",
    stock: 32,
    categoryId: "fresh-produce",
    subcategoryId: "fruits"
  },
  {
    id: "prod-5",
    name: "Red Grapes",
    price: 3.49,
    imageUrl: "https://images.unsplash.com/photo-1599819177626-c0d404e246a9?w=400&h=400&fit=crop",
    unit: "lb",
    stock: 60,
    categoryId: "fresh-produce",
    subcategoryId: "fruits"
  },
  {
    id: "prod-6",
    name: "Avocados",
    price: 1.99,
    imageUrl: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop",
    unit: "each",
    stock: 120,
    categoryId: "fresh-produce",
    subcategoryId: "fruits"
  },
  {
    id: "prod-7",
    name: "Roma Tomatoes",
    price: 2.99,
    imageUrl: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop",
    unit: "lb",
    stock: 95,
    categoryId: "fresh-produce",
    subcategoryId: "vegetables"
  },
  {
    id: "prod-8",
    name: "Baby Carrots",
    price: 2.49,
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400&h=400&fit=crop",
    unit: "1 lb",
    stock: 70,
    categoryId: "fresh-produce",
    subcategoryId: "vegetables"
  },
  {
    id: "prod-9",
    name: "Fresh Broccoli",
    price: 2.99,
    imageUrl: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=400&h=400&fit=crop",
    unit: "lb",
    stock: 55,
    categoryId: "fresh-produce",
    subcategoryId: "vegetables"
  },
  {
    id: "prod-10",
    name: "Bell Peppers",
    price: 1.79,
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&h=400&fit=crop",
    unit: "each",
    stock: 80,
    categoryId: "fresh-produce",
    subcategoryId: "vegetables"
  },
  {
    id: "prod-11",
    name: "Romaine Lettuce",
    price: 2.99,
    imageUrl: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=400&fit=crop",
    unit: "head",
    stock: 40,
    categoryId: "fresh-produce",
    subcategoryId: "vegetables"
  },
  {
    id: "prod-12",
    name: "Baby Spinach",
    price: 3.99,
    imageUrl: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    unit: "10 oz",
    stock: 50,
    categoryId: "fresh-produce",
    subcategoryId: "vegetables"
  },
  {
    id: "prod-13",
    name: "Whole Milk",
    price: 4.49,
    imageUrl: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&h=400&fit=crop",
    unit: "gal",
    stock: 100,
    categoryId: "dairy-eggs",
    subcategoryId: "milk"
  },
  {
    id: "prod-14",
    name: "2% Reduced Fat Milk",
    price: 4.29,
    imageUrl: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    unit: "gal",
    stock: 90,
    categoryId: "dairy-eggs",
    subcategoryId: "milk"
  },
  {
    id: "prod-15",
    name: "Greek Yogurt",
    price: 5.99,
    imageUrl: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
    unit: "32 oz",
    stock: 65,
    categoryId: "dairy-eggs",
    subcategoryId: "yogurt"
  },
  {
    id: "prod-16",
    name: "Large Eggs",
    price: 3.99,
    imageUrl: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    unit: "dozen",
    stock: 110,
    categoryId: "dairy-eggs",
    subcategoryId: "eggs"
  },
  {
    id: "prod-17",
    name: "Cheddar Cheese",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?w=400&h=400&fit=crop",
    unit: "8 oz",
    stock: 75,
    categoryId: "dairy-eggs",
    subcategoryId: "cheese"
  },
  {
    id: "prod-18",
    name: "Mozzarella Cheese",
    price: 4.49,
    imageUrl: "https://images.unsplash.com/photo-1628739837138-c4e9daf48d43?w=400&h=400&fit=crop",
    unit: "8 oz",
    stock: 68,
    categoryId: "dairy-eggs",
    subcategoryId: "cheese"
  },
  {
    id: "prod-19",
    name: "Unsalted Butter",
    price: 5.49,
    imageUrl: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400&h=400&fit=crop",
    unit: "1 lb",
    stock: 85,
    categoryId: "dairy-eggs",
    subcategoryId: "butter"
  },
  {
    id: "prod-20",
    name: "Boneless Chicken Breast",
    price: 8.99,
    imageUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400&h=400&fit=crop",
    unit: "lb",
    stock: 45,
    categoryId: "meat-seafood",
    subcategoryId: "chicken"
  },
  {
    id: "prod-21",
    name: "Ground Beef (80/20)",
    price: 6.99,
    imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=400&h=400&fit=crop",
    unit: "lb",
    stock: 55,
    categoryId: "meat-seafood",
    subcategoryId: "beef"
  },
  {
    id: "prod-22",
    name: "Pork Chops",
    price: 5.99,
    imageUrl: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=400&h=400&fit=crop",
    unit: "lb",
    stock: 38,
    categoryId: "meat-seafood",
    subcategoryId: "pork"
  },
  {
    id: "prod-23",
    name: "Wild Salmon Fillet",
    price: 14.99,
    imageUrl: "https://images.unsplash.com/photo-1485704686097-ed47f7263ca4?w=400&h=400&fit=crop",
    unit: "lb",
    stock: 22,
    categoryId: "meat-seafood",
    subcategoryId: "seafood"
  },
  {
    id: "prod-24",
    name: "Large Shrimp",
    price: 12.99,
    imageUrl: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=400&h=400&fit=crop",
    unit: "lb",
    stock: 28,
    categoryId: "meat-seafood",
    subcategoryId: "seafood"
  },
  {
    id: "prod-25",
    name: "Sourdough Bread",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1549931319-a545dcf3bc83?w=400&h=400&fit=crop",
    unit: "loaf",
    stock: 35,
    categoryId: "bakery",
    subcategoryId: "bread"
  },
  {
    id: "prod-26",
    name: "Croissants",
    price: 5.99,
    imageUrl: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400&h=400&fit=crop",
    unit: "6 ct",
    stock: 28,
    categoryId: "bakery",
    subcategoryId: "pastries"
  },
  {
    id: "prod-27",
    name: "Whole Wheat Bread",
    price: 3.49,
    imageUrl: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    unit: "loaf",
    stock: 42,
    categoryId: "bakery",
    subcategoryId: "bread"
  },
  {
    id: "prod-28",
    name: "Bagels",
    price: 4.49,
    imageUrl: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?w=400&h=400&fit=crop",
    unit: "6 ct",
    stock: 50,
    categoryId: "bakery",
    subcategoryId: "bread"
  },
  {
    id: "prod-29",
    name: "Orange Juice",
    price: 5.99,
    imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
    unit: "64 oz",
    stock: 70,
    categoryId: "beverages",
    subcategoryId: "juice"
  },
  {
    id: "prod-30",
    name: "Coca-Cola",
    price: 6.99,
    imageUrl: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop",
    unit: "12 pk",
    stock: 85,
    categoryId: "beverages",
    subcategoryId: "soda"
  },
  {
    id: "prod-31",
    name: "Sparkling Water",
    price: 4.99,
    imageUrl: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=400&h=400&fit=crop",
    unit: "12 pk",
    stock: 95,
    categoryId: "beverages",
    subcategoryId: "water"
  },
  {
    id: "prod-32",
    name: "Coffee",
    price: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    unit: "12 oz",
    stock: 60,
    categoryId: "beverages",
    subcategoryId: "coffee"
  },
  {
    id: "prod-33",
    name: "Potato Chips",
    price: 3.99,
    imageUrl: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop",
    unit: "10 oz",
    stock: 110,
    categoryId: "snacks",
    subcategoryId: "chips"
  },
  {
    id: "prod-34",
    name: "Oreo Cookies",
    price: 4.49,
    imageUrl: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=400&fit=crop",
    unit: "14.3 oz",
    stock: 90,
    categoryId: "snacks",
    subcategoryId: "cookies"
  },
  {
    id: "prod-35",
    name: "Tortilla Chips",
    price: 3.49,
    imageUrl: "https://images.unsplash.com/photo-1613919113640-4b51ab0f5b75?w=400&h=400&fit=crop",
    unit: "13 oz",
    stock: 75,
    categoryId: "snacks",
    subcategoryId: "chips"
  },
  {
    id: "prod-36",
    name: "Frozen Pizza",
    price: 6.99,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop",
    unit: "each",
    stock: 48,
    categoryId: "frozen",
    subcategoryId: "meals"
  },
  {
    id: "prod-37",
    name: "Ice Cream",
    price: 5.99,
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=400&fit=crop",
    unit: "48 oz",
    stock: 55,
    categoryId: "frozen",
    subcategoryId: "desserts"
  },
  {
    id: "prod-38",
    name: "Frozen Vegetables",
    price: 2.99,
    imageUrl: "https://images.unsplash.com/photo-1590165482129-1b8b27698780?w=400&h=400&fit=crop",
    unit: "16 oz",
    stock: 88,
    categoryId: "frozen",
    subcategoryId: "vegetables"
  },
  {
    id: "prod-39",
    name: "White Rice",
    price: 8.99,
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    unit: "5 lb",
    stock: 65,
    categoryId: "pantry",
    subcategoryId: "grains"
  },
  {
    id: "prod-40",
    name: "Pasta",
    price: 1.99,
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=400&fit=crop",
    unit: "16 oz",
    stock: 125,
    categoryId: "pantry",
    subcategoryId: "grains"
  },
];

export const subcategories: Subcategory[] = [
  {
    id: "fruits",
    name: "Fresh Fruits",
    categoryId: "fresh-produce",
    products: allProducts.filter(p => p.subcategoryId === "fruits")
  },
  {
    id: "vegetables",
    name: "Fresh Vegetables",
    categoryId: "fresh-produce",
    products: allProducts.filter(p => p.subcategoryId === "vegetables")
  },
  {
    id: "milk",
    name: "Milk",
    categoryId: "dairy-eggs",
    products: allProducts.filter(p => p.subcategoryId === "milk")
  },
  {
    id: "yogurt",
    name: "Yogurt",
    categoryId: "dairy-eggs",
    products: allProducts.filter(p => p.subcategoryId === "yogurt")
  },
  {
    id: "cheese",
    name: "Cheese",
    categoryId: "dairy-eggs",
    products: allProducts.filter(p => p.subcategoryId === "cheese")
  },
  {
    id: "eggs",
    name: "Eggs",
    categoryId: "dairy-eggs",
    products: allProducts.filter(p => p.subcategoryId === "eggs")
  },
  {
    id: "butter",
    name: "Butter & Margarine",
    categoryId: "dairy-eggs",
    products: allProducts.filter(p => p.subcategoryId === "butter")
  },
  {
    id: "chicken",
    name: "Chicken",
    categoryId: "meat-seafood",
    products: allProducts.filter(p => p.subcategoryId === "chicken")
  },
  {
    id: "beef",
    name: "Beef",
    categoryId: "meat-seafood",
    products: allProducts.filter(p => p.subcategoryId === "beef")
  },
  {
    id: "pork",
    name: "Pork",
    categoryId: "meat-seafood",
    products: allProducts.filter(p => p.subcategoryId === "pork")
  },
  {
    id: "seafood",
    name: "Seafood",
    categoryId: "meat-seafood",
    products: allProducts.filter(p => p.subcategoryId === "seafood")
  },
  {
    id: "bread",
    name: "Bread & Rolls",
    categoryId: "bakery",
    products: allProducts.filter(p => p.subcategoryId === "bread")
  },
  {
    id: "pastries",
    name: "Pastries",
    categoryId: "bakery",
    products: allProducts.filter(p => p.subcategoryId === "pastries")
  },
  {
    id: "juice",
    name: "Juice",
    categoryId: "beverages",
    products: allProducts.filter(p => p.subcategoryId === "juice")
  },
  {
    id: "soda",
    name: "Soda & Pop",
    categoryId: "beverages",
    products: allProducts.filter(p => p.subcategoryId === "soda")
  },
  {
    id: "water",
    name: "Water",
    categoryId: "beverages",
    products: allProducts.filter(p => p.subcategoryId === "water")
  },
  {
    id: "coffee",
    name: "Coffee & Tea",
    categoryId: "beverages",
    products: allProducts.filter(p => p.subcategoryId === "coffee")
  },
  {
    id: "chips",
    name: "Chips",
    categoryId: "snacks",
    products: allProducts.filter(p => p.subcategoryId === "chips")
  },
  {
    id: "cookies",
    name: "Cookies & Crackers",
    categoryId: "snacks",
    products: allProducts.filter(p => p.subcategoryId === "cookies")
  },
  {
    id: "meals",
    name: "Frozen Meals",
    categoryId: "frozen",
    products: allProducts.filter(p => p.subcategoryId === "meals")
  },
  {
    id: "desserts",
    name: "Frozen Desserts",
    categoryId: "frozen",
    products: allProducts.filter(p => p.subcategoryId === "desserts")
  },
  {
    id: "frozen-vegetables",
    name: "Frozen Vegetables",
    categoryId: "frozen",
    products: allProducts.filter(p => p.subcategoryId === "vegetables" && p.categoryId === "frozen")
  },
  {
    id: "grains",
    name: "Rice & Grains",
    categoryId: "pantry",
    products: allProducts.filter(p => p.subcategoryId === "grains")
  },
];

export const popularProducts = [
  allProducts.find(p => p.id === "prod-1")!, // Organic Bananas
  allProducts.find(p => p.id === "prod-13")!, // Whole Milk
  allProducts.find(p => p.id === "prod-16")!, // Eggs
  allProducts.find(p => p.id === "prod-7")!, // Roma Tomatoes
  allProducts.find(p => p.id === "prod-20")!, // Chicken Breast
  allProducts.find(p => p.id === "prod-25")!, // Sourdough Bread
];

export const previouslyOrderedItems = [
  allProducts.find(p => p.id === "prod-13")!, // Whole Milk
  allProducts.find(p => p.id === "prod-1")!, // Organic Bananas
  allProducts.find(p => p.id === "prod-16")!, // Eggs
  allProducts.find(p => p.id === "prod-27")!, // Whole Wheat Bread
  allProducts.find(p => p.id === "prod-15")!, // Greek Yogurt
  allProducts.find(p => p.id === "prod-29")!, // Orange Juice
];
