import { getFirebase } from "./getFirebase";
import { getMock } from "./getMock";
import { getLocal } from "./getLocal";
import { Travel } from "@/types/travel";
import { User } from "@/types/user";

export const getTrips = async (
  source: "local" | "firebase" | "mock",
  user: User | null
): Promise<Travel[]> => {
  switch (source) {
    case "firebase":
      return await getFirebase(user);
    case "mock":
      return await getMock();
    case "local":
    default:
      return getLocal();
  }
};
