import { FirestoreTravel, Travel } from "@/types/travel";

import rawMockData from "../../../../scripts/travels.json";

export const getMock = async (): Promise<Travel[]> => {
  const trips = rawMockData.map((trip, index) => {
    const t = trip as unknown as FirestoreTravel;
    
    return {
      ...t,
      id: `mock-trip-${index}`,
      media: { 
        ...t.media,
        imageUrl: t.media.imagePath 
      },
    };
  });

  return trips as Travel[];
};
