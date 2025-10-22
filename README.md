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

---

## 🧱 Tech Stack

- **Framework:** Next.js 15 (App Router), React 18  
- **Language:** TypeScript 5  
- **State:** Redux Toolkit  
- **Backend:** Firebase (Realtime DB + Google Auth)  
- **UI:** SCSS Modules (tokens, mixins, clamp typography)  
- **Motion:** Framer Motion  
- **Maps:** Google Maps & Places API  
- **Utilities:** Swiper, Tippy.js, Datepicker  
- **Hosting:** Firebase Hosting  

---

## 🚀 Run locally

```bash
npm install
npm run dev
```

Environment variables (create `.env.local`):

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=xxxx
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=xxxx.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://xxxx.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=xxxx
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=xxxx
```

---

<div align="center">

### 👤 Author

Designed, developed & animated by **Egor Arkharov**  

[🎨 View case study → /about](https://travel-tracker-demo.vercel.app/about)  
[🧑‍💻 About the author → /author](https://travel-tracker-demo.vercel.app/author)

</div>

---

> **Travel Tracker** — a modern travel diary with adaptive animated grid, full-featured creation form, and Firebase integration built entirely from scratch.