# Architecture Documentation

## Overview

The Retail Sales Management System is a full-stack application built with a clear separation between frontend and backend. The system provides advanced search, filtering, sorting, and pagination capabilities for managing retail sales data.

## Backend Architecture

### Technology Stack
- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js
- **Language**: JavaScript (ES6+)

### Folder Structure

```
backend/
├── src/
│   ├── controllers/     # Request handlers
│   │   └── sales.controller.js
│   ├── services/        # Business logic
│   │   └── sales.service.js
│   ├── routes/          # API route definitions
│   │   └── sales.routes.js
│   ├── utils/           # Utility functions
│   │   └── dataLoader.js
│   └── index.js         # Application entry point
├── data/                 # Data storage (not in repo)
│   └── sales_data.json
├── package.json
└── README.md
```

### Module Responsibilities

#### Controllers (`sales.controller.js`)
- Handle HTTP requests and responses
- Parse query parameters
- Validate input
- Call service layer functions
- Return formatted JSON responses
- Handle errors and return appropriate status codes

#### Services (`sales.service.js`)
- **applySearch**: Implements case-insensitive full-text search on customer name and phone number
- **applyFilters**: Applies multiple filter conditions (regions, genders, age range, categories, tags, payment methods, date range)
- **applySorting**: Sorts data by date, quantity, or customer name (ascending/descending)
- **applyPagination**: Divides data into pages with metadata (current page, total pages, etc.)
- **getFilterOptions**: Extracts unique values from dataset for filter dropdowns

#### Utils (`dataLoader.js`)
- Loads and caches sales data from JSON file
- Handles file reading errors gracefully
- Provides data caching for performance

#### Routes (`sales.routes.js`)
- Defines API endpoints
- Maps routes to controller functions
- `/api/sales` - Get paginated sales data
- `/api/sales/filter-options` - Get available filter options

### Data Flow

1. Client sends HTTP request with query parameters
2. Route handler receives request
3. Controller parses and validates parameters
4. Controller calls service functions in sequence:
   - Load data from cache/file
   - Apply search filter
   - Apply all active filters
   - Apply sorting
   - Apply pagination
5. Controller formats response with data and pagination metadata
6. Response sent to client

### API Design

**GET /api/sales**
- Query Parameters: search, page, pageSize, sortBy, sortOrder, filters
- Response: `{ success, data, pagination }`

**GET /api/sales/filter-options**
- Response: `{ success, regions, genders, categories, tags, paymentMethods, ageRange, dateRange }`

## Frontend Architecture

### Technology Stack
- **Framework**: React 18
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Routing**: React Router (if needed for future expansion)

### Folder Structure

```
frontend/
├── src/
│   ├── components/       # React components
│   │   ├── SearchBar.jsx
│   │   ├── FilterPanel.jsx
│   │   ├── SortingDropdown.jsx
│   │   ├── TransactionTable.jsx
│   │   └── PaginationControls.jsx
│   ├── services/         # API communication
│   │   └── api.js
│   ├── styles/           # CSS stylesheets
│   │   ├── index.css
│   │   ├── App.css
│   │   ├── SearchBar.css
│   │   ├── FilterPanel.css
│   │   ├── SortingDropdown.css
│   │   ├── TransactionTable.css
│   │   └── PaginationControls.css
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── public/
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

### Component Responsibilities

#### App.jsx
- Main application container
- Manages global state (search, filters, sorting, pagination)
- Coordinates data fetching
- Handles user interactions and state updates
- Renders all child components

#### SearchBar.jsx
- Displays search input field
- Handles search query input
- Provides clear button
- Calls parent onChange handler

#### FilterPanel.jsx
- Displays all filter options
- Handles multi-select checkboxes
- Handles range inputs (age, date)
- Manages filter state
- Provides "Clear All" functionality

#### SortingDropdown.jsx
- Displays sorting options dropdown
- Handles sort field and order selection
- Updates parent component state

#### TransactionTable.jsx
- Displays sales data in table format
- Formats currency values
- Formats dates
- Handles empty state
- Responsive table design

#### PaginationControls.jsx
- Displays pagination information
- Renders page number buttons
- Handles Previous/Next navigation
- Shows current page and total pages

#### Services (api.js)
- Centralized API communication
- Axios instance configuration
- Error handling
- Request/response transformation

### State Management

The application uses React's built-in state management:
- **Local State**: Component-specific state (e.g., input values)
- **Lifted State**: Shared state in App.jsx (search, filters, sorting, pagination)
- **Effect Hooks**: Trigger data fetching when state changes

### Data Flow

1. User interacts with UI component (search, filter, sort, pagination)
2. Component calls parent handler (App.jsx)
3. App.jsx updates state
4. useEffect hook detects state change
5. App.jsx calls API service with current parameters
6. API service makes HTTP request to backend
7. Backend processes request and returns data
8. App.jsx updates data state
9. Components re-render with new data

### UI/UX Design Principles

- **Clear Layout**: Search and sort at top, filters in panel, table below
- **Responsive Design**: Works on desktop and mobile devices
- **Loading States**: Shows loading indicator during data fetch
- **Error Handling**: Displays error messages gracefully
- **Empty States**: Shows helpful message when no data found
- **Accessibility**: Proper labels, ARIA attributes, keyboard navigation

## Integration

### Communication Protocol
- RESTful API over HTTP
- JSON request/response format
- CORS enabled for cross-origin requests

### Error Handling
- Backend: Try-catch blocks, error responses with status codes
- Frontend: Try-catch in async functions, error state display
- Network errors handled gracefully

### Performance Considerations
- Data caching in backend (in-memory cache)
- Pagination to limit data transfer
- Efficient filtering and sorting algorithms
- Lazy loading of filter options

## Deployment Considerations

### Backend
- Environment variables for configuration (PORT, etc.)
- Data file should be placed in `backend/data/` directory
- Production server should handle CORS appropriately

### Frontend
- Environment variable for API URL
- Build process creates optimized production bundle
- Static assets served via CDN or web server

## Future Enhancements

- Database integration (replace JSON file)
- Authentication and authorization
- Export functionality (CSV, PDF)
- Advanced analytics and reporting
- Real-time updates via WebSockets
- Caching strategies (Redis)
- Rate limiting
- Input validation and sanitization

