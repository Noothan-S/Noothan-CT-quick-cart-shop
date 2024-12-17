# QuickCart E-Commerce Application

## Project Description

This E-Commerce Application is a comprehensive online shopping platform designed to provide a seamless experience for users, vendors, and administrators. It offers a feature-rich environment where customers can browse and purchase products, vendors can manage their shops and inventories, and administrators can oversee and control the entire system.

The application is built with scalability and performance in mind, utilizing modern web development technologies to ensure a robust and responsive user experience across all devices.

## Live URL

- Frontend: [https://quick-cart-shop.web.app](https://quick-cart-shop.web.app)
- Backend: [https://quick-cart-silk.vercel.app](https://quick-cart-silk.vercel.app)

## Technology Stack & Packages

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Prisma ORM
- JSON Web Tokens (JWT) for authentication
- Cloudinary for image storage

### Frontend

- React.js
- TypeScript
- Redux for state management
- Tailwind CSS for styling
- RTK Query for API requests

### Additional Packages

- bcrypt for password hashing
- cors for handling Cross-Origin Resource Sharing
- dotenv for environment variable management
- zod for data validation
- nodemailer for sending emails
- stripe for payment processing

## Setup Instructions

1. Clone the repository

   ```
   git clone https://github.com/sheikhmohdnazmulhasan/quick-cart-shop.git
   cd quick-cart-shop
   ```

2. Backend Setup

   ```
   cd backend
   npm install
   cp .env.example .env
   # Fill in the .env file with your database and other configuration details
   npx prisma migrate dev
   npm run dev
   ```

3. Frontend Setup

   ```
   cd frontend
   npm install
   cp .env.example .env
   # Fill in the .env file with your API URL and other configuration details
   npm run dev
   ```

4. Visit `http://localhost:5173` in your browser to view the application

## Key Features & Functionality

1. User Roles: Admin, Vendor, and Customer with distinct functionalities
2. Product Management: Add, edit, delete, and duplicate products (for vendors)
3. Shop Management: Create and manage vendor shops
4. Advanced Product Browsing: Filtering, searching, and infinite scrolling
5. Shopping Cart: Single-vendor cart system with replace/retain options
6. Checkout Process: Coupon application and integrated payment system
7. Order Management: View and manage order history
8. User Authentication: Secure signup, login, and password management
9. Product Comparison: Compare up to three products from the same category
10. Responsive Design: Mobile and desktop-friendly interface
11. Recent Products: Track and display last 10 viewed products
12. Shop Following: Users can follow shops to prioritize their products
13. Reviews and Ratings: Customers can leave reviews for purchased products
14. Flash Sales: Special discounted products section

## Known Issues/Bugs

1. Occasional delay in updating product inventory after purchase
2. Image upload sometimes fails on slow internet connections
3. Infinite scroll functionality not yet implemented
4. Recent Products feature (tracking and displaying last 10 viewed products) not yet implemented

I'm actively working on resolving these issues. If you encounter any additional bugs, please report them in the Issues section of that GitHub repository.

## Contributing

I'm welcome contributions to improve the QuickCart E-Commerce Application. Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Acknowledgments

- Special thanks to [Stripe](https://stripe.com) for their excellent payment processing API
- Shoutout to the [Prisma](https://www.prisma.io/) team for their fantastic ORM

For any additional questions or support, please contact me at nazmulofficial@outlook.com
