# Feature: Dashboard

## 1. Overview

The Dashboard is the main landing page for authenticated users. It provides a high-level, at-a-glance overview of the key metrics and activities within the BPMS application. Its purpose is to give users a quick snapshot of the system's status and recent activities, enabling them to identify trends and important information without digging deep into individual modules.

## 2. UI/UX (View)

The main dashboard is composed of a series of widgets or cards, each displaying a specific piece of information, primarily through charts.

*   **Main Layout (`/dashboard`):** A grid-based layout that organizes the various chart components. It is rendered within the main content area of the `MiniDrawer` layout.
*   **Plate Production Chart (`PlateProducedChart.js`):**
    *   A bar chart visualizing the number of plates produced over a specific period (e.g., daily, weekly).
    *   It should have clear labels for the axes (e.g., "Date" and "Quantity Produced").
*   **Plate Size Chart (`PlateSizeChart.js`):**
    *   A pie chart or donut chart showing the distribution of plates produced by size (e.g., standard, motorcycle).
    *   Each slice should be clearly labeled with the dimension and the percentage of the total.
*   **Plate Color Chart (`PlateColorChart.js`):**
    *   A pie chart or donut chart showing the distribution of plates produced by color.
    *   Each slice should be clearly labeled with the color name and the percentage of the total.
*   **User Activity Component (`UserActivity.js`):**
    *   This could be a feed or a list showing recent significant actions taken by users within the system (e.g., "User X started production batch #123", "User Y delivered 50 plates to Company Z").
    *   This could also be a chart showing user activity over time.

## 3. Data Tables

There are no primary data tables on the dashboard itself, as it focuses on graphical representation. The "User Activity" component may resemble a simplified, non-interactive table or list.

## 4. Database Schema

The dashboard does not have its own tables. Instead, it reads aggregated data from other tables in the database. The data is sourced from:

*   **`productions` table:** The `PlateProducedChart` aggregates data from this table, likely grouping by `manufacture_date`.
*   **`plates` table:** The `PlateSizeChart` and `PlateColorChart` aggregate data from this table, grouping by `dimension` and `color` respectively.
*   **`audit_log` table:** The `UserActivity` feed would read from this table to get a stream of recent user actions.

## 5. Data Flow

1.  User logs in and navigates to the `/dashboard` route.
2.  The `DashboardMain.js` component mounts.
3.  Each chart component (`PlateProducedChart`, `PlateSizeChart`, etc.) fires off an asynchronous request via `get-services.js` to a dedicated API endpoint for its data (e.g., `/api/dashboard/production-summary`, `/api/dashboard/size-distribution`).
4.  The backend services for these endpoints perform the necessary database aggregation queries (e.g., `COUNT(*) ... GROUP BY ...`).
5.  The backend returns the summarized data in a format suitable for the charting libraries.
6.  The chart components receive the data and render the visualizations.

## 6. Detailed Functionality (Hows and Whats)

*   **Data Aggregation:** The backend is responsible for all data aggregation. The frontend should receive simple, pre-packaged data sets ready for charting to keep the client-side logic minimal.
*   **Charting Libraries:** The application uses `Chart.js` and `Recharts` to render the charts. These libraries take data and configuration objects to create interactive and visually appealing charts.
*   **Date/Time Filtering:** The dashboard should ideally have a global filter to change the date range for the displayed data (e.g., "Last 7 days," "Last 30 days," "This Month"). This is a recommended enhancement.

## 7. Recommendations and Best Practices

*   **Performance - Backend:** Dashboard queries can be heavy as they aggregate large amounts of data. These queries must be highly optimized. For very large datasets, consider creating pre-aggregated summary tables in the database that are updated periodically (e.g., every hour) to make dashboard loading near-instantaneous.
*   **Performance - Frontend:** Use lazy loading for chart components to ensure the main dashboard shell loads quickly, with the charts appearing as their data becomes available.
*   **UX - Customization:** As recommended in the main review, a powerful enhancement would be to allow users to customize their dashboards. Users could add, remove, and rearrange widgets to create a view that is most relevant to their role and needs.
*   **UX - Interactivity:** The charts should be interactive. For example, clicking on a slice in the "Plate Size" pie chart could navigate the user to the "Manage Plates" page, pre-filtered to show only plates of that size.
*   **Data Freshness:** The dashboard should indicate how fresh the data is (e.g., "Last updated: 2 minutes ago"). For real-time monitoring, consider using WebSockets to push live updates to the dashboard components, though this adds significant complexity.
*   **Role-Based Dashboards:** The information displayed on the dashboard could be customized based on the user's role. A manager might see financial summaries, while a production supervisor might see production queue lengths and machine statuses.
