# 🌍 Travel Tracker

**A polished, offline-first travel diary.**  
Add trips, explore them in an adaptive grid, open a fluid card-to-modal view, edit details, and sync everything to the cloud.

Built with **Next.js (App Router)**, **React 18**, **TypeScript**, **Redux Toolkit**, **Firebase**, **SCSS Modules**, **Framer Motion**, and **Google Maps & Places API**.

> A portfolio project built like a real product — with clean architecture, custom motion, and seamless data flow between demo, local, and cloud modes.

---

## ✨ Highlights

- **Offline-first design** — demo, local (no login), and cloud (Firebase) modes  
- **Unified data flow** — one Redux layer for all storage sources  
- **Adaptive grid** — container queries + custom grouping keep layouts balanced  
- **Card → Modal morph** — App Store–like Framer Motion transition  
- **Custom form system** — Google Places, dates, rating, budget, image upload, manual validation  
- **Clean UI system** — SCSS tokens, clamp typography, container queries

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
- **Hosting:** Firebase Hosting / Vercel

---

## 🧩 Features

- Responsive animated grid with container queries  
- Framer Motion morph transitions between cards and modals  
- Full-featured form with Google Places Autocomplete  
- Manual validation and reset via Refs  
- Demo Tooltip for guest mode  
- Clean Redux state, login/logout logic  
- Per-page SEO metadata, OG & Twitter cards  
- Offline-ready structure (demo/local/cloud modes)  

---

## 📸 Demo & Screens

**Live demo:** _[add your deployed link here]_  
**Code:** [github.com/Egor-arkharov/travel-tracker](https://github.com/Egor-arkharov/travel-tracker)

**Media previews:**
- Adaptive grid → `/videos/adaptive.mp4`  
- Card morph → `/videos/animation.mp4`  
- Form interaction → `/videos/form.mp4`  

---

## 🚀 Product Overview

| Route | Description |
|-------|--------------|
| `/` | Main grid of trips (filter, sort, search, grid/list) |
| `/create` | Add a new trip |
| `/edit/[id]` | Edit existing trip |
| `/about` | Case study — how it was built |
| `/author` | About the creator |

**Auth:** Google Login → Firebase Realtime DB (`users/${uid}/travels`)  
**Demo / Local:** stored in browser — no auth required  
**Modal logic:** open via click or `?id=…`, close by **Esc / overlay / ×**

---

## 🙌 Credits

- Photos — [Unsplash](https://unsplash.com)  
- Icons — [SVG Repo](https://www.svgrepo.com)  
- Fonts — [Google Fonts](https://fonts.google.com)

---

<div align="center">

### 👤 Author

Designed, developed & animated by **Egor Arkharov**  
🌐 [View the case study → `/about`](https://travel-tracker-demo.vercel.app/about)  
💡 [Learn more about the author → `/author`](https://travel-tracker-demo.vercel.app/author)

</div>

---

> **Travel Tracker** — a modern travel diary with adaptive grid, card-to-modal morph, and unified data flow across demo, local, and cloud modes.
