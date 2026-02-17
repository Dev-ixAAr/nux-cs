// src/lib/mockData.ts

// --- INTERFACES ---

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  category: string; // Must match CATEGORIES slugs
  image: string;
  inStock: boolean;
  rating: number;
  condition: 'new' | 'used';
  badge?: string;
  stockStatus?: 'In Stock' | 'Out of Stock';
  detailedSpecs?: Record<string, string>;
  features?: string[];
  description?: string;
  images?: string[];
  technicalSpecs?: {
    processor: string;
    os: string;
    memory: string;
    storage: string;
    graphics: string;
    display: string;
    ports: string[];
    connectivity: string;
    audio: string;
    webcam: string;
    battery: string;
    dimensions: string;
    weight: string;
    warranty: string;
  };
  specs?: {
    socket?: string;        // CPU/Mobo: LGA1700, AM5, AM4
    socket_support?: string[]; // Cooler support
    memory_type?: string;   // Mobo/RAM: DDR5, DDR4
    form_factor?: string;   // Mobo/Case: ATX, MATX, ITX
    wattage?: number;       // PSU/CPU/GPU
    core_count?: number;
    base_clock?: string;
    boost_clock?: string;
    vram?: string;
    chipset?: string;       // Z790, B650, RTX 4090
    capacity?: string;
    speed?: string;
    latency?: string;
    efficiency?: string;    // PSU: 80+ Gold
    radiator_size?: string; // Cooler: 240mm, 360mm
    length?: number;        // GPU Length in mm
    memory_slots?: number;  // Mobo RAM Limit
    storage_slots?: number; // Mobo M.2 Limit
    condition_note?: string; // Specific notes for used items
    modular?: string;       // PSU
    standard?: string;      // PSU ATX 3.0
    panels?: string;        // Case
    airflow?: string;       // Case
    weight?: string;        // Paste
    conductivity?: string;  // Paste
    height?: string;        // Air Cooler
    fan_count?: number;     // Cooler
    screen?: string;        // AIO LCD
    type?: string;          // SSD/HDD/Case Type
    read_speed?: string;    // SSD
    screenSize?: string;    // Laptop e.g. "18\""
    gpuShort?: string;      // Laptop e.g. "RTX 4090"
    ramShort?: string;      // Laptop e.g. "32GB DDR5"

    [key: string]: any;
  };
}

export interface PrebuiltPC {
  id: string;
  name: string;
  price: number;
  image: string;
  specs: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
}

// --- CATEGORIES ---

export const CATEGORIES: Category[] = [
  {
    id: 'processors',
    name: 'Processors',
    slug: 'processors',
    image: 'https://images.unsplash.com/photo-1555616635-6409600315ac?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'motherboards',
    name: 'Motherboards',
    slug: 'motherboards',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'graphics-cards',
    name: 'Graphics Cards',
    slug: 'graphics-cards',
    image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'memory',
    name: 'Memory',
    slug: 'memory',
    image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'storage',
    name: 'Storage',
    slug: 'storage',
    image: 'https://images.unsplash.com/photo-1597852074816-d933c7d2b988?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'coolers',
    name: 'Coolers',
    slug: 'coolers',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'power-supply',
    name: 'Power Supply',
    slug: 'power-supply',
    image: 'https://m.media-amazon.com/images/I/71S31eXjJbL._AC_SL1500_.jpg'
  },
  {
    id: 'pc-cases',
    name: 'Pc Cases',
    slug: 'pc-cases',
    image: 'https://images.unsplash.com/photo-1587202372634-32705e3bf49c?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'thermal-paste',
    name: 'Thermal Paste',
    slug: 'thermal-paste',
    image: 'https://m.media-amazon.com/images/I/61abc5M1LcL._AC_SL1500_.jpg'
  },
  {
    id: 'case-fans',
    name: 'Casing Fans',
    slug: 'case-fans',
    image: 'https://m.media-amazon.com/images/I/71SimpleI0L._AC_SL1500_.jpg'
  },
];

// --- SITE SETTINGS ---

export const SITE_SETTINGS = {
  heroVideoUrl: "https://cdn.pixabay.com/video/2021/04/26/72363-542288525_large.mp4",
  currency: "LKR",
  storeName: "NEXUS PC",
};

// --- PRODUCTS INVENTORY ---

