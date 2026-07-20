export interface Service {
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
  creatorId: string;
}


export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: string;
  plan: string;
  status: string;
}