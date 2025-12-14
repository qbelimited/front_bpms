# Feature: Delivery Management

## 1. Overview

The Delivery Management feature orchestrates the process of getting finished license plates from storage into the hands of the end-user companies. It involves creating delivery manifests, assigning plates to a delivery, tracking the delivery status, and recording the final handover. This is a critical logistics feature that ensures plates reach their destination and that a clear record of the transfer of custody exists.

## 2. UI/UX (View)

*   **Delivery Page (`/delivery`):**
    *   The main page for this feature.
    *   A "Make Delivery" or "Create Delivery Manifest" button that opens a modal or navigates to a new page (`MakeDelivery.js`) to start a new delivery.
    *   A data table (`DeliveryTable.js`) listing all past and present deliveries, showing their status.

*   **Make Delivery Page/Modal (`MakeDelivery.js`):**
    *   A form to create a new delivery.
    *   **Select Company (`SelectCompany.js`):** A dropdown to choose the company that will receive the plates.
    *   **Select Plates:** A component to select plates from the inventory (`in_storage`). This should be a powerful search/filter interface allowing the user to find plates by batch, type, or serial number range.
    *   **Assign Driver/Vehicle:** Text fields or dropdowns to assign a delivery driver and vehicle.
    *   **Notes:** A text area for any special delivery instructions.
    *   A "Create Delivery" button.

*   **Update Delivery Status Component (`UpdateDeliveryStatus.js`):**
    *   This might be a modal or a section within a delivery's detail view.
    *   Allows a user to update the status of a delivery (e.g., from 'Ready for Dispatch' -> 'In Transit' -> 'Delivered').
    *   For the 'Delivered' status, it might include a field for "Received By" and a signature capture field.

## 3. Data Tables

*   **Deliveries Table (`DeliveryTable.js`):**
    *   **Columns:** Delivery ID, Destination Company, Date Created, Number of Plates, Status ('Pending', 'In Transit', 'Delivered', 'Cancelled'), Driver.
    *   **Actions:** "View Details," "Update Status," "Print Manifest."

## 4. Database Schema

*   **`deliveries` table:** A header table for each delivery.
    *   `id` (PK)
    *   `company_id` (FK to `companies`)
    *   `status` (VARCHAR, e.g., 'pending', 'in_transit', 'delivered', 'cancelled')
    *   `created_by` (FK to `users`)
    *   `dispatched_at` (TIMESTAMP, nullable)
    *   `delivered_at` (TIMESTAMP, nullable)
    *   `driver_name` (VARCHAR, nullable)
    *   `vehicle_number` (VARCHAR, nullable)
    *   `received_by` (VARCHAR, nullable)

*   **`delivery_items` table:** A line-item table linking plates to a delivery.
    *   `id` (PK)
    *   `delivery_id` (FK to `deliveries`)
    *   `plate_id` (FK to `plates`)

*   **`plates` table:** The status and ownership of the plate are updated.
    *   `status` is updated to `assigned_to_delivery`, then `delivered`.
    *   `company_id` is updated to the receiving company's ID upon successful delivery.
    *   `storage_location_id` is set to `NULL`.

## 5. Data Flow

1.  User clicks "Make Delivery" on the `/delivery` page.
2.  In the `MakeDelivery` form, the user selects a company and the plates to be delivered.
3.  On submission, a POST request is sent to `/api/deliveries`.
4.  The backend creates a new record in the `deliveries` table.
5.  The backend then loops through the provided plate IDs, creating a record for each in the `delivery_items` table and updating the `status` of each plate in the `plates` table to `assigned_to_delivery`. This must be a database transaction.
6.  The new delivery appears in the `DeliveryTable` with a 'Pending' status.
7.  A user (e.g., a dispatcher) updates the status to 'In Transit'. This sends a PUT request to `/api/deliveries/{delivery_id}` and updates the `dispatched_at` timestamp.
8.  Upon physical delivery, the driver or an admin updates the status to 'Delivered'.
9.  This final status update triggers a backend process to update the `status` of all associated plates to `delivered` and, critically, sets the `company_id` on each plate record.

## 6. Detailed Functionality (Hows and Whats)

*   **Delivery Manifest:** The system should be able to generate a printable delivery manifest for each delivery. This document would list all the plate numbers, the destination company, and have spaces for signatures.
*   **Plate Selection:** The process of selecting plates for a delivery must be robust. The UI must prevent the selection of plates that are not in storage or are already assigned to another delivery.
*   **Status Workflow:** The feature enforces a clear logistics workflow through its status transitions. Each status change marks a key step in the delivery process.

## 7. Recommendations and Best Practices

*   **Transactional Integrity:** Creating a delivery and updating the associated plates must be an atomic transaction. If updating a single plate fails, the entire delivery creation should be rolled back to prevent plates from being in a "limbo" state.
*   **Mobile-Friendly Interface:** Delivery drivers could benefit from a simple, mobile-friendly web interface. This would allow them to view their assigned deliveries, see delivery details, and update the status directly from their phones, including capturing a signature or photo as proof of delivery.
*   **Route Optimization (Future):** For operations with many daily deliveries, a future enhancement could be to integrate with a mapping service (like Google Maps API) to visualize delivery locations and even optimize delivery routes.
*   **Real-Time Tracking (Future):** If delivery vehicles are equipped with GPS trackers, their location could be integrated and displayed on a map for real-time tracking of deliveries 'In Transit'.
*   **Notifications:** The system should send automated notifications. For example, when a delivery is created, the receiving company could get an email notification with the details and an estimated delivery time.
*   **Audit Trail:** Every status change and action related to a delivery must be logged in the `audit_log` table. Who created the delivery? Who dispatched it? Who marked it as delivered? This is crucial for accountability.
*   **Security:** Only users with a 'Logistics' or 'Admin' role should be able to create and manage deliveries.