export const PRODUCTS: Product[] = [
  // ==========================================
  // PROCESSORS (CPUs) - INTEL
  // ==========================================
  {
    id: 'cpu-intel-14900k',
    name: 'Intel Core i9-14900K',
    brand: 'INTEL',
    price: 215000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/61uJ3h59HXL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.9,
    condition: 'new',
    specs: { socket: 'LGA1700', core_count: 24, base_clock: '3.2GHz', boost_clock: '6.0GHz', wattage: 253 },
    stockStatus: 'In Stock',
    detailedSpecs: {
      "Product Line": "Intel® Core™ i9 Processors (14th Gen)",
      "Code Name": "Raptor Lake Refresh",
      "Total Cores": "24",
      "Performance-cores": "8",
      "Efficient-cores": "16",
      "Total Threads": "32",
      "Max Turbo Frequency": "6.0 GHz",
      "Performance-core Max Turbo Frequency": "5.6 GHz",
      "Efficient-core Max Turbo Frequency": "4.4 GHz",
      "Performance-core Base Frequency": "3.2 GHz",
      "Efficient-core Base Frequency": "2.4 GHz",
      "Cache": "36 MB Intel® Smart Cache",
      "Total L2 Cache": "32 MB",
      "Processor Base Power": "125 W",
      "Maximum Turbo Power": "253 W",
      "Max Memory Size": "192 GB",
      "Memory Types": "Up to DDR5 5600 MT/s, Up to DDR4 3200 MT/s",
      "Processor Graphics": "Intel® UHD Graphics 770"
    }
  },
  {
    id: 'cpu-intel-14700k',
    name: 'Intel Core i7-14700K',
    brand: 'INTEL',
    price: 165000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/61uJ3h59HXL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { socket: 'LGA1700', core_count: 20, base_clock: '3.4GHz', boost_clock: '5.6GHz', wattage: 253 },
    stockStatus: 'In Stock',
    detailedSpecs: {
      "Product Line": "Intel® Core™ i7 Processors (14th Gen)",
      "Code Name": "Raptor Lake Refresh",
      "Total Cores": "20",
      "Performance-cores": "8",
      "Efficient-cores": "12",
      "Total Threads": "28",
      "Max Turbo Frequency": "5.6 GHz",
      "Performance-core Max Turbo Frequency": "5.5 GHz",
      "Efficient-core Max Turbo Frequency": "4.3 GHz",
      "Cache": "33 MB Intel® Smart Cache",
      "Total L2 Cache": "28 MB",
      "Processor Base Power": "125 W",
      "Maximum Turbo Power": "253 W",
      "Max Memory Size": "192 GB",
      "Memory Types": "Up to DDR5 5600 MT/s, Up to DDR4 3200 MT/s",
      "Processor Graphics": "Intel® UHD Graphics 770"
    }
  },
  {
    id: 'cpu-intel-13600k',
    name: 'Intel Core i5-13600K',
    brand: 'INTEL',
    price: 115000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/6125mFrzr6L._AC_SL1000_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { socket: 'LGA1700', core_count: 14, base_clock: '3.5GHz', wattage: 181 },
    stockStatus: 'In Stock',
    detailedSpecs: {
      "Product Line": "Intel® Core™ i5 Processors (13th Gen)",
      "Code Name": "Raptor Lake",
      "Total Cores": "14",
      "Performance-cores": "6",
      "Efficient-cores": "8",
      "Total Threads": "20",
      "Max Turbo Frequency": "5.1 GHz",
      "Performance-core Max Turbo Frequency": "5.1 GHz",
      "Efficient-core Max Turbo Frequency": "3.9 GHz",
      "Cache": "24 MB Intel® Smart Cache",
      "Total L2 Cache": "20 MB",
      "Processor Base Power": "125 W",
      "Maximum Turbo Power": "181 W",
      "Max Memory Size": "128 GB",
      "Memory Types": "Up to DDR5 5600 MT/s, Up to DDR4 3200 MT/s",
      "Processor Graphics": "Intel® UHD Graphics 770"
    }
  },
  {
    id: 'cpu-intel-12400f',
    name: 'Intel Core i5-12400F',
    brand: 'INTEL',
    price: 55000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/51b+9q2+bWL._AC_SL1000_.jpg',
    inStock: true,
    rating: 4.7,
    condition: 'new',
    specs: { socket: 'LGA1700', core_count: 6, base_clock: '2.5GHz', wattage: 65 }
  },
  // Used Intel
  {
    id: 'cpu-used-12400f',
    name: 'Intel Core i5-12400F (Used)',
    brand: 'INTEL',
    price: 35000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/51b+9q2+bWL._AC_SL1000_.jpg',
    inStock: true,
    rating: 4.5,
    condition: 'used',
    specs: { socket: 'LGA1700', core_count: 6, base_clock: '2.5GHz', wattage: 65, condition_note: 'Tray Unit' }
  },
  {
    id: 'cpu-used-12900k',
    name: 'Intel Core i9-12900K (Used)',
    brand: 'INTEL',
    price: 125000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/61uJ3h59HXL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.6,
    condition: 'used',
    specs: { socket: 'LGA1700', core_count: 16, base_clock: '3.2GHz', wattage: 241, condition_note: 'Includes Box' }
  },

  // ==========================================
  // PROCESSORS (CPUs) - AMD
  // ==========================================
  {
    id: 'cpu-amd-7950x3d',
    name: 'AMD Ryzen 9 7950X3D',
    brand: 'AMD',
    price: 245000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/616VM20+AzL._AC_SL1000_.jpg',
    inStock: true,
    rating: 5.0,
    condition: 'new',
    specs: { socket: 'AM5', core_count: 16, base_clock: '4.2GHz', boost_clock: '5.7GHz', wattage: 120 }
  },
  {
    id: 'cpu-amd-7800x3d',
    name: 'AMD Ryzen 7 7800X3D',
    brand: 'AMD',
    price: 165000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/61jtE36c30L._AC_SL1200_.jpg',
    inStock: true,
    rating: 4.9,
    condition: 'new',
    specs: { socket: 'AM5', core_count: 8, base_clock: '4.2GHz', wattage: 120 },
    stockStatus: 'Out of Stock',
    detailedSpecs: {
      "Product Line": "AMD Ryzen™ 7 7000 Series Desktop Processors",
      "Architecture": "Zen 4",
      "CPU Cores": "8",
      "Threads": "16",
      "Max. Boost Clock": "Up to 5.0GHz",
      "Base Clock": "4.2GHz",
      "L1 Cache": "512KB",
      "L2 Cache": "8MB",
      "L3 Cache": "96MB",
      "Default TDP": "120W",
      "Processor Technology": "TSMC 5nm FinFET",
      "Unlocked for Overclocking": "Yes",
      "CPU Socket": "AM5",
      "Max. Operating Temperature (Tjmax)": "89°C",
      "OS Support": "Windows 11 - 64-Bit, Windows 10 - 64-Bit",
      "PCI Express® Version": "PCIe 5.0"
    }
  },
  {
    id: 'cpu-amd-7600x',
    name: 'AMD Ryzen 5 7600X',
    brand: 'AMD',
    price: 85000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/61jtE36c30L._AC_SL1200_.jpg',
    inStock: true,
    rating: 4.7,
    condition: 'new',
    specs: { socket: 'AM5', core_count: 6, base_clock: '4.7GHz', wattage: 105 }
  },
  {
    id: 'cpu-amd-5600',
    name: 'AMD Ryzen 5 5600',
    brand: 'AMD',
    price: 45000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/51f2hkWjTlL._AC_SL1000_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { socket: 'AM4', core_count: 6, base_clock: '3.5GHz', wattage: 65 },
    stockStatus: 'In Stock',
    detailedSpecs: {
      "Product Line": "AMD Ryzen™ 5 5000 G-Series Desktop Processors with Radeon™ Graphics",
      "Former Codename": "Cezanne",
      "Architecture": "Zen 3",
      "CPU Cores": "6",
      "Threads": "12",
      "Max. Boost Clock": "Up to 4.4GHz",
      "Base Clock": "3.9GHz",
      "L2 Cache": "3MB",
      "L3 Cache": "16MB",
      "Default TDP": "65W",
      "CPU Socket": "AM4",
      "Thermal Solution": "Wraith Stealth",
      "Max. Operating Temperature": "95°C",
      "OS Support": "Windows 11/10 64-Bit Edition, RHEL x86 64-Bit, Ubuntu x86 64-Bit",
      "PCI Express® Version": "PCIe® 3.0",
      "System Memory Type": "DDR4",
      "Memory Channels": "2",
      "System Memory Specification": "Up to 3200MHz",
      "Graphics Model": "Radeon™ Graphics",
      "Graphics Core Count": "7",
      "Graphics Frequency": "1900 MHz"
    }
  },
  // Used AMD
  {
    id: 'cpu-used-ryzen-3600',
    name: 'AMD Ryzen 5 3600 (Used)',
    brand: 'AMD',
    price: 25000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/71Wikj1gG3L._AC_SL1000_.jpg',
    inStock: true,
    rating: 4.6,
    condition: 'used',
    specs: { socket: 'AM4', core_count: 6, base_clock: '3.6GHz', wattage: 65, condition_note: 'Chip Only' },
    stockStatus: 'In Stock',
    detailedSpecs: {
      "Product Line": "AMD Ryzen™ 5 5000 Series Desktop Processors",
      "Architecture": "Zen 3",
      "CPU Cores": "6",
      "Threads": "12",
      "Max. Boost Clock": "Up to 4.6GHz",
      "Base Clock": "3.7GHz",
      "L1 Cache": "384KB",
      "L2 Cache": "3MB",
      "L3 Cache": "32MB",
      "Default TDP": "65W",
      "Processor Technology": "TSMC 7nm FinFET",
      "Unlocked for Overclocking": "Yes",
      "CPU Socket": "AM4",
      "Thermal Solution (PIB)": "Wraith Stealth",
      "Max. Operating Temperature (Tjmax)": "95°C",
      "OS Support": "Windows 11 - 64-Bit Edition, Windows 10 - 64-Bit Edition, RHEL x86 64-Bit, Ubuntu x86 64-Bit",
      "PCI Express® Version": "PCIe 4.0",
      "System Memory Type": "DDR4",
      "System Memory Specification": "Up to 3200MHz"
    },
    features: [
      "Zen 3 Core Architecture",
      "AMD StoreMI Technology",
      "Ryzen Master Utility",
      "VR-Ready Premium"
    ]
  },
  {
    id: 'cpu-used-ryzen-5800x',
    name: 'AMD Ryzen 7 5800X (Used)',
    brand: 'AMD',
    price: 55000,
    category: 'processors',
    image: 'https://m.media-amazon.com/images/I/61DYLoyNRWL._AC_SL1000_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'used',
    specs: { socket: 'AM4', core_count: 8, base_clock: '3.8GHz', wattage: 105, condition_note: 'Original Box Included' },
    stockStatus: 'In Stock',
    detailedSpecs: {
      "Product Line": "AMD Ryzen™ 7 5000 Series Desktop Processors",
      "Architecture": "Zen 3",
      "CPU Cores": "8",
      "Threads": "16",
      "Max. Boost Clock": "Up to 4.7GHz",
      "Base Clock": "3.8GHz",
      "L1 Cache": "512KB",
      "L2 Cache": "4MB",
      "L3 Cache": "32MB",
      "Default TDP": "105W",
      "Processor Technology for CPU Cores": "TSMC 7nm FinFET",
      "Unlocked for Overclocking": "Yes",
      "CPU Socket": "AM4",
      "Thermal Solution (PIB)": "Not included",
      "Max. Operating Temperature (Tjmax)": "90°C",
      "OS Support": "Windows 11 - 64-Bit Edition, Windows 10 - 64-Bit Edition, RHEL x86 64-Bit, Ubuntu x86 64-Bit",
      "PCI Express® Version": "PCIe 4.0",
      "System Memory Type": "DDR4",
      "System Memory Specification": "Up to 3200MHz"
    },
    features: [
      "Zen 3 Core Architecture",
      "AMD StoreMI Technology",
      "Ryzen Master Utility",
      "VR-Ready Premium"
    ]
  },

  // ==========================================
  // MOTHERBOARDS - INTEL
  // ==========================================
  {
    id: 'mobo-asus-z790-hero',
    name: 'ASUS ROG Maximus Z790 Hero',
    brand: 'ASUS',
    price: 285000,
    category: 'motherboards',
    image: 'https://dlcdnwebimgs.asus.com/gain/3b60375a-5047-498c-9c76-857e6006570c/w800',
    inStock: true,
    rating: 4.9,
    condition: 'new',
    specs: { socket: 'LGA1700', memory_type: 'DDR5', form_factor: 'ATX', chipset: 'Z790', memory_slots: 4, storage_slots: 5, wattage: 60 }
  },
  {
    id: 'mobo-msi-z790-p',
    name: 'MSI PRO Z790-P WiFi',
    brand: 'MSI',
    price: 85000,
    category: 'motherboards',
    image: 'https://asset.msi.com/resize/image/global/product/five_pictures/5_mb/PRO-Z790-P-WIFI/PRO-Z790-P-WIFI-board01.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    inStock: true,
    rating: 4.5,
    condition: 'new',
    specs: { socket: 'LGA1700', memory_type: 'DDR5', form_factor: 'ATX', chipset: 'Z790', memory_slots: 4, storage_slots: 4, wattage: 50 }
  },
  {
    id: 'mobo-gigabyte-b760',
    name: 'GIGABYTE B760M DS3H',
    brand: 'GIGABYTE',
    price: 52000,
    category: 'motherboards',
    image: 'https://static.gigabyte.com/StaticFile/Image/Global/e2111812a64426553805367677610419/Product/34064/png/1000',
    inStock: true,
    rating: 4.3,
    condition: 'new',
    specs: { socket: 'LGA1700', memory_type: 'DDR4', form_factor: 'mATX', chipset: 'B760', memory_slots: 4, storage_slots: 2, wattage: 40 }
  },
  // Used Intel Mobos
  {
    id: 'mobo-used-z690',
    name: 'Gigabyte Z690 Gaming X (Used)',
    brand: 'GIGABYTE',
    price: 45000,
    category: 'motherboards',
    image: 'https://static.gigabyte.com/StaticFile/Image/Global/e2111812a64426553805367677610419/Product/29845/png/1000',
    inStock: true,
    rating: 4.6,
    condition: 'used',
    specs: { socket: 'LGA1700', memory_type: 'DDR5', form_factor: 'ATX', chipset: 'Z690', memory_slots: 4, storage_slots: 4, wattage: 60, condition_note: 'Latest BIOS Update' }
  },

  // ==========================================
  // MOTHERBOARDS - AMD
  // ==========================================
  {
    id: 'mobo-gigabyte-x670',
    name: 'GIGABYTE X670E AORUS Master',
    brand: 'GIGABYTE',
    price: 185000,
    category: 'motherboards',
    image: 'https://static.gigabyte.com/StaticFile/Image/Global/e2111812a64426553805367677610419/Product/32688/png/1000',
    inStock: true,
    rating: 4.7,
    condition: 'new',
    specs: { socket: 'AM5', memory_type: 'DDR5', form_factor: 'E-ATX', chipset: 'X670E', memory_slots: 4, storage_slots: 4, wattage: 70 }
  },
  {
    id: 'mobo-msi-b650',
    name: 'MSI MAG B650 Tomahawk WiFi',
    brand: 'MSI',
    price: 78000,
    category: 'motherboards',
    image: 'https://asset.msi.com/resize/image/global/product/five_pictures/10_mb/MAG-B650-TOMAHAWK-WIFI/MAG-B650-TOMAHAWK-WIFI-board01.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { socket: 'AM5', memory_type: 'DDR5', form_factor: 'ATX', chipset: 'B650', memory_slots: 4, storage_slots: 3, wattage: 50 }
  },
  {
    id: 'mobo-asus-prime-b550',
    name: 'ASUS Prime B550M-A WiFi',
    brand: 'ASUS',
    price: 42000,
    category: 'motherboards',
    image: 'https://dlcdnwebimgs.asus.com/gain/9d57a666-4180-40d1-949f-43fb602e1e07/w800',
    inStock: true,
    rating: 4.5,
    condition: 'new',
    specs: { socket: 'AM4', memory_type: 'DDR4', form_factor: 'mATX', chipset: 'B550', memory_slots: 4, storage_slots: 2, wattage: 40 }
  },
  // Used AMD Mobos
  {
    id: 'mobo-used-b450',
    name: 'MSI B450 TOMAHAWK MAX (Used)',
    brand: 'MSI',
    price: 28000,
    category: 'motherboards',
    image: 'https://asset.msi.com/resize/image/global/product/product_7_20190715103713_5d2c161962b10.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    inStock: true,
    rating: 4.8,
    condition: 'used',
    specs: { socket: 'AM4', memory_type: 'DDR4', form_factor: 'ATX', chipset: 'B450', memory_slots: 4, storage_slots: 1, wattage: 45, condition_note: 'No IO Shield' }
  },

  // ==========================================
  // GRAPHICS CARDS (GPUs)
  // ==========================================
  {
    id: 'gpu-rog-4090',
    name: 'ASUS ROG Strix GeForce RTX 4090 OC',
    brand: 'ASUS',
    price: 720000,
    category: 'graphics-cards',
    image: 'https://dlcdnwebimgs.asus.com/gain/9d57a666-4180-40d1-949f-43fb602e1e07/w800',
    inStock: true,
    rating: 5.0,
    condition: 'new',
    specs: { vram: '24GB', chipset: 'RTX 4090', length: 357, wattage: 450 }
  },
  {
    id: 'gpu-aorus-4080',
    name: 'GIGABYTE AORUS RTX 4080 SUPER',
    brand: 'GIGABYTE',
    price: 450000,
    category: 'graphics-cards',
    image: 'https://static.gigabyte.com/StaticFile/Image/Global/e2111812a64426553805367677610419/Product/31427/png/1000',
    inStock: true,
    rating: 4.9,
    condition: 'new',
    specs: { vram: '16GB', chipset: 'RTX 4080 SUPER', length: 342, wattage: 320 }
  },
  {
    id: 'gpu-msi-4070ti',
    name: 'MSI Ventus 3X RTX 4070 Ti',
    brand: 'MSI',
    price: 320000,
    category: 'graphics-cards',
    image: 'https://asset.msi.com/resize/image/global/product/five_pictures/8_vga/GeForce-RTX-4070-Ti-VENTUS-3X-12G-OC/GeForce-RTX-4070-Ti-VENTUS-3X-12G-OC-product1.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    inStock: true,
    rating: 4.6,
    condition: 'new',
    specs: { vram: '12GB', chipset: 'RTX 4070 Ti', length: 308, wattage: 285 }
  },
  {
    id: 'gpu-zotac-4060',
    name: 'Zotac Gaming GeForce RTX 4060',
    brand: 'ZOTAC',
    price: 115000,
    category: 'graphics-cards',
    image: 'https://m.media-amazon.com/images/I/71555-46-xL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.5,
    condition: 'new',
    specs: { vram: '8GB', chipset: 'RTX 4060', length: 222, wattage: 115 }
  },
  {
    id: 'gpu-amd-7900xtx',
    name: 'Sapphire NITRO+ RX 7900 XTX',
    brand: 'SAPPHIRE',
    price: 380000,
    category: 'graphics-cards',
    image: 'https://m.media-amazon.com/images/I/81t-i58+FfL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { vram: '24GB', chipset: 'RX 7900 XTX', length: 320, wattage: 355 }
  },
  // Used GPUs
  {
    id: 'gpu-used-3080',
    name: 'EVGA GeForce RTX 3080 FTW3 (Used)',
    brand: 'EVGA',
    price: 185000,
    category: 'graphics-cards',
    image: 'https://images.evga.com/products/gallery/png/10G-P5-3897-KR_LG_1.png',
    inStock: true,
    rating: 4.8,
    condition: 'used',
    specs: { vram: '10GB', chipset: 'RTX 3080', length: 300, wattage: 320, condition_note: 'Repasted' }
  },
  {
    id: 'gpu-used-3070',
    name: 'MSI Gaming X Trio RTX 3070 (Used)',
    brand: 'MSI',
    price: 115000,
    category: 'graphics-cards',
    image: 'https://asset.msi.com/resize/image/global/product/five_pictures/8_vga/GeForce-RTX-4070-Ti-VENTUS-3X-12G-OC/GeForce-RTX-4070-Ti-VENTUS-3X-12G-OC-product1.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    inStock: true,
    rating: 4.7,
    condition: 'used',
    specs: { vram: '8GB', chipset: 'RTX 3070', length: 323, wattage: 240, condition_note: 'No Coil Whine' }
  },
  {
    id: 'gpu-used-3060',
    name: 'Zotac RTX 3060 Twin Edge (Used)',
    brand: 'ZOTAC',
    price: 65000,
    category: 'graphics-cards',
    image: 'https://m.media-amazon.com/images/I/71555-46-xL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.5,
    condition: 'used',
    specs: { vram: '12GB', chipset: 'RTX 3060', length: 224, wattage: 170, condition_note: 'Mint Condition' }
  },
  {
    id: 'gpu-used-6700xt',
    name: 'Sapphire Pulse RX 6700 XT (Used)',
    brand: 'SAPPHIRE',
    price: 95000,
    category: 'graphics-cards',
    image: 'https://m.media-amazon.com/images/I/71s1jGj6+EL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.7,
    condition: 'used',
    specs: { vram: '12GB', chipset: 'RX 6700 XT', wattage: 230, condition_note: 'Box included' }
  },

  // ==========================================
  // MEMORY (RAM)
  // ==========================================
  // DDR5
  {
    id: 'ram-gskill-ddr5-6000',
    name: 'G.SKILL Trident Z5 RGB 32GB (2x16GB) 6000MHz',
    brand: 'G.SKILL',
    price: 68000,
    category: 'memory',
    image: 'https://www.gskill.com/img/pr/trident-z5-rgb/gallery/Trident-Z5-RGB-Black-01.jpg',
    inStock: true,
    rating: 4.9,
    condition: 'new',
    specs: { memory_type: 'DDR5', capacity: '32GB', speed: '6000MT/s', latency: 'CL30', wattage: 10 },
    stockStatus: 'In Stock',
    detailedSpecs: {
      "Memory Type": "DDR5",
      "Capacity": "32GB (2x16GB)",
      "Speed": "6000 MT/s",
      "Latency": "CL30-38-38-96",
      "Voltage": "1.35V",
      "RGB": "Yes",
      "Heat Spreader": "Aluminum",
      "Warranty": "Limited Lifetime"
    },
    features: [
      "Dynamic RGB Lighting",
      "Custom Performance PCB",
      "Tightly Screened Memory",
      "Aluminum Heat Spreader"
    ]
  },
  {
    id: 'ram-corsair-ddr5-5600',
    name: 'Corsair Vengeance RGB 64GB (2x32GB) 5600MHz',
    brand: 'CORSAIR',
    price: 95000,
    category: 'memory',
    image: 'https://m.media-amazon.com/images/I/61s-dI-g8CL._AC_SL1200_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { memory_type: 'DDR5', capacity: '64GB', speed: '5600MT/s', latency: 'CL36', wattage: 10 }
  },
  {
    id: 'ram-kingston-ddr5-5200',
    name: 'Kingston FURY Beast 16GB (2x8GB) 5200MHz',
    brand: 'KINGSTON',
    price: 32000,
    category: 'memory',
    image: 'https://m.media-amazon.com/images/I/61s-dI-g8CL._AC_SL1200_.jpg',
    inStock: true,
    rating: 4.5,
    condition: 'new',
    specs: { memory_type: 'DDR5', capacity: '16GB', speed: '5200MT/s', latency: 'CL40', wattage: 10 }
  },
  // DDR4
  {
    id: 'ram-corsair-ddr4-3600',
    name: 'Corsair Vengeance RGB PRO 16GB (2x8GB) 3600MHz',
    brand: 'CORSAIR',
    price: 24000,
    category: 'memory',
    image: 'https://m.media-amazon.com/images/I/61s-dI-g8CL._AC_SL1200_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { memory_type: 'DDR4', capacity: '16GB', speed: '3600MT/s', latency: 'CL18', wattage: 8 }
  },
  {
    id: 'ram-gskill-ddr4-3200',
    name: 'G.SKILL Ripjaws V 32GB (2x16GB) 3200MHz',
    brand: 'G.SKILL',
    price: 38000,
    category: 'memory',
    image: 'https://m.media-amazon.com/images/I/71120M24d0L._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.7,
    condition: 'new',
    specs: { memory_type: 'DDR4', capacity: '32GB', speed: '3200MT/s', latency: 'CL16', wattage: 8 }
  },
  // Used RAM
  {
    id: 'ram-used-ddr4',
    name: 'Corsair Vengeance LPX 16GB (Used)',
    brand: 'CORSAIR',
    price: 12000,
    category: 'memory',
    image: 'https://m.media-amazon.com/images/I/51kHiPeTSEL._AC_SL1000_.jpg',
    inStock: true,
    rating: 4.5,
    condition: 'used',
    specs: { memory_type: 'DDR4', capacity: '16GB', speed: '3200MT/s', wattage: 8, condition_note: 'Kit of 2x8GB' }
  },
  {
    id: 'ram-used-gskill-ddr4',
    name: 'G.SKILL Ripjaws V 16GB (Used)',
    brand: 'G.SKILL',
    price: 13500,
    category: 'memory',
    image: 'https://m.media-amazon.com/images/I/71120M24d0L._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.6,
    condition: 'used',
    specs: { memory_type: 'DDR4', capacity: '16GB', speed: '3600MT/s', wattage: 8, condition_note: 'Red Color' }
  },

  // ==========================================
  // STORAGE
  // ==========================================
  {
    id: 'ssd-samsung-990',
    name: 'Samsung 990 PRO 2TB NVMe',
    brand: 'SAMSUNG',
    price: 62000,
    category: 'storage',
    image: 'https://images.samsung.com/is/image/samsung/p6pim/uk/mz-v9p2t0bw/gallery/uk-990-pro-nvme-m2-ssd-mz-v9p2t0bw-533582573?$684_547_PNG$',
    inStock: true,
    rating: 5.0,
    condition: 'new',
    specs: { type: 'NVMe Gen4', capacity: '2TB', read_speed: '7450 MB/s', wattage: 8 }
  },
  {
    id: 'ssd-wd-black',
    name: 'WD_BLACK SN850X 1TB',
    brand: 'WD',
    price: 32000,
    category: 'storage',
    image: 'https://m.media-amazon.com/images/I/61C20a6Zf1L._AC_SL1200_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { type: 'NVMe Gen4', capacity: '1TB', read_speed: '7300 MB/s', wattage: 8 }
  },
  {
    id: 'ssd-kingston-nv2',
    name: 'Kingston NV2 1TB',
    brand: 'KINGSTON',
    price: 21000,
    category: 'storage',
    image: 'https://m.media-amazon.com/images/I/61C20a6Zf1L._AC_SL1200_.jpg',
    inStock: true,
    rating: 4.4,
    condition: 'new',
    specs: { type: 'NVMe Gen4', capacity: '1TB', read_speed: '3500 MB/s', wattage: 6 }
  },
  {
    id: 'hdd-seagate-2tb',
    name: 'Seagate Barracuda 2TB',
    brand: 'SEAGATE',
    price: 18500,
    category: 'storage',
    image: 'https://m.media-amazon.com/images/I/71Czt9dyiBL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.4,
    condition: 'new',
    specs: { type: 'HDD', capacity: '2TB', speed: '7200 RPM', wattage: 10 }
  },
  // Used Storage
  {
    id: 'ssd-used-samsung-970',
    name: 'Samsung 970 EVO 1TB (Used)',
    brand: 'SAMSUNG',
    price: 18000,
    category: 'storage',
    image: 'https://m.media-amazon.com/images/I/814-2J8-5VL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.7,
    condition: 'used',
    specs: { type: 'NVMe Gen3', capacity: '1TB', read_speed: '3500 MB/s', wattage: 8, condition_note: '98% Health' }
  },
  {
    id: 'hdd-used-4tb',
    name: 'WD Blue 4TB (Used)',
    brand: 'WD',
    price: 15000,
    category: 'storage',
    image: 'https://m.media-amazon.com/images/I/71Czt9dyiBL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.5,
    condition: 'used',
    specs: { type: 'HDD', capacity: '4TB', speed: '5400 RPM', wattage: 12, condition_note: 'Plex Server Pull' }
  },

  // ==========================================
  // COOLERS
  // ==========================================
  {
    id: 'cooler-nzxt-360',
    name: 'NZXT Kraken Elite 360 RGB',
    brand: 'NZXT',
    price: 115000,
    category: 'coolers',
    image: 'https://nzxt.com/assets/cms/32847/1680106478-kraken-elite-360-rgb-black-primary-lights-on.png?auto=format&fit=crop&h=1000&w=1000',
    inStock: true,
    rating: 4.7,
    condition: 'new',
    specs: { type: 'AIO Liquid', radiator_size: '360mm', screen: 'LCD Display', wattage: 15, socket_support: ['LGA1700', 'AM5', 'AM4'] }
  },
  {
    id: 'cooler-corsair-240',
    name: 'Corsair iCUE H100i ELITE',
    brand: 'CORSAIR',
    price: 65000,
    category: 'coolers',
    image: 'https://nzxt.com/assets/cms/32847/1680106478-kraken-elite-360-rgb-black-primary-lights-on.png?auto=format&fit=crop&h=1000&w=1000',
    inStock: true,
    rating: 4.6,
    condition: 'new',
    specs: { type: 'AIO Liquid', radiator_size: '240mm', fan_count: 2, wattage: 12, socket_support: ['LGA1700', 'AM5', 'AM4'] }
  },
  {
    id: 'cooler-air-ak620',
    name: 'DeepCool AK620 Digital',
    brand: 'DEEPCOOL',
    price: 28000,
    category: 'coolers',
    image: 'https://m.media-amazon.com/images/I/71l-1s-tZ4L._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { type: 'Air Cooler', height: '162mm', fan_count: 2, wattage: 5, socket_support: ['LGA1700', 'AM5', 'AM4'] }
  },
  {
    id: 'cooler-used-212',
    name: 'Cooler Master Hyper 212 (Used)',
    brand: 'COOLER MASTER',
    price: 6000,
    category: 'coolers',
    image: 'https://m.media-amazon.com/images/I/81aQ7-Q29UL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.2,
    condition: 'used',
    specs: { type: 'Air Cooler', height: '159mm', wattage: 4, condition_note: 'AM4 Bracket only', socket_support: ['AM4'] }
  },

  // ==========================================
  // POWER SUPPLY (PSU)
  // ==========================================
  {
    id: 'psu-corsair-1000',
    name: 'Corsair RM1000e Fully Modular',
    brand: 'CORSAIR',
    price: 65000,
    category: 'power-supply',
    image: 'https://m.media-amazon.com/images/I/71S31eXjJbL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.9,
    condition: 'new',
    specs: { wattage: 1000, efficiency: '80+ Gold', modular: 'Yes' }
  },
  {
    id: 'psu-msi-850',
    name: 'MSI MPG A850G PCIE5',
    brand: 'MSI',
    price: 52000,
    category: 'power-supply',
    image: 'https://asset.msi.com/resize/image/global/product/five_pictures/10_psu/MPG-A850G-PCIE5/MPG-A850G-PCIE5-psu01.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { wattage: 850, efficiency: '80+ Gold', modular: 'Yes', standard: 'ATX 3.0' }
  },
  {
    id: 'psu-silverstone-750',
    name: 'SilverStone DA750 Gold',
    brand: 'SILVERSTONE',
    price: 35000,
    category: 'power-supply',
    image: 'https://m.media-amazon.com/images/I/71qD4C7yGTL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.5,
    condition: 'new',
    specs: { wattage: 750, efficiency: '80+ Gold', modular: 'Yes' }
  },
  {
    id: 'psu-used-evga-750',
    name: 'EVGA SuperNOVA 750 GT (Used)',
    brand: 'EVGA',
    price: 22000,
    category: 'power-supply',
    image: 'https://m.media-amazon.com/images/I/71qD4C7yGTL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.6,
    condition: 'used',
    specs: { wattage: 750, efficiency: '80+ Gold', condition_note: 'All cables included' }
  },

  // ==========================================
  // CASES
  // ==========================================
  {
    id: 'case-lianli-o11',
    name: 'Lian Li O11 Dynamic EVO',
    brand: 'LIAN LI',
    price: 75000,
    category: 'pc-cases',
    image: 'https://lian-li.com/wp-content/uploads/2021/12/evo-black-01.jpg',
    inStock: true,
    rating: 4.9,
    condition: 'new',
    specs: { form_factor: 'ATX', type: 'Mid Tower', panels: 'Tempered Glass', wattage: 0 }
  },
  {
    id: 'case-nzxt-h9',
    name: 'NZXT H9 Flow',
    brand: 'NZXT',
    price: 68000,
    category: 'pc-cases',
    image: 'https://nzxt.com/assets/cms/32847/1673634020-h9-flow-black-main-best.png?auto=format&fit=crop&h=1000&w=1000',
    inStock: true,
    rating: 5.0,
    condition: 'new',
    specs: { form_factor: 'ATX', type: 'Mid Tower', panels: 'Tempered Glass', wattage: 0 }
  },
  {
    id: 'case-corsair-7000d',
    name: 'Corsair 7000D Airflow',
    brand: 'CORSAIR',
    price: 95000,
    category: 'pc-cases',
    image: 'https://m.media-amazon.com/images/I/81+212-000L._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { form_factor: 'ATX', type: 'Dual Chamber', airflow: 'High' }
  },
  {
    id: 'case-hyte-y60',
    name: 'HYTE Y60',
    brand: 'HYTE',
    price: 82000,
    category: 'pc-cases',
    image: 'https://m.media-amazon.com/images/I/71N14298k+L._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.7,
    condition: 'new',
    specs: { form_factor: 'ATX', type: 'Panoramic Glass', feature: 'Vertical GPU Mount' }
  },
  {
    id: 'case-used-h510',
    name: 'NZXT H510 White (Used)',
    brand: 'NZXT',
    price: 18000,
    category: 'pc-cases',
    image: 'https://nzxt.com/assets/cms/32847/1673634020-h9-flow-black-main-best.png?auto=format&fit=crop&h=1000&w=1000',
    inStock: true,
    rating: 4.3,
    condition: 'used',
    specs: { form_factor: 'ATX', type: 'Mid Tower', condition_note: 'Minor scratches on back panel' }
  },

  // ==========================================
  // THERMAL PASTE & EXTRAS
  // ==========================================
  {
    id: 'paste-kryonaut',
    name: 'Thermal Grizzly Kryonaut',
    brand: 'THERMAL GRIZZLY',
    price: 3500,
    category: 'thermal-paste',
    image: 'https://m.media-amazon.com/images/I/61abc5M1LcL._AC_SL1500_.jpg',
    inStock: true,
    rating: 5.0,
    condition: 'new',
    specs: { weight: '1g', conductivity: '12.5 W/mk' }
  },
  {
    id: 'paste-mx6',
    name: 'ARCTIC MX-6',
    brand: 'ARCTIC',
    price: 2800,
    category: 'thermal-paste',
    image: 'https://m.media-amazon.com/images/I/61abc5M1LcL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { weight: '4g', conductivity: '10.5 W/mk' }
  },

  // ==========================================
  // LAPTOPS
  // ==========================================
  // ==========================================
  // LAPTOPS
  // ==========================================
  {
    id: 'laptop-msi-titan',
    name: 'MSI Titan 18 HX',
    brand: 'MSI',
    price: 1850000,
    category: 'laptops',
    badge: 'Best Seller',
    stockStatus: 'In Stock',
    image: 'https://asset.msi.com/resize/image/global/product/five_pictures/1_nb/Titan-18-HX-A14V/Titan-18-HX-A14V-lid-open-rgb-1.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    images: [
      'https://asset.msi.com/resize/image/global/product/five_pictures/1_nb/Titan-18-HX-A14V/Titan-18-HX-A14V-lid-open-rgb-1.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
      'https://asset.msi.com/resize/image/global/product/five_pictures/2_nb/Titan-18-HX-A14V/Titan-18-HX-A14V-keyboard-rgb-1.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
      'https://asset.msi.com/resize/image/global/product/five_pictures/3_nb/Titan-18-HX-A14V/Titan-18-HX-A14V-side-1.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
      'https://asset.msi.com/resize/image/global/product/five_pictures/4_nb/Titan-18-HX-A14V/Titan-18-HX-A14V-back-1.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png'
    ],
    inStock: true,
    rating: 5.0,
    condition: 'new',
    description: "The MSI Titan 18 HX is the pinnacle of gaming performance, designed for those who demand nothing but the absolute best. Powered by the Intel Core i9-14900HX and NVIDIA GeForce RTX 4090, this beast tears through any AAA title with ease. Its stunning 18-inch 4K Mini-LED display offers breathtaking visuals with vibrant colors and deep blacks, while the Cherry MX mechanical keyboard ensures precise actuation for competitive gaming. With a vapor chamber cooling system, it stays cool even under the heaviest loads, making it the ultimate desktop replacement.",
    specs: {
      screenSize: '18"',
      gpuShort: 'RTX 4090',
      ramShort: '128GB DDR5',
      weight: '3.6 kg',
      core_count: 24,
      base_clock: '2.2GHz',
      boost_clock: '5.8GHz',
      vram: '16GB',
      chipset: 'RTX 4090 Laptop',
      capacity: '4TB',
      memory_type: 'DDR5',
      memory_slots: 4,
      screen: '18" 4K Mini-LED 120Hz',
    },
    technicalSpecs: {
      processor: "Intel® Core™ i9-14900HX Processor 24 Cores (8 P-Cores + 16 E-Cores), Max Turbo Frequency 5.8 GHz",
      os: "Windows 11 Pro",
      memory: "128GB (4x32GB) DDR5 5600MHz",
      storage: "4TB (2x2TB) NVMe PCIe Gen4x4 SSD",
      graphics: "NVIDIA® GeForce RTX™ 4090 Laptop GPU 16GB GDDR6",
      display: "18\" UHD+ (3840x2400), 120Hz, Mini LED, HDR 1000, 100% DCI-P3, IPS-Level Panel",
      ports: [
        "2x Thunderbolt™ 4 / USB4® 40Gbps (Support DisplayPort™ / Power Delivery)",
        "3x USB 3.2 Gen 2 Type-A",
        "1x HDMI™ 2.1 (8K @ 60Hz / 4K @ 120Hz)",
        "1x RJ45 Ethernet Port",
        "1x SD Express Card Reader"
      ],
      connectivity: "Intel® Killer™ Wi-Fi 7 BE1750, 2x2 + Bluetooth 5.4",
      audio: "6-Speaker System (2x Tweeter + 4x Woofer) by Dynaudio, Nahimic 3 Audio Enhancer, Hi-Res Audio Ready",
      webcam: "IR FHD Type (30fps@1080p) with HDR",
      battery: "4-Cell, 99.9 Whr Li-Polymer Battery",
      dimensions: "404 x 307.5 x 32.05 mm",
      weight: "3.6 kg",
      warranty: "2 Years Global Warranty (1 Year for Battery/Adapter)"
    }
  },
  {
    id: 'laptop-asus-scar-18',
    name: 'ASUS ROG Strix SCAR 18',
    brand: 'ASUS',
    price: 1450000,
    category: 'laptops',
    badge: 'New Arrival',
    stockStatus: 'In Stock',
    image: 'https://dlcdnwebimgs.asus.com/gain/3b2d26d0-4033-40e8-8e8f-431835904085/w800',
    images: [
      'https://dlcdnwebimgs.asus.com/gain/3b2d26d0-4033-40e8-8e8f-431835904085/w800',
      'https://dlcdnwebimgs.asus.com/gain/816d7a46-814a-4467-a878-508006450686/w800',
      'https://dlcdnwebimgs.asus.com/gain/f919a9a0-2f9b-449a-986c-17e997672236/w800',
      'https://dlcdnwebimgs.asus.com/gain/1c153835-1888-42f3-8086-4447432161a0/w800'
    ],
    inStock: true,
    rating: 4.9,
    condition: 'new',
    description: "Dominate the battlefield with the ROG Strix SCAR 18. Featuring an 18-inch Nebula Display with a blistering 240Hz refresh rate, every movement is fluid and responsive. The combination of the latest Intel Core i9 processor and RTX 4090 graphics card delivers uncompromised performance for gaming and content creation. Its cyberpunk-inspired design with Aura Sync RGB lighting lets you customize your battle station, whilst the advanced intelligent cooling system keeps noise low and performance high.",
    specs: {
      screenSize: '18"',
      gpuShort: 'RTX 4090',
      ramShort: '32GB DDR5',
      weight: '3.1 kg',
      core_count: 24,
      chipset: 'RTX 4090 Laptop',
      capacity: '2TB',
      memory_type: '32GB DDR5',
      screen: '18" QHD+ Nebula 240Hz',
    },
    technicalSpecs: {
      processor: "13th Gen Intel® Core™ i9-13980HX Processor 2.2 GHz (36M Cache, up to 5.6 GHz, 24 cores: 8 P-cores and 16 E-cores)",
      os: "Windows 11 Home",
      memory: "32GB (2x16GB) DDR5-4800 SO-DIMM, Max Capacity: 64GB",
      storage: "2TB (1TB+1TB) PCIe® 4.0 NVMe™ M.2 Performance SSD (RAID 0)",
      graphics: "NVIDIA® GeForce RTX™ 4090 Laptop GPU 16GB GDDR6",
      display: "18-inch QHD+ (2560 x 1600, WQXGA) 16:10, 240Hz, 3ms, IPS-level, DCI-P3: 100%, G-Sync",
      ports: [
        "1x Thunderbolt™ 4 support DisplayPort™ / G-SYNC",
        "1x USB 3.2 Gen 2 Type-C support DisplayPort™ / power delivery / G-SYNC",
        "2x USB 3.2 Gen 2 Type-A",
        "1x HDMI 2.1 FRL",
        "1x 2.5G LAN port",
        "1x 3.5mm Combo Audio Jack"
      ],
      connectivity: "Wi-Fi 6E(802.11ax) (Triple band) 2*2 + Bluetooth® 5.3",
      audio: "4-speaker system with Smart Amplifier Technology, Dolby Atmos",
      webcam: "720P HD camera",
      battery: "90WHrs, 4S1P, 4-cell Li-ion",
      dimensions: "39.9 x 29.4 x 2.31 ~ 3.08 cm",
      weight: "3.10 Kg",
      warranty: "2 Years International Warranty"
    }
  },
  {
    id: 'laptop-razer-blade-16',
    name: 'Razer Blade 16 (2024)',
    brand: 'RAZER',
    price: 1650000,
    category: 'laptops',
    stockStatus: 'Out of Stock',
    image: 'https://assets2.razerzone.com/images/pnx.assets/9079963e670d859d0800b407425187e0/razer-blade-16-2024-og-image.jpg',
    images: [
      'https://assets2.razerzone.com/images/pnx.assets/9079963e670d859d0800b407425187e0/razer-blade-16-2024-og-image.jpg',
      'https://assets2.razerzone.com/images/pnx.assets/01680d230f0653556770df20f011933a/razer-blade-16-2024-gallery-03.jpg',
      'https://assets2.razerzone.com/images/pnx.assets/01680d230f0653556770df20f011933a/razer-blade-16-2024-gallery-06.jpg'
    ],
    inStock: true,
    rating: 4.7,
    condition: 'new',
    description: "The Razer Blade 16 is the perfect balance of power and portability. It features the world's first dual-mode mini-LED display, allowing you to switch between UHD+ 120Hz for creative work and FHD+ 240Hz for gaming. Encased in a precision-milled aluminum unibody, it is surprisingly compact for a 16-inch gaming laptop. Under the hood, the i9-14900HX and RTX 4090 ensure that you can play the latest games at max settings wherever you go.",
    specs: {
      screenSize: '16"',
      gpuShort: 'RTX 4090',
      ramShort: '32GB DDR5',
      weight: '2.45 kg',
      core_count: 24,
      chipset: 'RTX 4090 Laptop',
      capacity: '2TB',
      memory_type: '32GB DDR5',
      screen: '16" OLED 240Hz',
    },
    technicalSpecs: {
      processor: "14th Gen Intel® Core™ i9-14900HX 2.4 GHz, Boost up to 5.8 GHz, 24 Cores / 32 Threads",
      os: "Windows 11 Home",
      memory: "32GB DDR5-5600MHz",
      storage: "2TB SSD (M.2 NVMe PCIe 4.0 x4)",
      graphics: "NVIDIA® GeForce RTX™ 4090 (16GB GDDR6 VRAM)",
      display: "16\" Dual Mode: UHD+ 120Hz & FHD+ 240Hz, Mini-LED, 100% DCI-P3, HDR 1000",
      ports: [
        "1x Thunderbolt™ 4 (USB-C)",
        "1x USB-C 3.2 Gen 2 (Supports 100W Charging)",
        "3x USB-A 3.2 Gen 2",
        "1x HDMI 2.1",
        "1x UHS-II SD Card Reader"
      ],
      connectivity: "Wi-Fi 7 (802.11be) + Bluetooth 5.4",
      audio: "4 Speakers (2 Tweeters, 2 Subwoofers) with THX Spatial Audio",
      webcam: "FHD 1080p IR Camera with Windows Hello",
      battery: "95.2 Whr Rechargeable Li-ion Polymer",
      dimensions: "21.99 x 244 x 355 mm",
      weight: "2.45 kg",
      warranty: "1 Year Limited Warranty"
    }
  },
  {
    id: 'laptop-lenovo-legion-9i',
    name: 'Lenovo Legion 9i Gen 9',
    brand: 'LENOVO',
    price: 1550000,
    category: 'laptops',
    image: 'https://p4-ofp.static.pub//fes/cms/2023/08/25/7u5l5q7x4x4x4x4x4x4x4x4x4x4x4x000000.png',
    images: [
      'https://p4-ofp.static.pub//fes/cms/2023/08/25/7u5l5q7x4x4x4x4x4x4x4x4x4x4x4x000000.png',
      'https://p4-ofp.static.pub//fes/cms/2023/08/25/1u5l5q7x4x4x4x4x4x4x4x4x4x4x4x000000.png',
      'https://p4-ofp.static.pub//fes/cms/2023/08/25/2u5l5q7x4x4x4x4x4x4x4x4x4x4x4x000000.png'
    ],
    inStock: true,
    rating: 4.8,
    condition: 'new',
    description: "The Lenovo Legion 9i is the world's first AI-tuned gaming laptop with an integrated liquid cooling system. This revolutionary engineering marvel keeps the 14th Gen Intel Core i9 and RTX 4090 running at peak efficiency alongside a forged carbon top cover that makes every unit unique. The 3.2K Mini-LED display provides stunning color accuracy and brightness, making it ideal for both gaming and professional creative work.",
    specs: {
      screenSize: '16"',
      gpuShort: 'RTX 4090',
      ramShort: '64GB DDR5',
      weight: '2.56 kg',
      core_count: 24,
      chipset: 'RTX 4090 Laptop',
      capacity: '2TB',
      memory_type: '64GB DDR5',
      screen: '16" 3.2K Mini-LED 165Hz',
      feature: 'Liquid Cooling'
    },
    technicalSpecs: {
      processor: "13th Generation Intel® Core™ i9-13980HX Processor (E-cores up to 4.00 GHz P-cores up to 5.60 GHz)",
      os: "Windows 11 Pro 64",
      memory: "64 GB DDR5-5600MHz (2 x 32 GB)",
      storage: "2 TB SSD M.2 2280 PCIe Gen4 Performance TLC",
      graphics: "NVIDIA® GeForce RTX™ 4090 Laptop GPU 16GB GDDR6",
      display: "16\" 3.2K (3200 x 2000), Mini-LED, Anti-Glare, Non-Touch, HDR 1000, 100% Adobe RGB & DCI-P3, 165Hz",
      ports: [
        "2x Thunderbolt™ 4 (USB-C)",
        "1x USB-C 3.2 Gen 1",
        "2x USB-A 3.2 Gen 1",
        "1x HDMI 2.1",
        "1x RJ45",
        "1x SD Card Reader 3.0"
      ],
      connectivity: "Wi-Fi 7 2x2 BE & Bluetooth® 5.1 or above",
      audio: "2 x 2W Harman® Super Linear Speaker System, Smart Amplifier, Nahimic Audio",
      webcam: "1080P FHD with E-Shutter",
      battery: "4 Cell Li-Polymer 99.9Wh",
      dimensions: "357.7 x 277.7 x 18.9-22.7 mm",
      weight: "2.56 kg",
      warranty: "1 Year Legion Ultimate Support"
    }
  },
  {
    id: 'laptop-msi-raider-ge78',
    name: 'MSI Raider GE78 HX',
    brand: 'MSI',
    price: 980000,
    category: 'laptops',
    image: 'https://asset.msi.com/resize/image/global/product/five_pictures/1_nb/Raider-GE78-HX-13V/Raider-GE78-HX-13V-lid-open-rgb-1.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
    images: [
      'https://asset.msi.com/resize/image/global/product/five_pictures/1_nb/Raider-GE78-HX-13V/Raider-GE78-HX-13V-lid-open-rgb-1.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png',
      'https://asset.msi.com/resize/image/global/product/five_pictures/2_nb/Raider-GE78-HX-13V/Raider-GE78-HX-13V-keyboard-rgb-1.png62405b38c58fe0f07fcef2367d8a9ba1/1024.png'
    ],
    inStock: true,
    rating: 4.7,
    condition: 'new',
    description: "The MSI Raider GE78 HX sits at the sweet spot of high-end performance. With the RTX 4080 and i9 processor, it delivers incredible frame rates in modern games. The Matrix Light Bar adds a distinct cyberpunk flair to the chassis. Its 17-inch QHD+ 240Hz display finds the perfect balance between resolution and refresh rate, ensuring you never miss a frame in fast-paced action games.",
    specs: {
      screenSize: '17"',
      gpuShort: 'RTX 4080',
      ramShort: '32GB DDR5',
      weight: '3.1 kg',
      core_count: 24,
      chipset: 'RTX 4080 Laptop',
      capacity: '2TB',
      memory_type: '32GB DDR5',
      screen: '17" QHD+ 240Hz',
    },
    technicalSpecs: {
      processor: "Intel® Core™ i9-13980HX Processor 24 Cores (8 P-Cores + 16 E-Cores), Max Turbo Frequency 5.6 GHz",
      os: "Windows 11 Home",
      memory: "32GB (2x16GB) DDR5 5600MHz",
      storage: "2TB NVMe PCIe Gen4x4 SSD",
      graphics: "NVIDIA® GeForce RTX™ 4080 Laptop GPU 12GB GDDR6",
      display: "17\" QHD+ (2560x1600), 240Hz, IPS-Level, 100% DCI-P3",
      ports: [
        "1x Thunderbolt™ 4 / USB4® 40Gbps",
        "1x USB 3.2 Gen 2 Type-C (DisplayPort™ / Power Delivery)",
        "2x USB 3.2 Gen 2 Type-A",
        "1x HDMI™ 2.1",
        "1x SD Express Card Reader"
      ],
      connectivity: "Intel® Killer™ Wi-Fi 6E AX1675, Bluetooth v5.3",
      audio: "6-Speaker System (2x Tweeter + 4x Woofer) by Dynaudio",
      webcam: "IR FHD Type (30fps@1080p) with Privacy Shutter",
      battery: "4-Cell, 99.9 Whr Li-Polymer Battery",
      dimensions: "380.34 x 297.97 x 22.85 ~ 28.75 mm",
      weight: "3.1 kg",
      warranty: "2 Years Global Warranty"
    }
  },
  {
    id: 'laptop-asus-zephyrus-g14',
    name: 'ASUS ROG Zephyrus G14 (2024)',
    brand: 'ASUS',
    price: 750000,
    category: 'laptops',
    image: 'https://dlcdnwebimgs.asus.com/gain/49491740-4284-4848-9442-832448208447/w800',
    images: [
      'https://dlcdnwebimgs.asus.com/gain/49491740-4284-4848-9442-832448208447/w800',
      'https://dlcdnwebimgs.asus.com/gain/52482386-829d-4786-8152-474026604882/w800',
      'https://dlcdnwebimgs.asus.com/gain/23473111-0428-4447-8141-865664440552/w800'
    ],
    inStock: true,
    rating: 4.9,
    condition: 'new',
    description: "Light, powerful, and beautiful. The ROG Zephyrus G14 2024 is the ultimate 14-inch gaming laptop. Now featuring an OLED display for perfect blacks and infinite contrast, it brings games to life like never before. The precision-machined aluminum chassis is sleek and durable, housing an RTX 4070 that punches well above its weight class. It's the perfect companion for gamers on the move.",
    specs: {
      screenSize: '14"',
      gpuShort: 'RTX 4070',
      ramShort: '32GB LPDDR5X',
      weight: '1.5 kg',
      core_count: 8,
      chipset: 'RTX 4070 Laptop',
      capacity: '1TB',
      memory_type: '32GB LPDDR5X',
      screen: '14" OLED 120Hz',
    },
    technicalSpecs: {
      processor: "AMD Ryzen™ 9 8945HS Processor 4GHz (24MB Cache, up to 5.2 GHz, 8 cores, 16 Threads)",
      os: "Windows 11 Home",
      memory: "32GB LPDDR5X on board",
      storage: "1TB PCIe® 4.0 NVMe™ M.2 SSD",
      graphics: "NVIDIA® GeForce RTX™ 4070 Laptop GPU 8GB GDDR6",
      display: "14-inch OLED 3K (2880 x 1800) 16:10, 120Hz, 0.2ms, 100% DCI-P3, G-SYNC / Adaptive-Sync",
      ports: [
        "1x Thunderbolt™ 4 (USB-C)",
        "1x USB 3.2 Gen 2 Type-C",
        "2x USB 3.2 Gen 2 Type-A",
        "1x HDMI 2.1 FRL",
        "1x MicroSD Card Reader"
      ],
      connectivity: "Wi-Fi 6E(802.11ax) (Triple band) 2*2 + Bluetooth® 5.3",
      audio: "4-speaker (dual force woofer) system with Smart Amplifier Technology",
      webcam: "1080P FHD IR Camera for Windows Hello",
      battery: "73WHrs, 4S1P, 4-cell Li-ion",
      dimensions: "31.1 x 22.0 x 1.59 ~ 1.63 cm",
      weight: "1.50 Kg",
      warranty: "2 Years International Warranty"
    }
  },

  // ==========================================
  // CASE FANS
  // ==========================================
  {
    id: 'fan-lianli-uni-sl120',
    name: 'Lian Li UNI FAN SL120 RGB (Black)',
    brand: 'Lian Li',
    price: 10500,
    category: 'case-fans',
    image: 'https://m.media-amazon.com/images/I/61SimpleI0L._AC_SL1000_.jpg',
    inStock: true,
    rating: 4.9,
    condition: 'new',
    specs: { fan_count: 1, height: '120mm', type: 'RGB', airflow: '58.54 CFM' }
  },
  {
    id: 'fan-corsair-ll120',
    name: 'Corsair LL120 RGB 120mm',
    brand: 'CORSAIR',
    price: 12000,
    category: 'case-fans',
    image: 'https://m.media-amazon.com/images/I/81b2Xqg8cML._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.8,
    condition: 'new',
    specs: { fan_count: 1, height: '120mm', type: 'RGB', airflow: '43.25 CFM' }
  },
  {
    id: 'fan-noctua-nf-a12',
    name: 'Noctua NF-A12x25 PWM',
    brand: 'Noctua',
    price: 14500,
    category: 'case-fans',
    image: 'https://m.media-amazon.com/images/I/811q5X7h6wL._AC_SL1500_.jpg',
    inStock: true,
    rating: 5.0,
    condition: 'new',
    specs: { fan_count: 1, height: '120mm', type: 'Non-RGB', airflow: '60.1 CFM' }
  },
  {
    id: 'fan-arctic-p12',
    name: 'ARCTIC P12 PWM PST (Black)',
    brand: 'ARCTIC',
    price: 3500,
    category: 'case-fans',
    image: 'https://m.media-amazon.com/images/I/51A0jU-x7EL._AC_SL1000_.jpg',
    inStock: true,
    rating: 4.7,
    condition: 'new',
    specs: { fan_count: 1, height: '120mm', type: 'Non-RGB', airflow: '56.3 CFM' }
  },
  {
    id: 'fan-nzxt-f140',
    name: 'NZXT F140 RGB 140mm',
    brand: 'NZXT',
    price: 9800,
    category: 'case-fans',
    image: 'https://m.media-amazon.com/images/I/61r5fL2+GLL._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.6,
    condition: 'new',
    specs: { fan_count: 1, height: '140mm', type: 'RGB', airflow: '89.48 CFM' }
  },
  {
    id: 'fan-cooler-master-halo',
    name: 'Cooler Master MasterFan MF120 Halo',
    brand: 'Cooler Master',
    price: 6500,
    category: 'case-fans',
    image: 'https://m.media-amazon.com/images/I/71F8x64Lp6L._AC_SL1500_.jpg',
    inStock: true,
    rating: 4.5,
    condition: 'new',
    specs: { fan_count: 1, height: '120mm', type: 'RGB', airflow: '47.2 CFM' }
  }
];

