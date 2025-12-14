# Feature: System Settings

## 1. Overview

The System Settings feature is an administrative area of the BPMS that allows authorized users to configure and customize various aspects of the application's behavior and to access informational pages. It is a collection of several sub-features that are critical for tailoring the system to specific operational needs, such as defining plate types, managing application-wide parameters, and accessing help documentation.

This feature encompasses:
*   Plates Settings
*   App Settings
*   About BPMS
*   Help and Support

## 2. UI/UX (View)

*   **Main Settings Page (`/settings` - hypothetical):**
    *   A central page that provides navigation to the different settings sub-pages. This would be a good organizing principle.

*   **Plates Settings Page (`/platesettings`):**
    *   A multi-tabbed or sectioned interface for managing all plate-related configurations.
    *   **Plate Size Management:** A table (`PlateSizeTable.js`) listing available plate dimensions. Actions to "Add New Size" (`PlateSizeModal.js`), "Edit" (`UpdateSizeTable.js`), and "Activate/Deactivate" (`ActivatePlate.js`, `DeactivatePlate.js`).
    *   **Plate Color Management:** A table (`PlateColorTable.js`) for managing plate background colors, with similar "Add" (`PlateColorModal.js`), "Edit" (`UpdateColorModal.js`), and "Activate/Deactivate" (`ActivateColor.js`, `DeactiveColor.js`) functionality.
    *   **Embosser Color Management:** A similar interface (`PlateEmbosingColor.js`) for managing the colors used for the embossed characters.
    *   **Plate Type Management (Recommended):** A higher-level table that combines these attributes to define a "Plate Type" (e.g., 'Private Standard', 'Commercial Motorcycle'), setting its size, colors, category, price, and whether it's paired.

*   **App Settings Page (`/appsettings`):**
    *   A form (`AppContent.js`) containing various application-wide configuration fields.
    *   Fields for: Application Name, Company Logo, system email addresses (for notifications), and potentially feature flags to turn experimental features on or off.

*   **About BPMS Page (`/aboutus`):**
    *   A static informational page (`AboutComponenet.js`) displaying details about the BPMS application.
    *   Information could include: Version Number, Release Date, "Powered by Ten-io" attribution, and contact information for the developers.

*   **Help & Support Page (`/helpandsupport`):**
    *   A page (`HelpContent.js`) providing user support resources.
    *   Could include a list of Frequently Asked Questions (FAQs), user guides (or links to them), and a contact form or email link for submitting support tickets.
    *   May include a `PrioritySelect.js` dropdown if it features a support ticket submission form.

## 3. Data Tables

*   **Plate Size Table:** Columns for Size/Dimension, Status (Active/Inactive), Actions.
*   **Plate Color Table:** Columns for Color Name, Color Hex Code, Status, Actions.
*   **Embosser Color Table:** Columns for Color Name, Color Hex Code, Status, Actions.

## 4. Database Schema

*   **`plate_types` (Recommended Central Table):**
    *   `id` (PK)
    *   `name` (VARCHAR)
    *   `dimension_id` (FK to `plate_dimensions`)
    *   `background_color_id` (FK to `plate_colors`)
    *   `emboss_color_id` (FK to `plate_colors`)
    *   `category` (VARCHAR)
    *   `vehicle_type` (VARCHAR)
    *   `is_paired` (BOOLEAN)
    *   `price` (DECIMAL)
    *   `is_active` (BOOLEAN)

*   **`plate_dimensions` table:**
    *   `id` (PK)
    *   `dimension` (VARCHAR, UNIQUE, e.g., '440x120mm')
    *   `is_active` (BOOLEAN)

*   **`plate_colors` table:**
    *   `id` (PK)
    *   `name` (VARCHAR, UNIQUE, e.g., 'White', 'Yellow', 'Blue')
    *   `hex_code` (VARCHAR, e.g., '#FFFFFF')
    *   `is_active` (BOOLEAN)

*   **`app_settings` table:** A key-value store for application-wide settings.
    *   `key` (VARCHAR, PK, e.g., 'app_name', 'system_email')
    *   `value` (TEXT)

## 5. Data Flow

1.  Admin navigates to the `/platesettings` page.
2.  The page fetches data from `/api/settings/plate-dimensions`, `/api/settings/plate-colors`, etc. to populate the tables.
3.  Admin clicks "Add New Size." The `PlateSizeModal` opens.
4.  Admin submits the new dimension. A POST request is sent to `/api/settings/plate-dimensions`.
5.  The backend creates the new record.
6.  The frontend updates the state to show the new size in the `PlateSizeTable.js` without a page reload.
7.  This new size will now be available in the "Select a Size" dropdown when creating a new Plate Production batch, as that dropdown should be populated by an API call to the settings endpoints.

## 6. Detailed Functionality (Hows and Whats)

*   **Dynamic Configuration:** The core purpose of the settings feature is to make the application dynamic. Instead of hardcoding plate sizes, colors, or prices, they are managed in the database. This allows administrators to easily add or change options without requiring a new code deployment.
*   **Activation/Deactivation:** Deactivating a setting (like a plate size) should not delete it. It should simply hide it from being used in new creations. This maintains historical integrity for plates that were produced with that size in the past.
*   **Informational Content:** The "About" and "Help" pages are largely static but provide important information and resources to the end-users.

## 7. Recommendations and Best Practices

*   **Centralize Plate Configuration:** Instead of separate tables for sizes and colors, the `plate_types` table should be the central point of configuration. An admin would define a "Type" (e.g., "Private Vehicle Standard") and associate existing dimensions and colors with it. This is more robust and mirrors how plates are thought of in the real world. The production module would then just have a single "Select Plate Type" dropdown.
*   **Cache Settings:** Application settings and plate configurations do not change often. They are excellent candidates for caching (e.g., in Redis on the backend, and in the Redux store on the frontend). This prevents the application from querying the database for the same settings on every page load.
*   **RBAC:** Access to settings pages must be strictly controlled. Only high-level administrators should be able to change these values, as they have a system-wide impact.
*   **Audit Trail:** Every change made in the settings area (adding a color, changing a price, updating an app setting) must be recorded in the `audit_log`. This is critical for understanding when and why system behavior might have changed.
*   **Help Content Management:** For easier maintenance, the content for the "Help & Support" and "About" pages could be managed via a simple Content Management System (CMS) or stored in markdown files, rather than being hardcoded in React components.
*   **Feature Flags:** The `app_settings` table is a good place to implement feature flags. This allows admins to enable or disable new or experimental features for all users without a code deployment, providing a safe way to roll out changes.
