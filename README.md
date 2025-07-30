# 🌍 Touristica — Your Ultimate Bangladesh Travel Companion

**Touristica** is a full-stack MERN-based travel and tour management platform designed to connect tourists with the cultural and natural wonders of **Bangladesh**. It delivers a seamless experience for tourists to discover and book curated packages, for tour guides to manage their assignments, and for admins to monitor and oversee the entire system.

This platform features:
- Role-based dashboards
- Real-time booking and tour management
- JWT-secured routes
- Stripe payment integration
- Confetti animations and Framer Motion UI effects

---

## 🚀 Live Site & Repositories

- **Live Client:** [https://touristica-travels.web.app](https://touristica-travels.web.app)


---

## ✨ Core Features

### ✅ For All Users

- **Stunning Homepage:** 
  - Animated and auto-playing Swiper.js slider
  - Framer Motion section transitions
- **Tour Guide Section:** 
  - Discover professional tour guides
- **Community Stories:** 
  - Read travel experiences shared by real users
- **Secure Authentication:** 
  - Firebase email/password & Google sign-in
  - JWT-based access control

---

### ✅ For Tourists (Logged-In Users)

- **Detailed Package View:** 
  - Image gallery with day-wise plan and location details
- **Booking System:** 
  - Choose preferred date and tour guide
- **Personal Dashboard:**
  - **My Bookings:** Status tracking (In Review / Accepted / Rejected)
  - **Cancel or Pay:** 
    - Cancel any pending booking
    - Use **Stripe** for payment if accepted
- **Booking Reward:**
  - Book more than 3 times? Enjoy a celebration animation with `react-confetti`
- **Story Sharing:** 
  - Post and manage your travel experiences with images

---

### ✅ For Tour Guides

- **Dashboard Access:** 
  - View all assigned tours
- **Accept/Reject Bookings:**
  - Real-time update to tourist dashboard
  - Confirmation modal for rejection

---

### ✅ For Admins

- **Admin Dashboard (Protected):**
  - View welcome message and platform stats:
    - Total Payments (calculated sum)
    - Total Tour Guides
    - Total Packages
    - Total Clients (Tourists)
    - Total Stories
- **Edit Profile:** 
  - All fields editable except email & role
- **Add Packages:**
  - Submit new tour packages including title, description, multiple images, type, location, price, duration, plan[]
- **Manage Users:**
  - Search users by name or email
  - Filter by role using `react-select`
  - Update roles (tourist, guide, admin)
  - Pagination (10 users per page)
- **Manage Candidates:**
  - Review and approve/reject guide applications
- **Story Management:**
  - View or delete submitted travel stories

---

## ⚙️ Technology Stack

| Area        | Technology                                                                 |
|-------------|-----------------------------------------------------------------------------|
| Frontend    | React, Tailwind CSS, DaisyUI, React Router, Tanstack Query, Axios          |
| Backend     | Node.js, Express.js                                                        |
| Database    | MongoDB Atlas                                                              |
| Authentication | Firebase Authentication + JWT                                           |
| Deployment  | Firebase (Client), Vercel (Server)                                         |
| Animations  | Framer Motion, React Confetti                                              |
| Payment     | Stripe                                                                     |
| Image Hosting | ImgBB                                                                    |

---

## 🔐 Authentication & Authorization

### 🔒 Authentication

- Powered by **Firebase** (email/password, Google login)
- JWT (JSON Web Token) issued from the server and stored in **localStorage**

### 🔐 Authorization

- JWT verified with Axios Interceptors (client) and custom middleware (`verifyToken`, `verifyAdmin`) on the server
- Role-based routing with `PrivateRoute`, `AdminRoute`, `GuideRoute` components

---

## 📦 Package Schema (Backend Model)

```js
{
  title: String,
  description: String,
  images: [String],
  plan: [
    {
      day: Number,
      activity: String,
      description: String
    }
  ],
  type: String,
  location: String,
  price: Number,
  duration: Number,
  rating: Number
}
