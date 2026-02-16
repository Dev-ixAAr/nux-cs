import { create } from 'zustand';
import { devtools, persist, createJSONStorage } from 'zustand/middleware';
import { Product } from '@/lib/mockData';

// --- CART INTERFACES ---
export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

export interface BuilderItem {
  product: Product;
  quantity: number;
}

interface BuilderState {
  // Builder State
  selectedParts: Record<string, BuilderItem[]>;
  totalPrice: number;
  estimatedWattage: number;
  compatibilityIssues: string[];

  // Cart State
  cart: CartItem[];
  isCartOpen: boolean;

  // Compare State
  compareList: Product[];

  // Builder Actions
  addPart: (categorySlug: string, product: Product) => void;
  removePart: (categorySlug: string, productId: string) => void;
  clearBuild: () => void;
  getCategoryCount: (categorySlug: string) => number;
  canAddPart: (categorySlug: string) => boolean;

  // Cart Actions
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  getCartTotal: () => number;

  // Compare Actions
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
}

const MULTI_SELECT_CATEGORIES = ['memory', 'storage', 'case-fans'];
const DEFAULT_RAM_SLOTS = 4;
const DEFAULT_STORAGE_SLOTS = 4;

// --- LOGIC ENGINE ---
const checkCompatibility = (parts: Record<string, BuilderItem[]>): { issues: string[], wattage: number } => {
  const issues: string[] = [];
  let totalWattage = 0;

  const getMain = (cat: string) => {
    const items = parts[cat];
    if (Array.isArray(items) && items.length > 0) return items[0].product;
    return null;
  };

  const cpu = getMain('processors');
  const mobo = getMain('motherboards');
  const ramList = parts['memory'] || [];
  const psu = getMain('power-supply');

  // 1. CALCULATE WATTAGE
  Object.entries(parts).forEach(([cat, items]) => {
    if (Array.isArray(items)) {
      items.forEach(item => {
        if (cat !== 'power-supply') {
          // Consumers: Add to total
          totalWattage += (item.product.specs?.wattage || 0) * item.quantity;
        }
      });
    }
  });

  // 2. PSU Check
  if (psu) {
    const psuCapacity = psu.specs?.wattage || 0;
    if (totalWattage > psuCapacity) {
      issues.push(`Critical: Estimated power (${totalWattage}W) exceeds PSU capacity (${psuCapacity}W).`);
    } else if (totalWattage > (psuCapacity - 100)) {
      // Warning buffer (e.g. within 100W)
      issues.push(`Warning: Power usage (${totalWattage}W) is close to PSU limit (${psuCapacity}W). Consider upgrading.`);
    }
  }

  // 3. CPU <-> Motherboard Socket
  if (cpu && mobo) {
    const cpuSocket = cpu.specs?.socket;
    const moboSocket = mobo.specs?.socket;
    if (cpuSocket && moboSocket && !moboSocket.includes(cpuSocket) && !cpuSocket.includes(moboSocket)) {
      issues.push(`Incompatible: CPU (${cpu.name}) uses [${cpuSocket}] but Motherboard supports [${moboSocket}].`);
    }
  }

  // 4. Motherboard <-> RAM Type
  if (mobo && Array.isArray(ramList) && ramList.length > 0) {
    const moboRamType = mobo.specs?.memory_type;
    ramList.forEach(item => {
      if (item.product.specs?.memory_type !== moboRamType) {
        issues.push(`Incompatible: Motherboard uses [${moboRamType}] but you selected [${item.product.specs?.memory_type}] RAM.`);
      }
    });
  }

  return { issues: [...new Set(issues)], wattage: totalWattage };
};

