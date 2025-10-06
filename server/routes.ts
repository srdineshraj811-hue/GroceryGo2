import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Optionally use the Drizzle db if available
let db: any;
try {
  // dynamic import so server can run without a DB configured
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  db = require("./db").db;
} catch (e) {
  db = undefined;
}

const mockCategories = [
  { id: "fresh-produce", name: "Fresh Produce", imageUrl: "" },
  { id: "dairy", name: "Dairy & Eggs", imageUrl: "" },
  { id: "meat-seafood", name: "Meat & Seafood", imageUrl: "" },
];

const mockProducts = [
  { id: "1", name: "Organic Bananas", price: 2.99, imageUrl: "", unit: "each", categoryId: "fresh-produce", stock: 20 },
  { id: "2", name: "Milk 2%", price: 3.49, imageUrl: "", unit: "1L", categoryId: "dairy", stock: 10 },
  { id: "3", name: "Chicken Breast", price: 9.99, imageUrl: "", unit: "lb", categoryId: "meat-seafood", stock: 5 },
];

export async function registerRoutes(app: Express): Promise<Server> {
  // add a health check
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  // categories
  app.get("/api/categories", async (_req, res) => {
    if (db) {
      try {
        const categories = await db.select().from(db.schema.categories).limit(100);
        return res.json(categories);
      } catch (e) {
        // fall through to mock data
        // eslint-disable-next-line no-console
        console.error("db read categories failed, falling back to mock", e);
      }
    }

    return res.json(mockCategories);
  });

  // products with optional category filter
  app.get("/api/products", async (req, res) => {
    const { category } = req.query;
    if (db) {
      try {
        const q = db.select().from(db.schema.products).limit(100);
        const products = await q;
        return res.json(products);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("db read products failed, falling back to mock", e);
      }
    }

    const filtered = typeof category === "string" ? mockProducts.filter(p => p.categoryId === category) : mockProducts;
    return res.json(filtered);
  });

  // basic user creation via storage (in-memory or other implementation)
  app.post("/api/users", async (req, res) => {
    try {
      const insertUser = req.body;
      const existing = await storage.getUserByUsername(insertUser.username);
      if (existing) {
        return res.status(409).json({ message: "username already exists" });
      }
      const created = await storage.createUser(insertUser);
      return res.status(201).json(created);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      return res.status(500).json({ message: "could not create user" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
