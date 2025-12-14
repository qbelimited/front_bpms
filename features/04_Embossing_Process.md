# Feature: Embossing Process

## 1. Overview

The Embossing Process feature manages the physical stamping of license plates. This feature is the bridge between digital plate records created during production and the physical, embossed plates ready for use. It involves selecting plates that are "in production," sending them to an embossing machine, and tracking the completion of this stage.

## 2. UI/UX (View)

*   **Embossing Process Page (`/embossing`):**
    *   The main page for this feature, accessible from the sidebar.
    *   A primary button to "Start Embossing" or "Select Plates for Embossing", which would open the `EmbosingModal`.
    *   A data table (`EmbrossingTable.js`) that shows the queue of plates to be embossed and the status of ongoing embossing jobs.

*   **Embossing Modal (`EmbosingModal.js`):**
    *   A modal for creating a new embossing job.
    *   **Select Plate(s) (`selectPlate.js`):** A crucial component within the modal. This should be a searchable, filterable list or dropdown allowing the user to select one or more plates (or plate pairs) from the inventory that have a status of 'in_production' or 'ready_for_embossing'.
    *   **Select Embosser/Machine:** A dropdown to select the target embossing machine if there are multiple machines available.
    *   A "Send to Embosser" button to initiate the process.

## 3. Data Tables

*   **Embossing Queue Table (`EmbrossingTable.js`):**
    *   **Columns:** Job ID, Plate Number(s), Batch Code, Date Created, Target Machine, Status (e.g., 'Queued', 'In Progress', 'Completed', 'Failed').
    *   **Actions:** Could include actions like "Cancel Job," "Retry Failed Job," or "View Logs."

## 4. Database Schema

*   **`plates` table:** The `status` column in this table is central to the embossing process.
    *   `status` (VARCHAR): The status will transition, for example, from `in_production` -> `queued_for_embossing` -> `embossing_in_progress` -> `embossed` (or `in_storage`).

*   **`embossing_jobs` table:** A new table is recommended to manage the communication with the embossing machine(s).
    *   `id` (PK)
    *   `plate_id` (FK to `plates` table)
    *   `machine_id` (VARCHAR, identifier for the physical machine)
    *   `status` (VARCHAR, e.g., 'queued', 'sent', 'completed', 'failed')
    *   `job_payload` (JSON) - The data sent to the machine.
    *   `machine_response` (JSON, nullable) - The response received from the machine.
    *   `created_by` (FK to `users` table)
    *   `created_at` (TIMESTAMP)
    *   `completed_at` (TIMESTAMP, nullable)

## 5. Data Flow

1.  User clicks "Select Plates for Embossing" on the `/embossing` page.
2.  The `EmbosingModal` opens.
3.  User selects one or more plates and the target machine.
4.  User clicks "Send to Embosser".
5.  The frontend sends a POST request to a `/api/embossing-jobs` endpoint with the selected plate IDs and machine ID.
6.  The backend creates a new record in the `embossing_jobs` table with a status of 'queued'. It also updates the status of the selected plates in the `plates` table to `queued_for_embossing`.
7.  **(Asynchronous Process):** A separate backend worker picks up the 'queued' job.
8.  The worker formats a `job_payload` and sends it to the selected Embossing Machine's API. The job status is updated to 'sent'.
9.  The physical embossing machine performs its task.
10. Upon completion, the Embossing Machine sends a callback to a dedicated BPMS endpoint (e.g., `/api/embossing-jobs/callback/{job_id}`).
11. The callback handler in the BPMS validates the request and updates the `embossing_jobs` record to 'completed' or 'failed', storing the machine's response.
12. The status of the corresponding plate in the `plates` table is updated to `embossed` (or `in_storage`).
13. The UI on the `/embossing` page updates in real-time (via WebSockets or polling) to reflect the new job status.

## 6. Detailed Functionality (Hows and Whats)

*   **Plate Selection:** The `selectPlate.js` component is critical. It must present a user-friendly way to find plates that are ready for embossing. It should not show plates that are already embossed, assigned, or otherwise unavailable.
*   **API Integration:** The feature's backend is heavily dependent on the API provided by the intelligent embossing machine. The implementation must be built around the specifics of that API's contract (endpoints, authentication, payload format).
*   **Status Tracking:** The system must provide clear, real-time status updates. A user should be able to see if a job is queued, running, or has failed without needing to refresh the page.

## 7. Recommendations and Best Practices

*   **Architectural - API Integration:** This is a prime candidate for the **Anti-Corruption Layer (ACL)** and **Asynchronous Communication** patterns mentioned in the main review.
    *   **ACL:** Create a dedicated service in the backend (e.g., `EmbossingMachineService`) that is the only part of the system aware of the machine's specific API. This service will translate requests from the BPMS into the machine's format and translate responses back.
    *   **Message Queues:** Use a message queue to decouple the API call from the user's action. When the user clicks "Send to Embosser," the system should just publish a 'start embossing job' message to a queue. This provides an instant response to the user, and a separate worker can handle the actual communication with the machine, including retries.
*   **Real-Time UI Updates:** Use WebSockets to push status updates from the backend to the frontend. When the machine callback updates a job's status in the database, a WebSocket event should be broadcast, and the `EmbrossingTable.js` component should listen for this event to update its state without polling.
*   **Error Handling and Retries:** The integration must be resilient to machine failures or network issues. If a job fails, the system should log the error from the machine's response and allow a user to retry the job. The asynchronous worker should have a built-in retry mechanism with exponential backoff for transient network errors.
*   **Logging:** All communication with the embossing machine (both outgoing requests and incoming callbacks) must be logged in detail. This is essential for troubleshooting issues with the physical hardware or the integration itself.
*   **Security:** The callback endpoint (`/api/embossing-jobs/callback/{job_id}`) must be secured. The embossing machine should be required to send a secret token or use mTLS authentication to prevent unauthorized status updates.