export const useBuilderStore = create<BuilderState>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial Builder State
        selectedParts: {},
        totalPrice: 0,
        estimatedWattage: 0,
        compatibilityIssues: [],

        // Initial Cart State
        cart: [],
        isCartOpen: false,

        // Initial Compare State
        compareList: [],

        // --- BUILDER ACTIONS ---
        addPart: (categorySlug, product) => {
          const { selectedParts } = get();
          const currentCategoryItems = Array.isArray(selectedParts[categorySlug]) ? selectedParts[categorySlug] : [];
          const isMulti = MULTI_SELECT_CATEGORIES.includes(categorySlug);

          let newCategoryItems: BuilderItem[];

          if (!isMulti) {
            newCategoryItems = [{ product, quantity: 1 }];
          } else {
            if (!get().canAddPart(categorySlug)) return;
            const existingItemIndex = currentCategoryItems.findIndex(i => i.product.id === product.id);

            if (existingItemIndex >= 0) {
              newCategoryItems = [...currentCategoryItems];
              newCategoryItems[existingItemIndex].quantity += 1;
            } else {
              newCategoryItems = [...currentCategoryItems, { product, quantity: 1 }];
            }
          }

          const newParts = { ...selectedParts, [categorySlug]: newCategoryItems };

          let newTotal = 0;
          Object.values(newParts).forEach(items => {
            if (Array.isArray(items)) items.forEach(item => newTotal += (item.product.price * item.quantity));
          });

          const { issues, wattage } = checkCompatibility(newParts);

          set({
            selectedParts: newParts,
            totalPrice: newTotal,
            estimatedWattage: wattage,
            compatibilityIssues: issues,
          });
        },

        removePart: (categorySlug, productId) => {
          const { selectedParts } = get();
          const currentCategoryItems = Array.isArray(selectedParts[categorySlug]) ? selectedParts[categorySlug] : [];

          const existingItemIndex = currentCategoryItems.findIndex(i => i.product.id === productId);
          if (existingItemIndex === -1) return;

          let newCategoryItems = [...currentCategoryItems];
          const item = newCategoryItems[existingItemIndex];

          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            newCategoryItems.splice(existingItemIndex, 1);
          }

          const newParts = { ...selectedParts };
          if (newCategoryItems.length === 0) {
            delete newParts[categorySlug];
          } else {
            newParts[categorySlug] = newCategoryItems;
          }

          let newTotal = 0;
          Object.values(newParts).forEach(items => {
            if (Array.isArray(items)) items.forEach(item => newTotal += (item.product.price * item.quantity));
          });

          const { issues, wattage } = checkCompatibility(newParts);

          set({
            selectedParts: newParts,
            totalPrice: newTotal,
            estimatedWattage: wattage,
            compatibilityIssues: issues,
          });
        },

        clearBuild: () => set({ selectedParts: {}, totalPrice: 0, estimatedWattage: 0, compatibilityIssues: [] }),

        getCategoryCount: (categorySlug) => {
          const items = get().selectedParts[categorySlug];
          if (!Array.isArray(items)) return 0;
          return items.reduce((acc, item) => acc + item.quantity, 0);
        },

        canAddPart: (categorySlug) => {
          const { selectedParts, getCategoryCount } = get();
          if (!MULTI_SELECT_CATEGORIES.includes(categorySlug)) return true;
          const currentCount = getCategoryCount(categorySlug);
          const mobo = selectedParts['motherboards']?.[0]?.product;

          if (categorySlug === 'memory') {
            const limit = mobo?.specs?.memory_slots || DEFAULT_RAM_SLOTS;
            return currentCount < Number(limit);
          }
          if (categorySlug === 'storage') {
            const limit = mobo?.specs?.storage_slots || DEFAULT_STORAGE_SLOTS;
            return currentCount < Number(limit);
          }
          if (categorySlug === 'case-fans') {
            return currentCount < 9;
          }
          return true;
        },

        // --- CART ACTIONS ---
        addToCart: (product) => {
          const { cart } = get();
          const existingItem = cart.find(item => item.id === product.id);

          let newCart;
          if (existingItem) {
            newCart = cart.map(item =>
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            );
          } else {
            newCart = [...cart, {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              category: product.category,
              quantity: 1
            }];
          }
          set({ cart: newCart, isCartOpen: true });
        },

        removeFromCart: (productId) => {
          set((state) => ({
            cart: state.cart.filter(item => item.id !== productId)
          }));
        },

        updateQuantity: (productId, delta) => {
          const { cart } = get();
          const newCart = cart.map(item => {
            if (item.id === productId) {
              const newQty = Math.max(1, item.quantity + delta);
              return { ...item, quantity: newQty };
            }
            return item;
          });
          set({ cart: newCart });
        },

        clearCart: () => set({ cart: [] }),

        toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),

        getCartTotal: () => {
          const { cart } = get();
          return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
        },

        // --- COMPARE ACTIONS ---
        addToCompare: (product) => {
          const { compareList } = get();
          if (compareList.find(p => p.id === product.id)) return; // No duplicates
          if (compareList.length >= 3) return; // Max 3
          set({ compareList: [...compareList, product] });
        },

        removeFromCompare: (productId) => {
          set((state) => ({
            compareList: state.compareList.filter(p => p.id !== productId)
          }));
        },

        clearCompare: () => set({ compareList: [] }),
      }),
      {
        name: 'nexus-builder-storage',
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
      }
    )
  )
);