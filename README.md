# 🌍 Travel Tracker

**A polished, offline-first travel diary.**  
Add trips, view them in an adaptive grid, open a fluid card-to-modal view, edit details, and sync everything to the cloud.

Built with **Next.js (App Router)**, **React 18**, **TypeScript**, **Redux Toolkit**, **Firebase**, **SCSS Modules**, **Framer Motion**, and **Google Maps & Places API**.

> A portfolio project built like a real product — with clean architecture, custom motion, and seamless data flow between demo, local and cloud modes.

---

## ✨ Highlights

- **Offline-first design:** works in demo, local (no login) and cloud (Firebase) modes  
- **Unified data flow:** one Redux layer for all storage sources  
- **Adaptive grid:** container queries + custom grouping keep layouts balanced  
- **Card → Modal morph:** smooth Framer Motion transition with staged overlay/text  
- **Real-world form:** Google Places, date ranges, rating, budget, image upload, manual validation  
- **Clean UI system:** SCSS tokens, clamp typography, container queries

---

## 🧭 Product Overview

| Route | Description |
|-------|--------------|
| `/` | Main grid of trips (filter, sort, search, grid/list) |
| `/create` | Add a new trip |
| `/edit/[id]` | Edit existing trip |
| `/about` | Case study — how it was built |
| `/example` | Extended showcase |

**Auth:** Google Login → Firebase Realtime DB (`users/${uid}/travels`)  
**Demo / Local:** stored in browser — no auth required  
**Modal logic:** open via click or `?id=…`, close by **Esc / overlay / ×**

---

## 🧱 Tech Stack

- **Framework:** Next.js 15 (App Router), React 18  
- **Language:** TypeScript 5  
- **State:** Redux Toolkit  
- **Backend:** Firebase (Realtime DB + Google Auth)  
- **UI:** SCSS Modules (tokens, mixins, clamp typography)  
- **Motion:** Framer Motion  
- **Maps:** Google Maps & Places API  
- **Utils:** Swiper, Tippy.js, Datepicker  
- **Hosting:** Firebase Hosting / Vercel

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build production
npm run build
npm start
