# Maison – Minimalist E-Commerce Platform

Maison is a sophisticated, full-stack minimalist e-commerce storefront crafted for premium interior goods and furniture. Designed with a focus on clean typography, smooth user interactions, and responsive product discovery, the application features seamless dynamic asset rendering, user-managed state persistence, and a modern authentication ecosystem.

---

##  Key Features

1) Dynamic Product Discovery Grid:** Intuitive storefront displaying curated default items along with automated image path filtering and graceful fallback icon rendering.
2) Custom Asset Injection:** Empowers users to expand the marketplace catalog dynamically with full state persistence synced to client-side storage.
3) Firebase Authentication Ecosystem:** Secure identity verification supporting explicit Google Sign-In protocols alongside email/password pathways.
4) Advanced Content Layouts:** Rich product presentation modules utilizing fluid dynamic routing logic to match parameters and render granular specifications.
5) Tailwind CSS & DaisyUI Interface:** Elegant, high-contrast, minimalist design language built entirely with responsive utility configurations.

---

## Setup & Installation Instructions

Follow these steps to clone, configure, and run the development environment on your local system:

### 1. Clone the Repository

git clone [https://github.com/shimanta18/Maison.git](https://github.com/shimanta18/Maison.git)
cd Maison

Install Project Dependencies
Deploy the core framework modules along with the necessary Firebase and icon utility packages:
npm install

Configure Environment Variables
Create a .env.local file in the root directory of your project and inject your specific Firebase configuration values:  

Code snippet
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here

Initialize Local Server
Launch the compiler and boot up the local ecosystem:

Bash
npm run dev


*** Application Route Summary
/ -	Public	Landing Page: Narrative hero layouts, brand identity hooks, and entry action triggers.
/items -	Public	Shop Grid Page: Main storefront listing with combined static catalogs and custom user assets.
/items/[id]	- Dynamic	Product Details Page: Contextual page rendering deep specifications, price modules, and related items.
/login	Auth -	Welcome Back Page: Secure gateway supporting email credentials and Google Sign-In.
/register	Auth -	Registration Page: Creates accounts and binds user state to the application framework.
