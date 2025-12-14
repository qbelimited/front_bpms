# Feature: Audit Trail

## 1. Overview

The Audit Trail is a critical security and accountability feature that creates a chronological, immutable log of all significant actions performed within the BPMS application. Its purpose is to track "who did what, and when," providing transparency and allowing administrators to investigate incidents, troubleshoot issues, and ensure compliance with internal policies.

## 2. UI/UX (View)

*   **Audit Trail Page (`/audittrail`):**
    *   A dedicated page, likely accessible from the "Reports" or a top-level "Security" section in the sidebar.
    *   This page is not for general users and should only be visible and accessible to high-level administrators.
    *   The primary feature is a highly detailed, searchable, and filterable data table showing the audit logs.
    *   **Powerful Filtering:** This is the most important UI aspect. Admins must be able to filter the trail by:
        *   User (who performed the action).
        *   Action Type (e.g., 'create:plate', 'update:company').
        *   Target Entity (e.g., show all actions for 'Plate ID #555').
        *   Date Range.

*   **Log Detail View:**
    *   Clicking on a log entry should open a modal or an expanded view showing the full details of the change.
    *   This view should clearly and cleanly present the "Old Value" and "New Value" fields, highlighting the specific data that was changed.

## 3. Data Tables

*   **Audit Log Table:**
    *   **Columns:** Timestamp, User, Action, Entity Type, Entity ID, Details.
    *   **Details Column:** A "View Details" button that opens the detailed comparison view.

## 4. Database Schema

*   **`audit_log` table:** This is the dedicated, central table for the feature. It should be designed for high-volume writes.
    *   `id` (PK, BigInt/UUID)
    *   `user_id` (FK to `users`, nullable for system actions) - The user who performed the action.
    *   `action` (VARCHAR, NOT NULL) - A machine-readable action name (e.g., `USER_LOGIN`, `CREATE_DELIVERY`, `UPDATE_PLATE_STATUS`).
    *   `target_type` (VARCHAR, nullable) - The type of entity being changed (e.g., 'Plate', 'Company', 'User').
    *   `target_id` (VARCHAR, nullable, indexed) - The ID of the specific entity that was affected.
    *   `old_value` (JSON/TEXT, nullable) - A JSON representation of the object *before* the change.
    *   `new_value` (JSON/TEXT, nullable) - A JSON representation of the object *after* the change.
    *   `ip_address` (VARCHAR, nullable) - The IP address from which the request originated.
    *   `timestamp` (TIMESTAMP, NOT NULL, indexed) - The time the action occurred.

## 5. Data Flow

1.  A user performs a state-changing action (e.g., updates a company's status).
2.  The API request is sent to the backend (e.g., `PUT /api/companies/{id}/status`).
3.  **(Implementation):** A backend middleware, service decorator, or database trigger intercepts the action *before* the data is committed to the database.
4.  The interceptor records the user's ID, the action being performed, the target entity, the current state of the entity (`old_value`), and the proposed new state (`new_value`).
5.  The actual update to the `companies` table is performed.
6.  The audit log record is saved to the `audit_log` table. These two steps (5 and 6) should ideally be in the same database transaction.
7.  The API returns its normal response to the frontend.
8.  Separately, an admin can navigate to the `/audittrail` page.
9.  The frontend fetches data from a `/api/audit-log` endpoint, passing any filter criteria.
10. The backend queries the `audit_log` table and returns the results for display.

## 6. Detailed Functionality (Hows and Whats)

*   **Automatic Logging:** The audit trail should be an automatic, systemic function. Individual developers should not have to remember to write audit log entries. It should be handled by a lower-level, shared component in the backend architecture.
*   **Loggable Actions:** The system should log all "write" operations (Create, Update, Delete) and other significant events like 'Login', 'Logout', 'Failed Login Attempt', 'Report Exported'. It does not need to log simple "read" operations (viewing a page or a list).
*   **Data Snapshots:** Storing the full `old_value` and `new_value` as JSON is powerful. It allows for a complete reconstruction of the state of an object at any point in time and makes it easy to see exactly what changed.

## 7. Recommendations and Best Practices

*   **Implementation via Middleware:** The most maintainable way to implement an audit trail in a modern web backend is via middleware. The middleware can inspect the incoming request (URL, method, user) and the outgoing response to determine what action was taken and automatically log it. This decouples the audit logic from the business logic.
*   **Performance:** The `audit_log` table can grow extremely large.
    *   Ensure the `timestamp`, `user_id`, and `target_id` columns are indexed to keep filtering performance high.
    *   Consider partitioning the table by date (e.g., a new partition each month) to make managing old data easier.
    *   For very high-volume systems, consider writing logs to a dedicated, scalable logging service (like the ELK Stack - Elasticsearch, Logstash, Kibana) instead of the main transactional database to avoid performance impacts.
*   **Immutability:** The audit trail must be immutable. Users (even admins) should not be able to edit or delete log entries from the application's UI. Access to modify the `audit_log` table should be restricted at the database level.
*   **Security:** Access to the Audit Trail page itself must be restricted to the highest level of administrators. It contains sensitive information about all activities in the system.
*   **Contextual Links:** The UI should be helpful. If a log entry refers to "Plate ID #555," that ID should be a hyperlink that takes the admin directly to the details page for that plate.
*   **Human-Readable Diffs:** When displaying the `old_value` and `new_value`, don't just show two blocks of JSON. Use a library to generate a "diff" view that visually highlights the added, removed, or changed lines, making it much easier to spot the change.
