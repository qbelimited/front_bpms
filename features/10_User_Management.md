# Feature: User Management

## 1. Overview

The User Management feature is a critical administrative function that allows authorized administrators to manage the user accounts for the BPMS application itself. This includes creating new user profiles, assigning roles and permissions, updating user information, and managing user access. This feature is the foundation of the system's security model.

## 2. UI/UX (View)

*   **User Management Page (`/usermanagement`):**
    *   The main page for this feature, accessible under the "Management" section of the sidebar.
    *   An "Add New User" button that opens the `UserCreateModal`.
    *   A data table (`UserManagementTable.js`) listing all users of the application.
    *   Search and filter capabilities (e.g., by name, email, role, company).

*   **User Create Modal (`UserCreateModal.js`):**
    *   A form for creating a new user account.
    *   Fields for: Full Name, Username, Email, Temporary Password.
    *   **Assign Role:** A dropdown to assign a role to the user (e.g., 'Admin', 'Manager', 'Production', 'Logistics', 'Finance').
    *   **Assign Company (`SelectCompany.js`):** An optional dropdown to associate the user with a specific customer company (useful if BPMS users are segmented by the companies they manage).

*   **User Update Modal (`UserUpdateModal.js`):**
    *   A similar form for editing an existing user's details.
    *   Allows for updating the user's name, email, role, and company.
    *   Should include an action to "Reset Password" for the user, which would trigger an email to be sent.
    *   Should allow for activating/deactivating the user account.

## 3. Data Tables

*   **User Management Table (`UserManagementTable.js`):**
    *   **Columns:** Full Name, Username, Email, Role, Assigned Company, Status ('Active' / 'Inactive').
    *   **Actions:** "Edit," "Activate/Deactivate," "Reset Password."

## 4. Database Schema

*   **`users` table:** The central table for this feature.
    *   `id` (PK)
    *   `full_name` (VARCHAR, NOT NULL)
    *   `username` (VARCHAR, UNIQUE, NOT NULL)
    *   `email` (VARCHAR, UNIQUE, NOT NULL)
    *   `password_hash` (VARCHAR, NOT NULL)
    *   `role_id` (FK to `roles` table)
    *   `company_id` (FK to `companies` table, nullable) - Note: This links an internal user to an external company, which might be for organizational purposes.
    *   `status` (VARCHAR, e.g., 'active', 'inactive')
    *   `created_at` (TIMESTAMP)

*   **`roles` table:** Defines the available user roles.
    *   `id` (PK)
    *   `name` (VARCHAR, UNIQUE, NOT NULL, e.g., 'admin', 'manager', 'production')
    *   `description` (TEXT)

*   **`role_permissions` table (Recommended for RBAC):** A mapping table to assign permissions to roles.
    *   `role_id` (FK to `roles`)
    *   `permission_id` (FK to `permissions`)

*   **`permissions` table (Recommended for RBAC):** Defines all possible atomic permissions in the system.
    *   `id` (PK)
    *   `name` (VARCHAR, UNIQUE, NOT NULL, e.g., 'create:company', 'update:invoice', 'delete:user')

## 5. Data Flow

*   **Creating a User:**
    1.  Admin clicks "Add New User" and fills out the `UserCreateModal`.
    2.  On submission, a POST request is sent to `/api/users`.
    3.  The backend validates the data, hashes the temporary password, and creates a new record in the `users` table.
    4.  The backend should trigger an email to the new user with their username, temporary password, and a link to log in and change their password.
    5.  The frontend updates the `UserManagementTable` with the new user.

*   **Deactivating a User:**
    1.  Admin clicks "Deactivate" on a user.
    2.  After confirmation, a PUT request is sent to `/api/users/{user_id}/status` with `{ "status": "inactive" }`.
    3.  The backend updates the user's status. An inactive user should not be able to log in.
    4.  The UI updates to reflect the user's new status.

## 6. Detailed Functionality (Hows and Whats)

*   **Role-Based Access Control (RBAC):** The core of user management is assigning roles. The role assigned to a user dictates what they can see and do in the application. This should be enforced on the backend by checking the user's permissions (derived from their role) on every API call.
*   **Initial Password:** When creating a new user, the system should generate a secure, random temporary password. The user must be forced to change this password upon their first login.
*   **User Status:** An 'inactive' user must be prevented from logging into the system. This check should happen during the authentication process.

## 7. Recommendations and Best Practices

*   **Granular RBAC:** Implement a full RBAC system with roles and fine-grained permissions, as suggested in the schema. This provides maximum flexibility. Don't hardcode permissions based on role names (e.g., `if (user.role === 'admin')`). Instead, check for specific permissions (e.g., `if (user.hasPermission('delete:company'))`).
*   **Security - Password Reset Flow:** The "Reset Password" action by an admin should not allow the admin to set the password directly. It should trigger the same secure password reset flow as the public "Forgot Password?" link, sending a single-use, expiring link to the user's registered email address.
*   **Security - User Self-Service:** Users should be able to manage their own profiles (name, password) from a dedicated "User Profile" page (`/user`). They should not be able to change their own role or status.
*   **Audit Trail:** All user management actions (creating a user, changing a role, updating status, resetting a password) are highly sensitive and must be logged in the `audit_log` table.
*   **UX - Impersonation (Admin feature):** For troubleshooting, a powerful feature for administrators is the ability to "impersonate" another user. This would allow the admin to temporarily see the application exactly as the user sees it, which is invaluable for debugging permission issues. This feature needs to be extremely secure and its use must be heavily audited.
*   **Separation of Concerns:** Keep user management (for the BPMS application) separate from contact management for customer companies, even though they might both involve people.
