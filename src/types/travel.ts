// types/travel.ts

export interface Travel {
  id?: string;
  country: string;
  city: string;
  lat?: number;
  lng?: number;
  startDate: string;
  endDate: string;
  budget: number;
  rating: number;
  imagePath: string;
  imageUrl?: string;
  isMock: boolean;
  description?: string;
}