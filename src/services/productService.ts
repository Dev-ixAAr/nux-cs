import { PRODUCTS, CATEGORIES } from "@/lib/mockData";

// Define a consistent latency to mimic real-world network conditions (e.g., 500ms)
const LATENCY = 500;

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  brand: string;
  image: string;
  inStock: boolean;
  rating: number;
  specs: Record<string, string | number>;
}

export const productService = {
  // Fetch all products
  getAllProducts: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(PRODUCTS);
      }, LATENCY);
    });
  },

  // Fetch products by specific category (e.g., 'cpu')
  getProductsByCategory: async (categorySlug: string): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filtered = PRODUCTS.filter((p) => p.category === categorySlug);
        resolve(filtered);
      }, LATENCY);
    });
  },

  // Fetch a single product details
  getProductById: async (id: string): Promise<Product | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const product = PRODUCTS.find((p) => p.id === id);
        resolve(product);
      }, LATENCY);
    });
  },

  // Fetch "Featured" deals (Logic: In Stock + High Rating)
  getFeaturedDeals: async (): Promise<Product[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const deals = PRODUCTS.filter((p) => p.inStock && p.rating >= 4.8).slice(0, 4);
        resolve(deals);
      }, LATENCY);
    });
  },
  
  // Fetch Categories
  getCategories: async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(CATEGORIES), LATENCY);
    })
  }
};