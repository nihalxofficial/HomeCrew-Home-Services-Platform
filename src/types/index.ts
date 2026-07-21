export interface Service {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  priceUnit: "fixed" | "hourly";
  duration: string;
  imageUrl: string;
  whatsIncluded: string[];
  tags: string[];
  isFeatured: boolean;
  availableCities: string[];
  creatorId?: string;
  totalBookings?: number;
  avgRating?: number;
  totalReviews?: number;
  createdAt?: string;
  updatedAt?: string;
}


export interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
  plan: string;
  status: string;
}