// --- ACCESSORIES ---

export interface Accessory {
  id: string;
  name: string;
  category: 'Monitor' | 'Keyboard' | 'Mouse' | 'Headset' | 'Mousepad';
  brand: string;
  price: number;
  image: string;
  specs: string[];
}

export const ACCESSORIES: Accessory[] = [
  // Monitors
  {
    id: 'acc-monitor-lg-27',
    name: 'LG UltraGear 27GN950-B',
    category: 'Monitor',
    brand: 'LG',
    price: 245000,
    image: 'https://m.media-amazon.com/images/I/81I-5JbENJL._AC_SL1500_.jpg',
    specs: ['4K UHD', '144Hz', '1ms IPS', 'G-SYNC']
  },
  {
    id: 'acc-monitor-asus-rog',
    name: 'ASUS ROG Swift 360Hz',
    category: 'Monitor',
    brand: 'ASUS',
    price: 320000,
    image: 'https://dlcdnwebimgs.asus.com/gain/06d64024-813b-4876-857e-7c5478479344/w800',
    specs: ['1080p', '360Hz', 'G-SYNC', 'HDR10']
  },
  // Keyboards
  {
    id: 'acc-kb-logitech-g915',
    name: 'Logitech G915 TKL Wireless',
    category: 'Keyboard',
    brand: 'LOGITECH',
    price: 68000,
    image: 'https://resource.logitechg.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g915-tkl/g915-tkl-hero-carbon-lg.png?v=1',
    specs: ['Wireless', 'Mechanical', 'RGB', 'Low Profile']
  },
  {
    id: 'acc-kb-razer-huntsman',
    name: 'Razer Huntsman V3 Pro',
    category: 'Keyboard',
    brand: 'RAZER',
    price: 85000,
    image: 'https://assets2.razerzone.com/images/pnx.assets/6767575764f6b646c265636367356262/razer-huntsman-v3-pro-tenkeyless-500x500.png',
    specs: ['Analog Optical', 'Rapid Trigger', 'PBT Keycaps']
  },
  // Mice
  {
    id: 'acc-mouse-logitech-superlight',
    name: 'Logitech G Pro X Superlight 2',
    category: 'Mouse',
    brand: 'LOGITECH',
    price: 48000,
    image: 'https://resource.logitech.com/w_692,c_limit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2/pro-x-superlight-2-black-gallery-1.png?v=1',
    specs: ['Wireless', '60g Weight', 'Hero 2 Sensor']
  },
  {
    id: 'acc-mouse-razer-viper',
    name: 'Razer Viper V3 Pro',
    category: 'Mouse',
    brand: 'RAZER',
    price: 52000,
    image: 'https://assets2.razerzone.com/images/pnx.assets/94178356778f7e7776b6b77742617a65/razer-viper-v3-pro-black-500x500.png',
    specs: ['Wireless', 'Focus Pro', '8000Hz']
  },
  // Headsets
  {
    id: 'acc-headset-hyperx-cloud',
    name: 'HyperX Cloud III Wireless',
    category: 'Headset',
    brand: 'HYPERX',
    price: 45000,
    image: 'https://m.media-amazon.com/images/I/71r-iO8p+XL._AC_SL1500_.jpg',
    specs: ['DTS Spatial', '120hr Battery', 'Detachable Mic']
  },
  {
    id: 'acc-headset-steelseries-arctis',
    name: 'SteelSeries Arctis Nova Pro',
    category: 'Headset',
    brand: 'STEELSERIES',
    price: 110000,
    image: 'https://media.steelseriescdn.com/thumbs/catalogue/products/01056-arctis-nova-pro-wireless-pc-playstation/2ff2d4b85c7d4af8a1a9e6b36e8e8b6a.png.500x400_q85_crop-fit_optimize.png',
    specs: ['ANC', 'Dual Wireless', 'Hi-Res Audio']
  },
  // Mousepad
  {
    id: 'acc-mousepad-steelseries-qck',
    name: 'SteelSeries QcK Prism XL',
    category: 'Mousepad',
    brand: 'STEELSERIES',
    price: 18000,
    image: 'https://media.steelseriescdn.com/thumbs/catalogue/products/01056-arctis-nova-pro-wireless-pc-playstation/2ff2d4b85c7d4af8a1a9e6b36e8e8b6a.png.500x400_q85_crop-fit_optimize.png',
    specs: ['RGB', 'Cloth', 'Extra Large']
  }
];

