# Feature: RFID Management

## 1. Overview

The RFID Management feature integrates Radio-Frequency Identification (RFID) technology into the core of the BPMS. Each physical license plate is embedded with a unique RFID chip. This feature provides the functionality to associate these physical chips with their digital counterparts in the database, and to use RFID technology for fast, accurate, and secure plate identification throughout its lifecycle. It enhances security and streamlines logistical operations like inventory checks and verification.

## 2. UI/UX (View)

RFID management is not a single page but a set of functionalities integrated into other features.

*   **Plate Production / Embossing Modals:**
    *   An "Associate RFID" field. This would not be a standard text input.
    *   A button "Scan RFID Tag". When clicked, the UI would wait for input from a connected RFID reader.
    *   Once a tag is successfully scanned, the UI would display the `rfid_tag_id` and lock the field.

*   **Plate Management Page (`/manageplate`):**
    *   The main search bar should have a dedicated option or mode to "Search by RFID".
    *   In a mobile or handheld device interface, a "Scan" button could activate a connected RFID reader to instantly pull up a plate's details.

*   **Storage / Inventory Management Page (`/storage`):**
    *   A "Perform Stock Audit" button. This would open an interface that uses a handheld RFID reader to rapidly scan all plates in a given location. The UI would then compare the scanned tags against the database records for that location and highlight any discrepancies (e.g., missing plates, or plates that shouldn't be there).

## 3. Data Tables

This feature does not have its own UI data tables. It adds data to and enhances the functionality of other tables.

*   **Manage Plates Table:** A column for "RFID Tag ID" should be present.

## 4. Database Schema

*   **`plates` table:**
    *   `rfid_tag_id` (VARCHAR, UNIQUE, NOT NULL, indexed): This new column is the core of the feature. It stores the unique serial number of the RFID chip. It must be unique as no two chips are the same.

## 5. Data Flow

*   **Associating an RFID Tag during Production:**
    1.  User is at the "Plate Production" or "Embossing" stage for a new plate.
    2.  User clicks the "Scan RFID Tag" button in the UI.
    3.  The UI listens for an event from the hardware integration layer (the RFID reader).
    4.  The user scans the physical RFID tag on the plate with the reader.
    5.  The reader hardware sends the `rfid_tag_id` to the browser/desktop application.
    6.  The `rfid_tag_id` is populated into the form field.
    7.  When the production form is submitted, the `rfid_tag_id` is included in the payload to the `/api/productions` or `/api/plates` endpoint and saved to the new plate's record in the database.

*   **Verifying a Plate via RFID:**
    1.  A user (e.g., a security officer with a handheld reader) scans a plate on a vehicle.
    2.  The handheld device's software reads the `rfid_tag_id`.
    3.  The device sends a GET request to a dedicated endpoint, e.g., `/api/plates/rfid/{rfid_tag_id}`.
    4.  The backend performs a fast, indexed lookup on the `plates` table for that `rfid_tag_id`.
    5.  The backend returns the full details of the plate and the vehicle it is assigned to.
    6.  The handheld device displays the result to the officer.

## 6. Detailed Functionality (Hows and Whats)

*   **Hardware Integration:** This is the most complex part of the feature. The web application needs to communicate with a physical RFID reader. This is not possible for a standard web browser directly. The solution is typically one of the following:
    *   **Browser Extension:** A custom browser extension that can communicate with native drivers for the RFID hardware.
    *   **Desktop Agent:** A small, lightweight application that runs on the user's computer, reads data from the RFID device (e.g., via USB), and communicates with the web application locally via a WebSocket or local HTTP server.
    *   **Dedicated Handhelds:** For mobile use cases, the BPMS would need a dedicated mobile app (Android/iOS) that uses the device's SDK to integrate with Bluetooth or USB RFID readers.
*   **Uniqueness Enforcement:** The `rfid_tag_id` must be unique in the database. The backend must reject any attempt to associate a tag that is already in use.

## 7. Recommendations and Best Practices

*   **Decouple Hardware Logic:** Use the **Anti-Corruption Layer (ACL)** pattern. The core BPMS application should not know the specifics of any particular RFID reader model. It should only interact with a generic `RFIDService`. The ACL (e.g., the desktop agent or browser extension) is responsible for translating the specific hardware's signals into a format the `RFIDService` understands. This allows you to switch RFID hardware vendors in the future without rewriting the main application.
*   **Security:** RFID tags can be cloned. While this is a hardware-level concern, the BPMS can help mitigate it.
    *   **Signed Tags:** More advanced RFID tags can hold a cryptographic signature. The verification process would involve checking this signature, not just the ID.
    *   **Multi-Factor Verification:** The system should encourage multi-factor verification. An RFID scan should be combined with a visual check of the plate number and other security features (like the QR code or hologram). The UI should present all these data points together for the user to confirm.
*   **UX - Seamless Scanning:** The scanning process should be as seamless as possible. The user should just have to click one button and scan the tag. The UI should give clear feedback ("Waiting for scan...", "Scan successful!", "Error: Tag already in use").
*   **Inventory Audits:** The ability to perform rapid inventory audits is a primary benefit of RFID. The "Stock Audit" feature is a must-have. It dramatically reduces the time and error rate compared to manual, visual stock checks.
*   **Graceful Failure:** What if the RFID reader is broken? The system should allow for a manual override where a user can type in the `rfid_tag_id` (it's often printed on the tag as well), but this action should require special permissions and be heavily audited.
