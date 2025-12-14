# Feature: Company Management

## 1. Overview

The Company Management feature allows administrators of the BPMS to manage the portfolio of customer companies. This includes creating new company profiles, updating their information, and managing their status within the system (e.g., activating or deactivating them). This feature is essential for organizing customers, managing deliveries, and handling billing.

## 2. UI/UX (View)

*   **Company Management Page (`/companymanagement`):**
    *   The main page for this feature, accessible under the "Management" section of the sidebar.
    *   A prominent "Add New Company" button which opens the `CompanyCreateModal`.
    *   A data table (`CompanyManageTable.js`) listing all companies registered in the system.
    *   Search and filter capabilities for the table.

*   **Company Create Modal (`CompanyCreateModal.js`):**
    *   A modal form for adding a new company.
    *   Fields for: Company Name, Contact Person, Email Address, Phone Number, Physical Address, Billing Address.

*   **Company Update Modal (`CompanyUpdateModal.js`):**
    *   A similar modal to the creation one, but pre-filled with the existing company's data, allowing for edits.

*   **Activate/Deactivate Components (`ActivateCompany.js`, `DeactivateCompany.js`):**
    *   These are likely confirmation dialogs or buttons within the table. When a user clicks to activate or deactivate a company, a confirmation prompt appears before the action is executed.

## 3. Data Tables

*   **Company Management Table (`CompanyManageTable.js`):**
    *   **Columns:** Company Name, Contact Person, Email, Phone, Status ('Active' / 'Inactive').
    *   **Actions:** "Edit" (opens update modal), "Activate"/"Deactivate" (toggles the company's status), "View Details" (navigates to a company detail page).

## 4. Database Schema

*   **`companies` table:** The central table for this feature.
    *   `id` (PK)
    *   `name` (VARCHAR, NOT NULL)
    *   `contact_person` (VARCHAR, nullable)
    *   `email` (VARCHAR, UNIQUE, NOT NULL)
    *   `phone` (VARCHAR, nullable)
    *   `address` (TEXT, nullable)
    *   `billing_address` (TEXT, nullable)
    *   `status` (VARCHAR, e.g., 'active', 'inactive', 'pending_approval')
    *   `created_at` (TIMESTAMP)

## 5. Data Flow

*   **Creating a Company:**
    1.  User clicks "Add New Company" and fills out the `CompanyCreateModal`.
    2.  On submission, a POST request is sent to `/api/companies` with the new company's data.
    3.  The backend validates the data (e.g., ensuring email is unique) and creates a new record in the `companies` table.
    4.  The backend returns the newly created company object.
    5.  The frontend updates its state, adding the new company to the `CompanyManageTable` without a page reload.

*   **Updating a Company:**
    1.  User clicks "Edit" on a company in the table.
    2.  The `CompanyUpdateModal` opens, pre-filled with that company's data.
    3.  User makes changes and submits the form.
    4.  A PUT or PATCH request is sent to `/api/companies/{company_id}`.
    5.  The backend validates and updates the corresponding record.
    6.  The frontend updates the specific row in the table with the new data.

*   **Changing Company Status:**
    1.  User clicks "Deactivate" on an active company.
    2.  A confirmation dialog appears.
    3.  On confirmation, a PUT or PATCH request is sent to `/api/companies/{company_id}/status` with a payload like `{ "status": "inactive" }`.
    4.  The backend updates the status.
    5.  The UI reflects the new status, perhaps by graying out the row or changing the status badge.

## 6. Detailed Functionality (Hows and Whats)

*   **Status Management:** A company's status is critical. An 'inactive' company should not be selectable in the dropdowns for new deliveries or invoices. The backend must enforce these business rules.
*   **Company Profile:** The system should provide a detailed view for each company, showing not only its contact information but also its history, including all plates delivered, invoices, and associated users.

## 7. Recommendations and Best Practices

*   **Soft Deletes:** Instead of permanently deleting a company record (which could orphan historical data like invoices and deliveries), use a `status` field for deactivation (i.e., a soft delete). This maintains data integrity.
*   **Data Validation:** Ensure robust backend validation for all fields, especially for unique constraints on `email` and data formats for phone numbers.
*   **Company Hierarchy (Future):** For complex customers, consider allowing for a hierarchy, such as a parent company with multiple branches or departments, each with its own delivery address but sharing a single billing entity. This would require adding a `parent_company_id` (self-referencing FK) to the `companies` table.
*   **Audit Trail:** All changes to a company's record (creation, updates to any field, status changes) must be logged in the `audit_log` table. The company's detail view should have a "History" tab showing these logs.
*   **RBAC:** Only 'Admin' or 'Manager' roles should be able to create, update, or change the status of companies.
*   **UX - No Page Reload:** As with other features, all create, update, and delete operations should update the UI state via Redux/component state without requiring a full page refresh.
*   **Relationship Management:** The "Company Details" view should provide quick links to view all associated users, deliveries, and invoices, making it a true Customer Relationship Management (CRM) hub within the BPMS.