// --- PREBUILT PCs ---

export const PREBUILTS: PrebuiltPC[] = [
  {
    id: 'prebuilt-budget-king',
    name: 'Budget King',
    price: 125000,
    image: 'https://nzxt.com/assets/cms/32847/1673634020-h9-flow-black-main-best.png?auto=format&fit=crop&h=1000&w=1000',
    specs: [
      "Intel Core i3-12100F",
      "GTX 1650 4GB",
      "16GB DDR4 RAM",
      "512GB NVMe SSD"
    ]
  },
  {
    id: 'prebuilt-mid-range-beast',
    name: 'Mid-Range Beast',
    price: 285000,
    image: 'https://lian-li.com/wp-content/uploads/2021/12/evo-black-01.jpg',
    specs: [
      "Intel Core i5-13400F",
      "RTX 4060 8GB",
      "16GB RGB DDR5 RAM",
      "1TB NVMe Gen4 SSD"
    ]
  },
  {
    id: 'prebuilt-ultra-4k-monster',
    name: 'Ultra 4K Monster',
    price: 950000,
    image: 'https://nzxt.com/assets/cms/32847/1680106478-kraken-elite-360-rgb-black-primary-lights-on.png?auto=format&fit=crop&h=1000&w=1000',
    specs: [
      "Intel Core i9-13900K",
      "RTX 4090 24GB",
      "64GB RGB DDR5 RAM",
      "2TB Samsung 990 PRO"
    ]
  },


];
