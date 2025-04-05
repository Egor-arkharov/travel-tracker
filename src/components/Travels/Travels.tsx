import { db } from "@/app/firebase";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Travel } from "@/types/travel";
import TravelCard from "@/components/TravelCard/TravelCard";
import styles from "./Travels.module.scss";

const Travels = async () => {
  const querySnapshot = await getDocs(collection(db, "travels"));
  const storage = getStorage();

  const travelsData: Travel[] = await Promise.all(
    querySnapshot.docs.map(async (doc) => {
      const data = doc.data() as Travel;
      data.id = doc.id;

      try {
        const imageRef = ref(storage, data.imagePath);
        const url = await getDownloadURL(imageRef);
        return { ...data, imageUrl: url };
      } catch (error) {
        console.error("Ошибка загрузки изображения для ${data.city}:", error);
        return { ...data, imageUrl: "" };
      }
    })
  );

  console.log(travelsData);

  return (
    <section className={styles.section}>
      <h2>Travel examples</h2>
      
      <ul className={styles.grid}>
        {travelsData.map((travel) => {
          const cityClass = travel.city.toLowerCase().replace(/\s+/g, "-");

          return (
            <li key={travel.id} className={styles[cityClass]}>
              <TravelCard travel={travel} />
            </li>
          );
        })}
      </ul>
    </section>

  );
};

export default Travels;
