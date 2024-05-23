# Market Mate / Stock Management System

**Live Link:** [Market Mate](https://market-mate-mfy.vercel.app/)

## Description
The Stock Management System is a comprehensive system for managing inventory, brands, firms, and products. The system includes features such as authentication, data visualization, and CRUD (Create, Read, Update, Delete) operations for various entities. This project is designed to facilitate stock management and help businesses manage their inventory more efficiently.

## Features
- **User Authentication:** Login, Token Renewal, Logout
- **CRUD Operations:** CRUD operations for Users, Brands, Firms, and Products
- **Data Visualization:** Data visualization with charts
- **Responsive Interface:** A responsive and user-friendly interface optimized for both mobile and desktop devices
- **Notification System:** Notifications for success, warning, and error messages

## Dependencies

The project uses the following core dependencies:
- **React:** For building the user interface
- **Redux:** For state management
- **React Router:** For client-side routing
- **Material-UI:** For user interface components
- **Axios:** For making HTTP requests
- **Formik:** For form management
- **Yup:** For validation
- **React-Toastify:** For notifications
- **TailwindCSS:** For styling
- **SweetAlert2:** For beautiful alerts and notifications

## Project Structure

````

.
├── public
├── src
│ ├── app
│ │ └── store.jsx
│ ├── assets
│ ├── components
│ │ ├── BrandCard.jsx
│ │ ├── Charts.jsx
│ │ ├── FirmCard.jsx
│ │ ├── KpiCards.jsx
│ │ ├── LoginForm.jsx
│ │ ├── MenuListItems.jsx
│ │ ├── RegisterForm.jsx
│ │ └── modals
│ │ ├── BrandModal.jsx
│ │ ├── FirmModal.jsx
│ │ ├── ProductModal.jsx
│ │ ├── PurchaseModal.jsx
│ │ └── SaleModal.jsx
│ ├── features
│ │ ├── authSlice.jsx
│ │ └── stockSlice.jsx
│ ├── helper
│ │ └── ToastNotify.js
│ ├── hooks
│ │ ├── useAuthCall.jsx
│ │ ├── useAxios.jsx
│ │ └── useStockCall.jsx
│ ├── index.css
│ ├── index.js
│ ├── pages
│ │ ├── Brands.jsx
│ │ ├── Dashboard.jsx
│ │ ├── Firms.jsx
│ │ ├── Home.jsx
│ │ ├── Login.jsx
│ │ ├── Products.jsx
│ │ ├── Purchases.jsx
│ │ ├── Register.jsx
│ │ └── Sales.jsx
│ ├── router
│ │ ├── AppRouter.jsx
│ │ └── PrivateRouter.jsx
│ └── styles
│ └── globalStyle.jsx
└── tailwind.config.js
````

<div>
   <img src="./assets/stockgif1.gif">
</div>


## Getting Started

To run the application on your local machine, follow these steps:

1. Clone the project to your computer:
   git clone https://github.com/yourusername/market-mate.git

2. Open your terminal and navigate to the project directory:
   cd market-mate

3. Install the dependencies:
   npm install

4. Start the application:
   npm start

5. Open your web browser and visit http://localhost:3000 to explore the Market Mate / Stock Management System.
