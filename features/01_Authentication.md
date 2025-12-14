# Feature: Authentication

## 1. Overview

The Authentication feature is responsible for securing the BPMS application by ensuring that only authorized users can access its functionalities. It covers the processes of signing in, signing out, and resetting a forgotten password. The system uses a protected routing mechanism to prevent unauthenticated access to the main dashboard and its sub-pages.

## 2. UI/UX (View)

*   **Sign-In Page (`/`):**
    *   A clean, professional form centered on the page.
    *   Inputs for "Username" or "Email Address".
    *   A password field with a toggle for visibility (`PasswordField.js`).
    *   A "Sign In" button to submit the form (`SigninForm.js`).
    *   A "Forgot Password?" link that navigates to the password reset page.
    *   Application logo (`Logobpms.png`) prominently displayed.

*   **Password Reset Request Page (`/resetpassword`):**
    *   A simple form with a single input field for the user's email address.
    *   A "Send Reset Link" button.
    *   Instructions for the user on what to expect (e.g., "An email will be sent to you with a link to reset your password.").

*   **Password Reset Page (`/resetpasswordvali`):**
    *   This page is accessed via a unique, tokenized link sent to the user's email.
    *   A form with two password fields: "New Password" and "Confirm New Password".
    *   A "Reset Password" button.
    *   Validation to ensure the two password fields match.

*   **Logout Functionality (`/logout`):**
    *   This is not a page but a menu item in the main dashboard's sidebar.
    *   Clicking "Sign out" triggers the logout process and redirects the user to the Sign-In page.

## 3. Data Tables

There are no data tables directly associated with the Authentication feature's UI.

## 4. Database Schema

*   **`users` table:** This is the primary table for authentication.
    *   `id` (PK, UUID/INT)
    *   `username` (VARCHAR, UNIQUE, NOT NULL)
    *   `email` (VARCHAR, UNIQUE, NOT NULL)
    *   `password_hash` (VARCHAR, NOT NULL) - **Never store plain text passwords.**
    *   `role_id` (FK to `roles` table) - For Role-Based Access Control (RBAC).
    *   `company_id` (FK to `companies` table, optional)
    *   `is_active` (BOOLEAN)
    *   `last_login` (TIMESTAMP)

*   **`password_reset_tokens` table:**
    *   `id` (PK)
    *   `user_id` (FK to `users` table)
    *   `token` (VARCHAR, UNIQUE, NOT NULL) - A securely generated, single-use token.
    *   `expires_at` (TIMESTAMP, NOT NULL) - The token should have a short lifespan (e.g., 1 hour).

## 5. Data Flow

*   **Sign-In:**
    1.  User enters credentials on the Sign-In page and clicks "Sign In".
    2.  Frontend calls `Auth-services.js` which sends a POST request to a `/api/auth/signin` endpoint with the username and password.
    3.  Backend verifies the credentials by comparing the hashed password.
    4.  If successful, the backend generates a JSON Web Token (JWT) or a session token and returns it to the client. The `last_login` field in the `users` table is updated.
    5.  The frontend stores the token securely (e.g., in `localStorage` or a secure cookie) and updates the Redux `auth` slice with the user's information.
    6.  The application navigates the user to the main dashboard (`/dashboard`). `ProtectedRoute.js` will now allow access.

*   **Logout:**
    1.  User clicks the "Sign out" button.
    2.  Frontend dispatches a logout action to the Redux `auth` slice, clearing the user data and token.
    3.  The token is removed from storage.
    4.  An optional API call can be made to a `/api/auth/signout` endpoint to invalidate the token on the server-side.
    5.  The user is redirected to the Sign-In page (`/`).

## 6. Detailed Functionality (Hows and Whats)

*   **JWT/Session Management:** The system relies on a token-based authentication mechanism. The token is sent with every subsequent API request in the `Authorization` header, which is handled by the `authHeader.js` service. The backend validates this token on every protected endpoint.
*   **Protected Routes:** The `ProtectedRoute.js` component acts as a gatekeeper for all pages under the dashboard. It checks for the presence and validity of the authentication token in the Redux store or local storage. If the token is not present or invalid, it redirects the user to the Sign-In page.
*   **Password Hashing:** The backend must use a strong, one-way hashing algorithm like bcrypt or Argon2 to hash user passwords before storing them in the database.

## 7. Recommendations and Best Practices

*   **Security - Credential Storage:** Never store the authentication token in `localStorage` as it is vulnerable to XSS attacks. Use a secure, `HttpOnly` cookie for storing the token.
*   **Security - Password Policies:** Enforce strong password policies on the client and server-side (e.g., minimum length, complexity requirements).
*   **Security - Brute Force Protection:** Implement rate limiting and account lockout mechanisms on the backend to prevent brute-force attacks on the sign-in endpoint.
*   **Security - Token Invalidation:** When a user logs out or changes their password, ensure that the previously issued JWTs are invalidated on the server-side. This can be managed with a token blocklist.
*   **UX - Feedback:** Provide clear feedback to the user on the sign-in page (e.g., "Invalid username or password," "Your account is inactive.").
*   **Backend - Secure Tokens:** The password reset token must be a long, random, and single-use string. It should be securely stored (e.g., hashed) in the database.
*   **RBAC Integration:** The authentication process should also fetch the user's role. This role information should be stored in the Redux state and used throughout the application to show/hide UI elements and control access to features.
