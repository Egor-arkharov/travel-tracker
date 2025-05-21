export interface Travel {
  id?: string;

  location: {
    city: string;
    country: string;
    lat?: number;
    lng?: number;
  };

  dates: {
    start: string;
    end: string;
  };

  budget: number;
  rating: number;

  media: {
    imagePath: string;
    imageUrl?: string;
    previewUrl?: string;
  };

  description?: string;

  meta: {
    isMock: boolean;
  };
}

export interface FirestoreTravel extends Omit<Travel, "id"> {
  uid: string;
  createdAt: number;
}

export interface TravelFormState extends Omit<Travel, "id"> {
  id?: string;
  media: Travel["media"] & {
    imageFile: File | null;
  };
}
