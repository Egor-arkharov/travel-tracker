// types/travel.ts

export interface Travel {
  id?: string;
  country: string;
  city: string;
  startDate: string;
  endDate: string;
  budget: number;
  rating: number;
  imagePath: string;
  imageUrl?: string;
}
