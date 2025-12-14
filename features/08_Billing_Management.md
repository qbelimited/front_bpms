# Feature: Billing Management

## 1. Overview

The Billing Management feature handles the financial aspects of the BPMS. After plates are successfully delivered to a company, this module is used to generate invoices, track payment statuses, and manage billing records. It ensures that all services rendered (i.e., plates produced and delivered) are properly billed for, providing a clear financial overview and history.

## 2. UI/UX (View)

*   **Bills Page (`/bills`):**
    *   The main page for this feature, accessible from the sidebar.
    *   May include dashboard-like cards at the top showing key financial metrics like "Total Outstanding," "Total Paid (Last 30 days)," and "Overdue Invoices."
    *   A "Generate Invoice" button to open a modal or navigate to a new page for creating a new bill.
    *   A data table (`BIllsTable.js`) listing all invoices, with clear status indicators.

*   **Invoice Generation View:**
    *   A form for creating a new invoice.
    *   **Select Company:** A dropdown to choose the company to be billed.
    *   **Select Deliveries/Plates:** An interface to select delivered plates or entire deliveries that have not yet been invoiced. The system should show the corresponding items and calculate the total amount based on pre-defined prices.
    *   **Invoice Details:** Fields for Invoice Date, Due Date, and any additional notes.
    *   A "Generate and Send" button.

*   **Invoice Details View (`GetBillDetails.js`):**
    *   A view showing a single, generated invoice in a standard, printable format.
    *   Should include company details, a line-item breakdown of charges, total amount, payment status, and payment instructions.
    *   Buttons to "Mark as Paid," "Send Reminder," or "Download PDF."

## 3. Data Tables

*   **Bills Table (`BIllsTable.js`):**
    *   **Columns:** Invoice #, Company Name, Invoice Date, Due Date, Amount, Status ('Draft', 'Sent', 'Paid', 'Overdue', 'Cancelled').
    *   **Actions:** "View Details," "Update Status," "Send Reminder."

## 4. Database Schema

*   **`invoices` table:** A header table for each invoice.
    *   `id` (PK)
    *   `invoice_number` (VARCHAR, UNIQUE, NOT NULL)
    *   `company_id` (FK to `companies`)
    *   `status` (VARCHAR, e.g., 'draft', 'sent', 'paid', 'overdue')
    *   `total_amount` (DECIMAL, NOT NULL)
    *   `invoice_date` (DATE, NOT NULL)
    *   `due_date` (DATE, NOT NULL)
    *   `paid_at` (TIMESTAMP, nullable)
    *   `created_by` (FK to `users`)

*   **`invoice_items` table:** A line-item table connecting invoices to the specific plates or deliveries being billed.
    *   `id` (PK)
    *   `invoice_id` (FK to `invoices`)
    *   `plate_id` (FK to `plates`, nullable) - For billing per plate.
    *   `delivery_id` (FK to `deliveries`, nullable) - For billing per delivery.
    *   `description` (VARCHAR, NOT NULL)
    *   `unit_price` (DECIMAL, NOT NULL)
    *   `quantity` (INT, NOT NULL)
    *   `line_total` (DECIMAL, NOT NULL)

*   **`plates` table:**
    *   `is_billed` (BOOLEAN, default: false): A flag to prevent double-billing for the same plate.

*   **`plate_types` table:**
    *   `price` (DECIMAL): The price for each type of plate should be stored here to be used in invoice generation.

## 5. Data Flow

1.  A user with 'Finance' or 'Admin' role navigates to the `/bills` page and clicks "Generate Invoice".
2.  The user selects a company. The system then queries the `plates` table for all plates that have been `delivered` to that company but are not yet `is_billed`.
3.  The user selects the plates/deliveries to include in the invoice. The system calculates the `total_amount` based on the `price` from the `plate_types` table.
4.  User confirms the generation. A POST request is sent to `/api/invoices`.
5.  The backend, in a single transaction:
    *   Creates a new record in the `invoices` table.
    *   Creates corresponding records in the `invoice_items` table.
    *   Updates the `is_billed` flag to `true` for all included plates.
6.  The new invoice appears in the `BIllsTable.js`.
7.  When payment is received, a user clicks "Mark as Paid". A PUT request is sent to `/api/invoices/{invoice_id}/status` with `{ "status": "paid" }`.
8.  The backend updates the invoice `status` and sets the `paid_at` timestamp.

## 6. Detailed Functionality (Hows and Whats)

*   **Automated Invoice Generation:** The system should simplify invoice creation by automatically pulling in all unbilled, delivered plates for a selected company.
*   **Pricing Engine:** The price of each plate should be centrally managed, likely in the `plate_types` or a separate `pricing` table. The billing module reads from this to calculate totals.
*   **PDF Generation:** The system must be able to generate a professional, printable PDF version of each invoice. This is typically handled by a backend library (e.g., `puppeteer` or `pdflib`).
*   **Payment Tracking:** The feature's core function is to track the status of each invoice, providing a clear view of accounts receivable.

## 7. Recommendations and Best Practices

*   **Prevent Double-Billing:** The use of an `is_billed` flag on the `plates` table is a crucial control to prevent the same plate from being included on multiple invoices. This check must be enforced by the backend.
*   **Integration with Accounting Software (Future):** For a more advanced system, consider integrating with popular accounting software like QuickBooks or Xero. The BPMS could automatically create new invoices in the accounting system via its API.
*   **Automated Reminders:** The system should have a scheduled job that runs daily to check for overdue invoices. When an invoice is overdue, it could automatically send a reminder email to the company's billing contact.
*   **Flexible Pricing:** The pricing model might need to be more flexible than a single price on the `plate_types` table. A dedicated `pricing_rules` table could allow for company-specific discounts or date-based pricing changes.
*   **Security (RBAC):** Access to the billing module should be strictly limited to users with a 'Finance' or 'Admin' role. Other users should not be able to view or manipulate financial data.
*   **Audit Trail:** All actions in the billing module (invoice creation, status updates, reminders sent) must be captured in the `audit_log` table for financial auditing purposes.
*   **Data Integrity:** All database operations related to creating or updating invoices and the associated plates must be transactional to prevent data corruption.
