# 🌍 Travel Tracker

A modern web app for recording and exploring your travels.  
Add trips with city, dates, rating, budget, and photo — view them in a dynamic animated grid, open detailed modals, edit or delete any trip, and keep data synced through Firebase or local storage.

Built with **Next.js (App Router)**, **React 18**, **TypeScript**, **Redux Toolkit**, **Firebase**, **SCSS Modules**, **Framer Motion**, and **Google Maps & Places API**.

> A portfolio project built like a real product — combining solid architecture, smooth motion, and thoughtful UX.

---

## ✨ Highlights

- **Dynamic card grid:** custom grouping logic keeps the layout balanced at any number of items  
- **Framer Motion animations:** card-to-modal morph, staged text/overlay transitions, and smooth UI feedback  
- **Full travel form:** Google Place Autocomplete, date ranges, rating stars, budget slider, image upload, manual validation & reset  
- **Unified data flow:** one Redux slice for demo, local, and Firebase storage sources  
- **Clean design system:** SCSS tokens, clamp-based typography, and container queries  
- **Firebase sync:** Google Auth login with realtime database for saving personal trips  
- **Tested architecture:** Jest + Testing Library ensure stable logic and UI behavior  

---

## 🧱 Tech Stack

- **Framework:** Next.js 15 (App Router), React 18  
- **Language:** TypeScript 5  
- **State:** Redux Toolkit  
- **Backend:** Firebase (Realtime DB + Google Auth)  
- **UI:** SCSS Modules (tokens, mixins, clamp typography)
- **Testing:** Jest + Testing Library (unit, snapshot, interaction)   
- **Motion:** Framer Motion  
- **Maps:** Google Maps & Places API  
- **Utilities:** Swiper, Tippy.js, Datepicker  
- **Hosting:** Vercel 

---

## 🛠 Infrastructure & Deployment

- **Firebase rules** are versioned in `/firebase` and deployed via local CLI (`firebase-tools`).  
- Realtime DB and Storage rules enforce per-user access; Firestore is read-only for mock data.  
- Quick deployment of all rules:  
  ```bash
  npm run fb:deploy:rules
  ```  
- Non-secret environment variables stored in `.env.local` (see below).  

---

## 🚀 Run locally

```bash
npm install
npm run dev
```

Create a `.env.local` file in the root of the project (do **not** commit it).  
Use `.env.example` as a template and fill in your real keys.

```bash
NEXT_PUBLIC_GOOGLE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_DATABASE_URL=
```

---

<div align="center">

### 👤 Author

Designed, developed & animated by **Egor Arkharov**  

[🎨 View case study → /about](https://ea-travel-tracker.vercel.app/about)  
[🧑‍💻 About the author → /author](https://ea-travel-tracker.vercel.app/author)

</div>

---

> **Travel Tracker** — a modern travel diary with adaptive animated grid, full-featured creation form, and Firebase integration built entirely from scratch.  
> Built as a **production-level showcase project** for portfolio and interviews.
