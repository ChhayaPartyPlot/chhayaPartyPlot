
# Chhaya Party Plot Booking and Management System

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-blueviolet)](https://nextjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.16.0-green)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-8.15.0-brightgreen)](https://mongoosejs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/chhayaPartyPlot)

## Introduction

Chhaya Party Plot is a comprehensive booking and management system built with Next.js, designed to streamline event bookings and administrative tasks. This application offers API endpoints for booking management, image uploads, inquiry handling, user authentication (login/logout/registration), and user management. It uses MongoDB with Mongoose for data persistence.

This README provides detailed instructions on setting up the development environment, understanding the API endpoints and database models, contributing to the project, and deploying the application.

## Features

-   **Booking Management:** Create, read, and manage event bookings.
-   **Image Uploads:** Upload and manage images for the gallery.
-   **Inquiry Handling:** Submit and manage inquiries from potential customers.
-   **User Authentication:** Secure login, logout, and registration functionality for administrators.
-   **User Management:** Create and manage user accounts.
-   **Responsive Design:** Provides optimal viewing experience across a wide range of devices
-   **SEO Optimized:** The application is SEO friendly

## Technologies Used

-   [Next.js](https://nextjs.org/) - React framework for building web applications
-   [MongoDB](https://www.mongodb.com/) - NoSQL database
-   [Mongoose](https://mongoosejs.com/) - MongoDB object modeling tool
-   [bcryptjs](https://github.com/dcodeIO/bcrypt.js) - For password hashing
-   [Cloudinary](https://cloudinary.com/) - For image storage and management
-   [nodemailer](https://nodemailer.com/) - For sending emails
-   [Zod](https://zod.dev/) - For data validation

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn
-   MongoDB installed and running
-   Cloudinary account

### Installation

1.  Clone the repository:

    bash
    npm install # or yarn install
    bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
        Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

## API Documentation

### Base URL

All API endpoints are relative to the base URL of your application.  In development, this is usually `http://localhost:3000/api`.

### Authentication

Admin authentication is required for certain API endpoints.  Use the `/api/login` endpoint to obtain a session token, which is stored in a cookie.

### Endpoints

#### 1. Booking API (`/api/booking`)

-   **GET:** Retrieve bookings for a given month and year.
    -   **Query Parameters:**
        -   `month` (optional): Month to filter bookings (1-12). Defaults to the current month.
        -   `year` (optional): Year to filter bookings. Defaults to the current year.
    -   **Example Request:**

json
        [
            {
                "_id": "667a9a4e8e8e8a8a8a8a8a8a",
                "user": {
                    "_id": "667a9a4e8e8e8a8a8a8a8a8b",
                    "name": "John Doe",
                    "mobNumber": "1234567890",
                    "altNumber": null,
                    "__v": 0
                },
                "startDate": "2024-07-01T00:00:00.000Z",
                "totalBookingDays": 3,
                "__v": 0
            },
            {
              "_id": "667a9a4e8e8e8a8a8a8a8a8a",
              "user": {
                  "_id": "667a9a4e8e8e8a8a8a8a8a8b",
                  "name": "John Doe",
                  "mobNumber": "1234567890",
                  "altNumber": null,
                  "__v": 0
              },
              "startDate": "2024-07-15T00:00:00.000Z",
              "totalBookingDays": 1,
              "__v": 0
          }
        ]
        json
        {
            "mobNumber": "1234567890",
            "startDate": "2024-07-20",
            "totalBookingDays": 2
        }
                > **Note:** Either `mobNumber` must be provided. `startDate` defaults to the current date if not provided, and `totalBookingDays` defaults to 1 if not provided.

    -   **Example Response (200 OK):**

json
        {
            "message": "Invalid or missing parameters"
        }
        #### 2. Image API (`/api/image`)

-   **GET:** Retrieve all images.
    -   **Example Response (200 OK):**

-   **POST:** Upload a new image.
    -   **Request Body (FormData):**
        -   `file`: Image file to upload.
    -   **Example Request (using HTML form):**

html
        <form action="/api/image" method="POST" encType="multipart/form-data">
            <input type="file" name="file" />
            <button type="submit">Upload</button>
        </form>
            -   **Example Response (400 Bad Request):**

        #### 3. Inquiry API (`/api/inquiry`)

-   **GET:** Retrieve all inquiries.
        -   **Example Response (200 OK):**

json
        [
            {
                "_id": "667a9a4e8e8e8a8a8a8a8a8d",
                "name": "Demo Name",
                "phone": "1234567890",
                "startingDate": "2024-07-01T00:00:00.000Z",
                "totalBookingDays": 1,
                "__v": 0
            },
        ]
        json
        {
            "success": true
        }
            -   **Purpose:** Handles user inquiries, validates the data, stores it in the database, and sends a confirmation email.

#### 4. Login API (`/api/login`)

-   **POST:** Log in an admin user.
    -   **Request Body:**

json
        {
            "username": "admin",
            "password": "password123"
        }
        json
        {
            "message": "Invalid password"
        }
        -   **POST:** Log out an admin user.
    -   **Example Response (200 OK):**

        json
        {
            "message": "No active session to logout"
        }
        -   **GET:**  Provides information that only POST request are allowed to logout
     -   **Example Response (200 OK):**

        json
        {
            "username": "newadmin",
            "password": "newpassword123"
        }
        json
        {
            "message": "Username already exists"
        }
        -   **GET:** Retrieve user information by mobile number.
    -   **Query Parameters:**
        -   `mobNumber` (required): Mobile number of the user.
    -   **Example Request:**

json
        {
            "message": "User found",
            "user": {
                "_id": "667a9a4e8e8e8a8a8a8a8a8b",
                "name": "John Doe",
                "mobNumber": "1234567890",
                "altNumber": null,
                "__v": 0
            }
        }
            -   **Example Response (404 Not Found):**

        json
        {
            "name": "Jane Smith",
            "mobNumber": "9876543210",
            "altNumber": "8765432109"
        }
            -   **Example Response (200 OK):**

json
        {
            "message": "User Not Created",
            "error": "..."
        }
        The application uses Mongoose to define the following database models:

### 1. Admin

Represents an administrator user.

-   **Schema:**

-   **Purpose:** Stores administrator credentials for authentication.

### 2. Booking

Represents an event booking.

-   **Schema:**

javascript
    const bookingSchema = new Schema({
      user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      startDate: { type: Date, required: true },
      totalBookingDays: { type: Number, required: true, min: 1 },
    });
    -   **Fields:**
    -   `user` (ObjectId, ref: 'User'): Required, reference to the User who made the booking.
    -   `startDate` (Date): Required, the start date of the booking.
    -   `totalBookingDays` (Number): Required, the total number of days for the booking (minimum 1).

-   **Purpose:** Stores booking information, including the user, start date, and duration.

### 3. Gallery

Represents an image in the gallery.

-   **Schema:**

    -   **Fields:**
    -   `url` (String): Required, the URL of the image.

-   **Purpose:** Stores image URLs for the gallery.

### 4. Inquiry

Represents a user inquiry.

-   **Schema:**

javascript
    const inquirySchema = new Schema({
      name: { type: String, required: true },
      email: { type: String },
      phone: { type: String, required: true },
      startingDate: { type: Date, required: true },
      totalBookingDays: { type: Number, default: 1, min: 1 },
    });
    -   **Fields:**
    -   `name` (String): Required, the name of the user submitting the inquiry.
    -   `email` (String): the email of the user submitting the inquiry.
    -   `phone` (String): Required, the phone number of the user.
    -   `startingDate` (Date): Required, the preferred start date for the event.
    -   `totalBookingDays` (Number): The total number of days for the booking (minimum 1).

-   **Purpose:** Stores user inquiries for event bookings.

### 5. User

Represents a user.

-   **Schema:**

-   **Fields:**
    -   `name` (String): Required, the name of the user.
    -   `mobNumber` (String): Required, the mobile number of the user (must be 10 digits).
    -   `altNumber` (String): Optional, the alternate mobile number of the user (must be 10 digits).

-   **Purpose:** Stores user information.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1.  Push your code to a Git repository (e.g., GitHub, GitLab, Bitbucket).
2.  Import your project into Vercel.
3.  Vercel will automatically deploy your application and provide you with a URL.

Alternatively, you can use other platforms like Netlify, AWS, or DigitalOcean.  Refer to the Next.js documentation for detailed deployment instructions: [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

> **Note:** Ensure your environment variables are correctly configured in your deployment environment.

## Contributing

bash
    git checkout -b feature/your-feature-name
    3.  Make your changes and commit them with descriptive commit messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main branch of the original repository.

### Code Style

-   Follow the existing code style and conventions.
-   Write clear and concise code with meaningful comments.
-   Test your changes thoroughly.

### Reporting Issues

If you encounter any issues or have suggestions for improvements, please submit a bug report.  Provide as much detail as possible, including:

-   A clear and descriptive title.
-   Steps to reproduce the issue.
-   Expected behavior.
-   Actual behavior.
-   Relevant error messages or logs.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## TODO

Backend

## Preview

>Add live link of the application
