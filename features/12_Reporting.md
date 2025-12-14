# Feature: Reporting Module

## 1. Overview

The Reporting Module is a critical business intelligence feature within the BPMS. Its purpose is to aggregate raw operational data into a series of structured, easy-to-understand reports. This allows managers and administrators to track key performance indicators (KPIs), analyze trends, monitor efficiency, and make informed business decisions. This feature transforms transactional data into strategic insights.

## 2. UI/UX (View)

*   **Main Reports Page (`/reports` - as per sidebar):**
    *   A central landing page for all reporting functions.
    *   Should display a list or grid of available reports (e.g., "Production Report," "Inventory Report").
    *   Each item in the list should navigate to a dedicated view for that specific report.

*   **Report View (Generic Template):**
    *   Each specific report page should have a consistent layout.
    *   **Filters:** A prominent filtering section at the top. Common filters would include: Date Range (start and end date), Company, Plate Type, Status, User.
    *   **"Generate Report" button:** After setting filters, the user clicks this to run the report.
    *   **Data Visualization:** The report should display data in a hybrid format - a graphical chart (bar, line, or pie chart) at the top to visualize the trend, and a detailed data table below with the specific numbers.
    *   **"Export" button:** A crucial action to export the report data as a CSV or PDF file for offline analysis or archiving.

## 3. Data Tables

Each report will have its own detailed data table.

*   **Production Report Table:**
    *   Columns: Date, Batch Code, Plate Type, Quantity Produced, Created By.
*   **Inventory Report Table:**
    *   Columns: Location, Plate Type, Quantity on Hand, Average Age (days in storage).
*   **Delivery Report Table:**
    *   Columns: Delivery ID, Company, Dispatch Date, Delivered Date, Number of Plates, Status.
*   **Financial Report Table:**
    *   Columns: Invoice #, Company, Invoice Date, Paid Date, Amount, Status.
*   **User Activity Report Table:**
    *   Columns: User, Date, Number of Actions, Breakdown of Action Types (e.g., Productions Started, Deliveries Created).

## 4. Database Schema

The reporting module does not introduce new tables but rather performs complex read-only queries on existing tables.

*   **Primary Source Tables:** `productions`, `plates`, `deliveries`, `invoices`, `companies`, `audit_log`, `inventory_movements`.
*   **Recommendation - Materialized Views/Summary Tables:** For performance, it is highly recommended to create pre-aggregated summary tables or materialized views in the database. For example, a `daily_production_summary` table could be updated by a scheduled job every night. When a user runs a production report, the query would hit this small summary table instead of aggregating millions of rows from the `plates` table, making the report generation significantly faster.

## 5. Data Flow

1.  User navigates to the Reports page and selects the "Production Report".
2.  The user selects a date range and other filters, then clicks "Generate Report".
3.  The frontend sends a GET request to a dedicated reporting endpoint, e.g., `/api/reports/production`, with the filter criteria as query parameters.
4.  The backend reporting service receives the request and builds a complex SQL query based on the filters.
5.  The query is executed against the operational database or, preferably, a read-replica or summary tables.
6.  The backend processes the query result, formatting it into two parts: a dataset for the chart and a dataset for the detailed table.
7.  The backend returns the formatted data as a single JSON object.
8.  The frontend receives the data and populates both the chart and the data table.
9.  If the user clicks "Export," a similar API request is made, but with an `Accept` header or query parameter specifying the format (e.g., `?format=csv`). The backend would then format the data as a CSV file and return it with the appropriate `Content-Disposition` header to trigger a download.

## 6. Detailed Functionality (Hows and Whats)

*   **Filtering:** The filtering logic is key. The backend must be able to dynamically add `WHERE` clauses to the report queries based on the user's input.
*   **Data Aggregation:** All calculations (counts, sums, averages) should be performed by the database on the backend for maximum efficiency.
*   **Exporting:** The backend needs to handle the transformation of query results into different formats (CSV, PDF). For PDF exports, a library like `puppeteer` can be used to render the report page in a headless browser and save it as a PDF.

## 7. Recommendations and Best Practices

*   **Performance - Use Read Replicas:** Reporting queries can be long-running and resource-intensive. To prevent them from slowing down the main application, they should be run against a read-replica of the production database.
*   **Performance - Asynchronous Generation:** For extremely large or complex reports, consider an asynchronous approach. The user would request a report, and the system would respond with "Your report is being generated and will be available in the 'My Reports' section shortly." A background worker would then generate the report and notify the user (e.g., via email or an in-app notification) when it's ready for download.
*   **Data Security:** Access to reports, especially financial ones, must be strictly controlled via RBAC. A user should only be able to see data they are permissioned for (e.g., a company manager might only be able to run reports for their own company).
*   **Saved Reports:** Allow users to save a set of filters as a "Saved Report." This would enable them to quickly run the same weekly or monthly report with a single click.
*   **Visualization:** Choose the right visualization for the data. Line charts are good for trends over time, bar charts for comparisons, and pie charts for composition.
*   **Clear Labeling:** Ensure all reports, charts, and table columns are clearly labeled. A report is useless if the user cannot understand what the data represents.
