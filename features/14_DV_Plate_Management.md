# Feature: DV (Trade) Plate Management

## 1. Overview

The DV (Defective Vehicle / Trade) Plate Management feature is a specialized module for handling temporary license plates used by vehicle manufacturers, dealers, and testers. Unlike standard plates which are tied to a single vehicle for its life, DV plates are tied to a business and can be used on any vehicle in that business's inventory for a limited time. This feature manages the unique lifecycle of these temporary plates, including issuance, renewal, and tracking their assignment.

## 2. UI/UX (View)

*   **DV Plates Page (`/dv-plates` - new page recommended):**
    *   A dedicated page accessible from the main sidebar, possibly under "Number Plates".
    *   Dashboard cards showing key stats: "Total Active DV Plates," "Plates Expiring Soon," "Total Dealers."
    *   An "Issue New DV Plate" button.
    *   A data table listing all issued DV plates and their status.

*   **Issue New DV Plate Modal:**
    *   A form for issuing a new DV plate.
    *   **Select Dealer/Manufacturer:** A dropdown to select the company (e.g., a car dealership) that will receive the DV plate. This would be a filtered list from the main `companies` table (e.g., where `company_type` is 'Dealer').
    *   **Plate Type:** A dropdown for the specific DV plate type (if there are variations).
    *   **Issue Date:** Defaults to the current date.
    *   **Expiry Date:** Automatically calculated and displayed (e.g., Issue Date + 1 year).
    *   A button to "Confirm and Issue Plate".

*   **Renew DV Plate Modal:**
    *   Opened from an action on an existing DV plate.
    *   Shows the existing plate number and dealer.
    *   A field to set the new expiry date.
    *   A "Confirm Renewal" button.

## 3. Data Tables

*   **DV Plates Table:**
    *   **Columns:** DV Plate Number, Assigned Company (Dealer), Issue Date, Expiry Date, Status ('Active', 'Expired', 'Returned').
    *   **Actions:** "Renew," "Report Returned," "View History." The "Renew" action should be prominent for plates that are active or expiring soon.

## 4. Database Schema

*   **`plates` table:** DV plates can be stored in the main `plates` table, distinguished by their type.
    *   `plate_type_id` (FK): This would point to a "DV Plate" type in the `plate_types` table.
    *   `company_id` (FK): This would link to the dealer/manufacturer that holds the plate.
    *   `issue_date` (DATE): The date the plate was issued or last renewed.
    *   `expiry_date` (DATE, indexed): The date the plate is no longer valid.
    *   `status` (VARCHAR): The status would follow a different lifecycle (e.g., 'active', 'expired', 'returned').

*   **`companies` table:**
    *   `company_type` (VARCHAR, e.g., 'Dealer', 'Manufacturer', 'End-User'): A new column to distinguish dealers from regular customer companies.

*   **`dv_plate_usage_log` table (Recommended):** A log to track the temporary assignment of a DV plate to a specific vehicle.
    *   `id` (PK)
    *   `plate_id` (FK to the DV plate in the `plates` table)
    *   `vehicle_vin` (VARCHAR) - The VIN of the vehicle it's currently on.
    *   `vehicle_details` (TEXT) - Make, model of the vehicle.
    *   `assigned_at` (TIMESTAMP)
    *   `unassigned_at` (TIMESTAMP, nullable)
    *   `notes` (TEXT)

## 5. Data Flow

*   **Issuing a New DV Plate:**
    1.  Admin navigates to the DV Plates page and clicks "Issue New DV Plate".
    2.  They select the dealer and confirm the details.
    3.  A POST request is sent to `/api/dv-plates`.
    4.  The backend performs the following in a transaction:
        *   Creates a new plate record in the `plates` table with the appropriate `plate_type_id`.
        *   Sets the `issue_date` and `expiry_date`.
        *   Links it to the dealer via `company_id`.
        *   The plate number itself might follow a specific "DV" format.
    5.  The backend returns the new DV plate record.
    6.  The UI adds the new plate to the main DV plates table.

*   **Renewal Process:**
    1.  Admin clicks "Renew" on a plate that is nearing expiry.
    2.  A PUT request is sent to `/api/dv-plates/{plate_id}/renew`.
    3.  The backend updates the `expiry_date` for the plate record.
    4.  The change is logged in the `audit_log`.
    5.  The UI updates the expiry date in the table.

## 6. Detailed Functionality (Hows and Whats)

*   **Expiry Management:** The key functionality for DV plates is managing their expiry. The system needs to clearly show which plates are expiring soon.
*   **Dealer Association:** Unlike regular plates that are eventually tied to a single vehicle, DV plates are tied to a business entity (the dealer). The system must reflect this relationship.
*   **Usage Logging (Optional but Recommended):** While the BPMS might not need to track every single vehicle a DV plate is put on, providing the *ability* for a dealer to log this usage (via the `dv_plate_usage_log`) would be a powerful value-add feature.

## 7. Recommendations and Best Practices

*   **Automated Expiry Notifications:** Create a daily scheduled job on the backend. This job should query for all DV plates that will expire in the next 30 days (or a configurable period). For each expiring plate, the system should send an email notification to the assigned dealer and flag it in the UI.
*   **Dashboard Widget:** Add a widget to the main admin dashboard listing "DV Plates Expiring in 30 Days" to make this information highly visible.
*   **Clear Separation in UI:** While DV plates can be stored in the main `plates` table, they should be managed through a completely separate UI section to avoid confusion with standard vehicle plates. Their lifecycle and rules are fundamentally different.
*   **Strict Renewal Rules:** The backend should enforce rules around renewals. For example, it might not be possible to renew a plate that has already expired for more than 60 days.
*   **Audit Trail:** All lifecycle events for a DV plate (issuance, renewal, status changes) must be strictly audited. This is important for compliance and tracking.
*   **Reporting:** Create specific reports for DV Plates, such as "All Plates Issued to Dealer X" or "All Plates Expiring This Quarter."
