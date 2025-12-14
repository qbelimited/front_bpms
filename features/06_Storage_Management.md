# Feature: Storage & Inventory Management

## 1. Overview

The Storage & Inventory Management feature is responsible for tracking the location and status of license plates from the moment they are produced until they are assigned for delivery. It provides an inventory management system, allowing users to know exactly how many plates of each type are available and where they are located. This is crucial for operational efficiency and preventing loss.

## 2. UI/UX (View)

*   **Storage Page (`/storage`):**
    *   The main page for this feature.
    *   Could feature summary cards at the top (e.g., "Total Plates in Storage," "Number of Warehouses," "Stock Alert Count").
    *   A button to "Add New Storage Location" or "Transfer Stock," which would open a modal (`StorageModal.js`).
    *   A primary data table (`TableStorage.js`) that displays the inventory, likely summarized by plate type and location.

*   **Storage Modal (`StorageModal.js`):**
    *   This modal could serve multiple purposes depending on the action:
        *   **Adding a Location:** A simple form with "Location Name" and "Location Details".
        *   **Transferring Stock:** A more complex form to select plates (or batches) and a destination location, then confirm the transfer.

*   **Inventory Detail View:**
    *   The main table could be designed to be expandable. Clicking on a row (e.g., "Private Standard Plates - Main Warehouse") would show a more detailed breakdown, including a list of the specific batches or plates at that location.

## 3. Data Tables

*   **Storage Inventory Table (`TableStorage.js`):**
    *   This table should provide a summarized view of the inventory.
    *   **Columns:** Location, Plate Type, Quantity on Hand, Last Updated.
    *   **Actions:** "View Details," "Initiate Stock Transfer."

## 4. Database Schema

*   **`storage_locations` table:** A new table to define physical or logical storage locations.
    *   `id` (PK)
    *   `name` (VARCHAR, UNIQUE, NOT NULL, e.g., 'Main Warehouse', 'Accra Distribution Center')
    *   `address` (TEXT, nullable)
    *   `is_active` (BOOLEAN, NOT NULL, default: true)

*   **`plates` table:** This table is updated to reflect inventory status.
    *   `storage_location_id` (FK to `storage_locations`, nullable): The current location of the plate when it's in storage. This would be `NULL` if the plate is assigned or delivered.
    *   `status` (VARCHAR): The status would be `in_storage` for plates tracked by this feature.

*   **`inventory_movements` table (Recommended):** A ledger-style table to track all movements for better auditing.
    *   `id` (PK)
    *   `plate_id` (FK to `plates`)
    *   `from_location_id` (FK to `storage_locations`, nullable)
    *   `to_location_id` (FK to `storage_locations`, nullable)
    *   `moved_by` (FK to `users`)
    *   `moved_at` (TIMESTAMP)
    *   `reason` (VARCHAR, e.g., 'Post-Production', 'Stock Transfer', 'Pre-Delivery')

## 5. Data Flow

*   **Receiving Plates from Production:**
    1.  After a plate is successfully embossed, its status is updated to `in_storage`.
    2.  Its `storage_location_id` is set to a default post-production location (e.g., 'Embossing Area').
    3.  This automatically makes it part of the inventory.

*   **Transferring Stock:**
    1.  User initiates a stock transfer from the `/storage` page.
    2.  User selects the plates to move and the destination location in the `StorageModal`.
    3.  A POST request is sent to a `/api/inventory/transfer` endpoint with the plate IDs and the new location ID.
    4.  The backend, within a transaction, updates the `storage_location_id` for all specified plates.
    5.  For auditing, it creates a record in the `inventory_movements` table for each plate moved.
    6.  The backend returns a success message.
    7.  The UI updates to reflect the new quantities in the respective locations.

## 6. Detailed Functionality (Hows and Whats)

*   **Inventory Tracking:** The core of this feature is accurately tracking the `storage_location_id` for every plate with a status of `in_storage`. The main view is an aggregation of this data.
*   **Stock Alerts:** The system should be configurable to set low-stock thresholds for different plate types. When the quantity of a specific plate type at a location falls below its threshold, a notification should be generated for relevant users.
*   **Location Management:** Administrators should be able to add, edit, and deactivate storage locations. Deactivating a location should only be possible if its inventory is zero.

## 7. Recommendations and Best Practices

*   **Use a Ledger Table:** The recommended `inventory_movements` table is a best practice. It provides a full, immutable history of every plate's movement, which is invaluable for auditing and tracking down discrepancies. Simply updating the `storage_location_id` on the `plates` table tells you where a plate is now, but not where it has been.
*   **Transactional Integrity:** All inventory movements, especially transfers, must be transactional. If a multi-plate transfer fails halfway through, the entire operation should be rolled back to prevent an inconsistent state.
*   **Barcode/RFID for Transfers:** To make stock transfers faster and more accurate, integrate with handheld barcode or RFID scanners. A user could simply scan the plates and then scan a barcode for the destination location to trigger the transfer via a mobile-friendly interface or dedicated app.
*   **Dashboard Integration:** Key metrics from the inventory system, like low-stock alerts or total inventory value, should be displayed as widgets on the main Dashboard.
*   **Clear UI:** The UI must make it very clear where plates are. The `TableStorage.js` should be easy to read and provide a quick overview, with the ability to drill down into specifics.
*   **Permissions:** Access to inventory management functions should be controlled by RBAC. Not all users should be able to transfer stock or add new locations.
