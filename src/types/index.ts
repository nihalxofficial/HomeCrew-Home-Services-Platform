export interface Service {
  _id: string;
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
  avgRating: number;
  totalReviews: number;
  totalBookings: number;
  isFeatured: boolean;
  availableCities: string[];
  createdAt: string;
}