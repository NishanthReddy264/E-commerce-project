Overview
This project is an e-commerce website built using React for the frontend and Express for the backend, with MongoDB Atlas for data storage. It includes user authentication, product management, and a shopping cart system.

Features
Authentication and User Management
Signup Page: Allows users to register with their name, email, mobile number, and password. Users can also set up an initial product cart with product IDs and quantities. Validation is done on the client side, and data is sent to the server via axios.

Login Page: Users log in using their email and password. Upon successful login, a user ID is returned and stored locally. This ID is used for accessing user-specific features.

Private User Pages
Header Component: A fixed header with navigation links:
Home: Displays a welcome message, user details (excluding password), and discount information.
Products: Shows a list of products fetched from a JSON API. Each product card includes an "Add to Cart" button, which updates the cart in MongoDB.
Cart: Users can view and manage their cart items—adjust quantities, remove items, and generate a bill.
Sign Out: Logs the user out and redirects to the login page.
Functionality
Home Page: After logging in, users see a welcome message and their account details.

Product Page: Products are displayed in a grid format, with each product featuring a "View" button for more details. Users can add items to their cart, which updates in MongoDB.

Cart Page: Users can view, update, and remove items from their cart, and generate a bill. Changes to the cart are synced with the backend.

Sign Out: Logs the user out and redirects them to the login page.

Technologies Used
Frontend: React, react-router-dom for routing, react-bootstrap for styling.
Backend: Express.js for server-side logic and API endpoints.
Database: MongoDB Atlas for storing user data and managing product carts.# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
