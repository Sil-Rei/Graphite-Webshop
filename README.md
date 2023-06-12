# Graphite Webshop

This is a demo webshop project built using React for the frontend and Django REST framework for the backend. The project provides various features commonly found in a webshop, such as user registration, user login with JWT authentication, product reviews, and an admin page for managing users and products. Please note that the payment process is excluded from this demo.

## Table of Contents

- [Installation](#installation)
- [Features](#features)
  - [User Registration and Login](#user-registration-and-login)
  - [Product Reviews](#product-reviews)
  - [Admin Page](#admin-page)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

To run the webshop project locally, please follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/demo-webshop.git
   ```

2. Install the dependencies for both the frontend and backend. Run the following commands in separate terminals:

   - Frontend:

     ```bash
     cd demo-webshop/frontend
     npm install
     ```

   - Backend:

     ```bash
     cd demo-webshop/backend
     pip install -r requirements.txt
     ```

3. Start the development servers:

   - Frontend:

     ```bash
     cd demo-webshop/frontend
     npm start
     ```

   - Backend:

     ```bash
     cd demo-webshop/backend
     python manage.py runserver
     ```

4. Open your browser and navigate to `http://localhost:3000` to access the webshop.

## Features

### User Registration and Login

The webshop provides user registration and login functionalities using JSON Web Tokens (JWT) for authentication. Users can create an account by providing their email and password. Once registered, they can log in to access additional features and functionalities.

### Product Reviews

Customers can write reviews for products they have purchased or are interested in. The webshop allows users to view existing reviews for each product and submit their own reviews, providing valuable feedback to other customers.

### Admin Page

The webshop includes an admin page that offers convenient management of users and products. Admin users have access to the admin page, where they can register new users, edit user information, add new products, and update existing product details. This feature is designed to provide administrative control over the webshop's user and product database. Furthermore there are charts to control the stock and sales.

### Non logged in users can add to cart as well, gets synced after registration

### Search Functionality

### Verified Purchases


## Usage

1. User Registration:
   - Navigate to the webshop's registration page.
   - Provide a valid email address and password.
   - Click the "Register" button to create a new user account.

2. User Login:
   - Go to the webshop's login page.
   - Enter the registered email and password.
   - Click the "Login" button to authenticate.

3. Product Reviews:
   - Browse through the available products.
   - Click on a product to view its details.
   - Scroll down to see existing reviews.
   - If logged in, users can submit their own reviews using the provided form.

4. Admin Page:
   - To access the admin page, an admin user account is required.
   - Log in using the admin credentials.
   - Navigate to the admin section from the navigation menu.
   - Use the available options to manage users and products.

## Contributing

Contributions to this demo webshop project are welcome! If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the GitHub repository.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to modify and use the code according to the terms
