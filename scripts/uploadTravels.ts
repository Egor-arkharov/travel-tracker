// scripts/uploadTravels.ts
import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

// Загружаем ключ
const serviceAccountPath = path.join(__dirname, "../serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Загружаем travels.json
const travelsPath = path.join(__dirname, "./travels.json");
const travels = JSON.parse(fs.readFileSync(travelsPath, "utf8"));

// Инициализация Firebase Admin SDK
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const uploadTravels = async () => {
  for (const travel of travels) {
    try {
      await db.collection("travels").add(travel);
      console.log(`✅ Uploaded: ${travel.city}, ${travel.country}`);
    } catch (error) {
      console.error(`❌ Error uploading ${travel.city}:`, error);
    }
  }
};

uploadTravels();
