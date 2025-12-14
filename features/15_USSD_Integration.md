# Feature: USSD Integration for Public Plate Search

## 1. Overview

The USSD Integration feature provides a public-facing verification service, allowing law enforcement, officials, or the general public to quickly verify the validity of a license plate using a simple USSD mobile menu. This feature exposes a secure, fast, and concise API endpoint designed specifically to be consumed by a third-party USSD gateway provider. It adds a significant public trust and security component to the BPMS ecosystem.

## 2. UI/UX (View)

The UI for this feature is not a graphical web interface within the BPMS application itself. The UI is the text-based menu that the end-user interacts with on their mobile phone. The BPMS API's design directly influences what is possible in this menu.

*   **Example USSD Interaction Flow:**
    1.  User dials `*XXX#`.
    2.  USSD Gateway shows menu: `Welcome to Plate Verification. 1. Verify Plate.`
    3.  User enters `1`.
    4.  USSD Gateway prompts: `Please enter the plate number:`
    5.  User enters `AS 1234-22`.
    6.  The USSD Gateway sends this number to the BPMS API.
    7.  The BPMS API responds with a concise string.
    8.  USSD Gateway displays the result: `Plate: AS 1234-22. Vehicle: Toyota Corolla. Status: Valid. Registered: 2022.`

## 3. Data Tables

This feature does not have its own UI data tables. It is a service that provides data to an external system.

## 4. Database Schema

This feature is a read-only service that primarily queries the `plates` table and its related tables. No new schema is required, but the performance of the queries is paramount.

*   **`plates` table:** The query will search this table by `plate_number`.
    *   `plate_number` (VARCHAR, **heavily indexed** for performance).
*   **Joined tables:** The query will likely join with `plate_types`, `companies`, and potentially a `vehicles` table (if one exists) to retrieve the required information (e.g., Vehicle Make/Model).

## 5. Data Flow

1.  An end-user interacts with a USSD menu on their phone.
2.  A third-party USSD Gateway provider receives the plate number from the user.
3.  The USSD Gateway's server makes a server-to-server HTTP POST request to a dedicated, public BPMS API endpoint (e.g., `POST /api/public/v1/ussd/plate-search`).
4.  The request contains the plate number and an authentication token/API key in its headers.
5.  The BPMS backend receives the request. It first authenticates the request to ensure it's from a trusted USSD partner. It then applies rate limiting.
6.  The backend performs a highly optimized query against the `plates` table using the provided plate number.
7.  The backend formats the result into a simple, concise JSON object.
8.  The BPMS API returns the JSON response to the USSD Gateway. Example: `{ "status": "OK", "data": "Vehicle: Toyota Corolla. Status: Valid. Registered: 2022." }`.
9.  The USSD Gateway's server parses this JSON and displays the content of the `data` field to the end-user on their phone screen.

## 6. Detailed Functionality (Hows and Whats)

*   **Public API Endpoint:** The core of this feature is a new, hardened API endpoint that is separate from the internal APIs used by the React frontend.
*   **Concise Data Response:** The API must be designed to return a very short, human-readable string. The USSD protocol has limitations on character count, and the user experience requires a simple, clear message. The logic for constructing this string (e.g., "Vehicle: [Make]. Status: [Status].") resides in the backend.
*   **Authentication & Authorization:** This endpoint must be protected. It should not be open to the public internet without authentication. It should require an API key or a similar token-based mechanism that is shared with the trusted USSD partner.

## 7. Recommendations and Best Practices

*   **Security - Rate Limiting:** This is the most critical recommendation. An open endpoint for searching plates is a target for abuse (e.g., data scraping). Implement strict rate limiting based on the source IP address and/or the API key to prevent an attacker from brute-forcing plate numbers and harvesting data.
*   **Security - Partner-Specific Keys:** Issue a unique API key to each USSD partner. This allows you to track usage per partner and revoke a specific key if it is compromised, without affecting other partners.
*   **Performance - Query Optimization:** The database query for the plate search must be extremely fast. The `plate_number` column must have a unique index. The query should be a simple lookup and avoid complex joins where possible. If joins are needed, ensure all foreign keys are indexed.
*   **Performance - Caching:** Consider caching the results for frequently searched plate numbers (with a short TTL, e.g., 5 minutes) to reduce database load and improve response times.
*   **API Versioning:** The API endpoint should be versioned (e.g., `/v1/`) so that future changes can be introduced without breaking the integration for existing partners.
*   **Logging:** Log every single request made to this public endpoint, including the search query, the source IP, the API key used, and the result. This is crucial for monitoring usage, detecting abuse, and troubleshooting.
*   **Data Privacy:** Be mindful of the data you return. The response should be useful but should not expose sensitive personal information. For example, return "Vehicle: Toyota Corolla" but not "Owner: John Smith".
