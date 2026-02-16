import { SITE_SETTINGS } from "@/lib/mockData";

const LATENCY = 300; // Simulated network delay

export const settingsService = {
  // GET: Fetch the current Hero Video URL
  getHeroVideoUrl: async (): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(SITE_SETTINGS.heroVideoUrl);
      }, LATENCY);
    });
  },

  // PUT: Update the Hero Video URL (For Admin Panel usage later)
  updateHeroVideoUrl: async (newUrl: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        SITE_SETTINGS.heroVideoUrl = newUrl;
        resolve(true);
      }, LATENCY);
    });
  },
  
  // GET: Fetch all settings
  getAllSettings: async () => {
      return new Promise((resolve) => {
          setTimeout(() => resolve(SITE_SETTINGS), LATENCY);
      })
  }
};