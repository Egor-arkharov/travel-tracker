import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import fs from "fs";
import path from "path";

// Загружаем ключ
const serviceAccountPath = path.join(__dirname, "../serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// Инициализация
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

const clearMockTravels = async () => {
  const snapshot = await db.collection("travels").where("isMock", "==", true).get();

  if (snapshot.empty) {
    console.log("🔍 No mock travels found.");
    return;
  }

  console.log(`🗑 Deleting ${snapshot.size} mock travel(s)...`);

  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  console.log("✅ Mock travels successfully deleted.");
};

clearMockTravels();
