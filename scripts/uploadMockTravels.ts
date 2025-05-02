import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

// Путь к serviceAccountKey
const serviceAccountPath = path.resolve(__dirname, "../serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Путь к моковому JSON
const travelsPath = path.resolve(__dirname, "./travels.json");
const travels = JSON.parse(fs.readFileSync(travelsPath, "utf8"));

// Инициализация Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const uploadMockTravels = async () => {
  for (const travel of travels) {
    try {
      await db.collection("travels").add(travel);
      console.log(`✅ Uploaded: ${travel.location.city}, ${travel.location.country}`);
    } catch (error) {
      console.error(`❌ Error uploading ${travel.location.city}:`, error);
    }
  }
};

uploadMockTravels();
