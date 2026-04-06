// Banner content management service
export interface BannerContent {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

import defaultBannerImage from "figma:asset/a91bbc52876d9799b43bdc0551929d8ac5e2e719.png";

// Default banner content
const DEFAULT_BANNER: BannerContent = {
  id: "default-1",
  title: "Welcome to Rinjani",
  description: "Your Integrated Talent Management System",
  imageUrl: defaultBannerImage,
  isActive: true,
  order: 1,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

// In-memory storage for banner content (in production, this would be in a database)
let bannerContents: BannerContent[] = [DEFAULT_BANNER];

export const BannerContentService = {
  // Get all banner contents
  getAll: (): BannerContent[] => {
    return [...bannerContents].sort((a, b) => a.order - b.order);
  },

  // Get active banner contents
  getActive: (): BannerContent[] => {
    return bannerContents
      .filter(content => content.isActive)
      .sort((a, b) => a.order - b.order);
  },

  // Get banner by ID
  getById: (id: string): BannerContent | undefined => {
    return bannerContents.find(content => content.id === id);
  },

  // Create new banner content
  create: (content: Omit<BannerContent, "id" | "createdAt" | "updatedAt">): BannerContent => {
    const newContent: BannerContent = {
      ...content,
      id: `banner-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    bannerContents.push(newContent);
    return newContent;
  },

  // Update banner content
  update: (id: string, updates: Partial<Omit<BannerContent, "id" | "createdAt">>): BannerContent | null => {
    const index = bannerContents.findIndex(content => content.id === id);
    if (index === -1) return null;

    bannerContents[index] = {
      ...bannerContents[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return bannerContents[index];
  },

  // Delete banner content
  delete: (id: string): boolean => {
    const index = bannerContents.findIndex(content => content.id === id);
    if (index === -1) return false;

    bannerContents.splice(index, 1);
    return true;
  },

  // Reorder banner contents
  reorder: (orderedIds: string[]): void => {
    orderedIds.forEach((id, index) => {
      const content = bannerContents.find(c => c.id === id);
      if (content) {
        content.order = index + 1;
        content.updatedAt = new Date().toISOString();
      }
    });
  },

  // Toggle active status
  toggleActive: (id: string): BannerContent | null => {
    const content = bannerContents.find(c => c.id === id);
    if (!content) return null;

    content.isActive = !content.isActive;
    content.updatedAt = new Date().toISOString();
    return content;
  },
};
