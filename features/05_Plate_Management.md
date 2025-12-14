# Feature: Plate Management

## 1. Overview

The Plate Management feature is the central hub for overseeing all license plates within the BPMS. After plates are produced and embossed, this module allows users to view, search, and manage the entire inventory. It provides detailed information about each plate and serves as the primary interface for tracking a plate's lifecycle, from storage to assignment and beyond. This feature also handles the complexities of paired vs. single plates.

## 2. UI/UX (View)

*   **Manage Plate Page (`/manageplate`):**
    *   The main page for this feature, accessible from the sidebar.
    *   A prominent search bar allowing users to search for plates by plate number, serial number, RFID tag, or batch code.
    *   Advanced filtering options (e.g., filter by status, plate type, date range, company).
    *   A "Manage Plate" button that could open a modal (`ManagePlateModal.js`) for bulk actions or other management tasks.
    *   The main component is a comprehensive data table (`ManagePlateTable.js`) listing all plates in the system.

*   **Plate Details View:**
    *   Clicking on a plate in the table should either expand the row or navigate to a dedicated details page.
    *   This view would show all information about the plate, including its history (audit trail), its paired plate (if any), associated company, and current status.

## 3. Data Tables

*   **Manage Plates Table (`ManagePlateTable.js`):**
    *   This is a detailed and filterable table.
    *   **Columns:** Plate Number, Serial Number, Paired Plate No., RFID Tag ID, Plate Type, Status, Current Location (e.g., Warehouse, Company Name), Production Date, Company.
    *   **Actions:** Each row should have actions like "View Details," "Update Status," "Report Damaged," or "Assign to Delivery."

## 4. Database Schema

The database schema for this feature primarily relies on the `plates` table, but it joins with many others to provide a comprehensive view.

*   **`plates` table (Central Table):**
    *   `id` (PK)
    *   `plate_number` (VARCHAR, UNIQUE, NOT NULL, indexed)
    *   `serial_number` (VARCHAR, UNIQUE, NOT NULL, indexed)
    *   `pair_id` (UUID, nullable, indexed) - Links front and back plates.
    *   `position` (VARCHAR, e.g., 'front', 'back', 'single')
    *   `rfid_tag_id` (VARCHAR, UNIQUE, nullable, indexed)
    *   `status` (VARCHAR, indexed, e.g., 'in_storage', 'assigned_to_delivery', 'delivered', 'damaged', 'decommissioned')
    *   `plate_type_id` (FK to `plate_types`)
    *   `production_id` (FK to `productions`)
    *   `company_id` (FK to `companies`, nullable) - The company the plate is currently assigned to.
    *   `storage_location_id` (FK to `storage_locations`, nullable)

*   **Joined tables for display:** `productions`, `plate_types`, `companies`.

## 5. Data Flow

*   **Viewing Plates:**
    1.  User navigates to the `/manageplate` page.
    2.  The `ManagePlateTable.js` component mounts and sends a GET request to a `/api/plates` endpoint.
    3.  The backend service for this endpoint queries the `plates` table, performing joins with other tables to gather all necessary data. It should be paginated.
    4.  The backend returns a paginated list of plates.
    5.  The frontend displays the data in the table.

*   **Searching/Filtering:**
    1.  User types a search term or applies a filter.
    2.  A new GET request is sent to the `/api/plates` endpoint with query parameters (e.g., `/api/plates?search=ABC-123&status=in_storage`).
    3.  The backend modifies its database query to include `WHERE` clauses based on the search and filter parameters.
    4.  The filtered and paginated results are returned to the frontend.

*   **Updating Plate Status:**
    1.  User clicks "Report Damaged" on a specific plate.
    2.  A PUT or PATCH request is sent to `/api/plates/{plate_id}/status` with a payload like `{ "status": "damaged" }`.
    3.  The backend updates the record in the `plates` table.
    4.  The backend returns the updated plate object.
    5.  The frontend updates the specific row in the table with the new status.

## 6. Detailed Functionality (Hows and Whats)

*   **Search:** The search functionality needs to be powerful. It should query multiple fields (`plate_number`, `serial_number`, `rfid_tag_id`) for the given term.
*   **Paired Plate Logic:** When viewing a plate that is part of a pair, the UI should clearly indicate this and provide a direct link to view the other plate in the pair. The `pair_id` is crucial for this. If an action is performed on a pair (e.g., "Assign to Delivery"), the backend should update the status of both plates in the pair in a single transaction.
*   **Single Plate Logic:** The system must correctly identify and handle single plates (e.g., for motorcycles). They will not have a `pair_id` and should be displayed and managed as individual units.
*   **Plate Lifecycle:** This module is the primary interface for tracking and managing the plate's lifecycle. The `status` field is key, and this UI should provide the tools to transition a plate between its various states.

## 7. Recommendations and Best Practices

*   **Performance - Database:** The `plates` table will grow to be very large. It is critical that all columns used for searching and filtering (`plate_number`, `serial_number`, `rfid_tag_id`, `status`, `pair_id`, `company_id`) are indexed in the database.
*   **Performance - Search:** For very large datasets, consider using a dedicated search engine like Elasticsearch or OpenSearch. The backend would synchronize plate data to the search engine, which provides much faster and more advanced full-text search capabilities than a standard SQL database.
*   **UX - Advanced Search:** Implement a dedicated "Advanced Search" modal that allows users to build complex queries (e.g., "Show all 'Commercial' plates produced in 'May 2024' that are currently 'in_storage'").
*   **UX - Bulk Actions:** Users will often need to perform actions on many plates at once. The table should include checkboxes for each row and an "Actions" dropdown at the top to perform bulk updates (e.g., "Mark selected as damaged," "Assign selected to new location").
*   **Data Integrity:** All status updates should be transactional. When updating a pair of plates, both records must be updated successfully, or the transaction should be rolled back.
*   **Clear Status Indicators:** Use color-coding and clear text in the `status` column to make it easy for users to understand the state of a plate at a glance.
*   **Audit Trail Integration:** Every change made through the Plate Management interface (e.g., status update) must be recorded in the `audit_log` table. The "Plate Details" view should have a tab to show the complete history of that plate.
