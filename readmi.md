# 🏡 Wanderlust - Airbnb Clone

Wanderlust is a full-stack web application inspired by Airbnb, designed to allow users to discover, list, and review travel accommodations around the globe. Built using Node.js, Express, MongoDB, and EJS, this project features robust user authentication, CRUD operations for property listings and reviews, and clean, responsive UI layouts.

---

## ✨ Features

- **🏠 Property Listings Management (CRUD)**:
  - **Browse**: View all available vacation listings with details like title, image, price, location, and country.
  - **Create**: Add new property listings with custom details and images.
  - **Edit & Update**: Modify property details seamlessly.
  - **Delete**: Remove listings from the platform.

- **⭐ Reviews & Rating System**:
  - Add review comments and 1–5 star ratings to property listings.
  - Delete individual reviews from a listing.

- **🔒 User Authentication & Authorization**:
  - Secure user signup and session management using Passport.js and MongoDB.
  - Session-based flash notifications for real-time feedback on user actions.

- **🌱 Database Seeding**:
  - Automated seeding script (`init/index.js`) to initialize MongoDB with sample property data.

- **📄 Static Pages**:
  - Home landing page, Privacy Policy, and Terms of Service.

---

## 🛠️ Tech Stack

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MongoDB (via Mongoose ORM)
- **Authentication**: Passport.js (`passport-local`, `passport-local-mongoose`)
- **Session & Flash**: `express-session`, `connect-flash`
- **HTTP Method Utility**: `method-override` (enables `PUT` and `DELETE` requests from HTML forms)

### **Frontend**
- **Templating Engine**: EJS (Embedded JavaScript) with `ejs-mate` layout engine
- **Styling**: CSS & HTML5 static assets

---

## 📁 Project Structure

```
major_project/
├── app.js               # Express application entry point & server setup
├── models/              # Mongoose database schemas & models
│   ├── listing.js       # Listing schema (title, description, image, price, location, country, reviews)
│   ├── review.js        # Review schema (rating, comment, createdAt)
│   └── user.js          # User schema integrated with Passport-Local-Mongoose
├── routes/              # Express Router modules
│   ├── listings.js      # Routes for listing operations (/listings)
│   ├── reviews.js       # Routes for listing reviews (/listings/:id/reviews)
│   └── user.js          # Authentication routes (/signup)
├── views/               # EJS templates and page layouts
│   ├── includes/        # Partial templates (navbar, footer, flash alerts)
│   ├── layouts/         # Base layout templates (boilerplate)
│   ├── listings/        # Listing pages (index, show, new, edit)
│   ├── user/            # Authentication templates (signup)
│   ├── home.ejs         # Landing page
│   ├── privacy.ejs      # Privacy policy
│   └── terms.ejs        # Terms of service
├── init/                # Seed dataset and database initializer
│   ├── data.js          # Pre-populated sample listings dataset
│   └── index.js         # Script to reset and seed the MongoDB database
├── public/              # Static files (CSS, client-side JS, images)
├── package.json         # Dependencies and scripts configuration
└── README.md            # Project documentation
```

---

## 🚀 Getting Started

Follow these instructions to get a local copy up and running.

### 📋 Prerequisites

Make sure you have the following installed on your system:
- **[Node.js](https://nodejs.org/)** (v16.x or higher)
- **[MongoDB](https://www.mongodb.com/)** (Running locally on default port `27017`)
- **[Git](https://git-scm.com/)**

---

### 💻 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sohit62664/Airbnb.git
   cd Airbnb
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Ensure MongoDB is running**:
   Make sure MongoDB is active on `mongodb://127.0.0.1:27017`.

4. **Seed the database (Optional but recommended)**:
   To populate MongoDB (`wanderlust` database) with initial sample listing data:
   ```bash
   node init/index.js
   ```

5. **Run the application**:
   ```bash
   node app.js
   ```

6. **Open in Browser**:
   Visit [http://localhost:8080/listings](http://localhost:8080/listings) in your web browser.

---

## 📡 Routes & API Reference

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Home landing page |
| `GET` | `/listings` | View all property listings |
| `GET` | `/listings/new` | Form to create a new property listing |
| `POST` | `/listings` | Save new listing to database |
| `GET` | `/listings/:id` | View listing details and reviews |
| `GET` | `/listings/:id/edit` | Form to edit an existing listing |
| `PUT` | `/listings/:id` | Update listing in database |
| `DELETE` | `/listings/:id` | Delete listing from database |
| `POST` | `/listings/:id/reviews` | Create a review/rating for a listing |
| `DELETE` | `/listings/:id/reviews/:reviewId` | Delete a review from a listing |
| `GET` | `/signup` | User signup form |
| `POST` | `/signup` | Register a new user |
| `GET` | `/privacy` | Privacy Policy page |
| `GET` | `/terms` | Terms of Service page |

---

## 📜 License

This project is licensed under the [ISC License](package.json).
