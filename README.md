# Retail Sales Management System

A full-stack application for managing and analyzing retail sales data with advanced search, filtering, sorting, and pagination capabilities. Built as part of the TruEstate assignment to demonstrate professional software engineering practices.

## Overview

The Retail Sales Management System provides a comprehensive interface for viewing and managing sales transactions. The system supports full-text search across customer information, multi-select filtering across various dimensions, flexible sorting options, and efficient pagination. The architecture follows clean code principles with clear separation of concerns between frontend and backend components.

## Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **ES Modules** - Modern JavaScript module system

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS3** - Styling

## Search Implementation Summary

The search functionality implements case-insensitive full-text search across two fields:
- **Customer Name**: Searches within customer names
- **Phone Number**: Searches within phone numbers

**Implementation Details:**
- Search is performed on the backend using string matching
- Case-insensitive comparison using `.toLowerCase()`
- Works in combination with filters, sorting, and pagination
- Real-time search as user types (debounced via React state)
- Empty search returns all results

**Backend**: `backend/src/services/sales.service.js` - `applySearch()` function
**Frontend**: `frontend/src/components/SearchBar.jsx` - Search input component

## Filter Implementation Summary

The system supports multi-select and range-based filtering across seven dimensions:

1. **Customer Region** - Multi-select checkbox filter
2. **Gender** - Multi-select checkbox filter
3. **Age Range** - Numeric range input (min/max)
4. **Product Category** - Multi-select checkbox filter
5. **Tags** - Multi-select checkbox filter (items must have at least one selected tag)
6. **Payment Method** - Multi-select checkbox filter
7. **Date Range** - Date picker range (start/end dates)

**Implementation Details:**
- Filters work independently and in combination
- All filters are applied sequentially using AND logic
- Filter state is preserved during search, sorting, and pagination
- Filter options are dynamically loaded from the dataset
- "Clear All" functionality resets all filters

**Backend**: `backend/src/services/sales.service.js` - `applyFilters()` function
**Frontend**: `frontend/src/components/FilterPanel.jsx` - Filter panel component

## Sorting Implementation Summary

The system supports sorting by three fields:

1. **Date** - Sort by transaction date (Newest First / Oldest First)
2. **Quantity** - Sort by product quantity (High to Low / Low to High)
3. **Customer Name** - Sort alphabetically (A-Z / Z-A)

**Implementation Details:**
- Default sort: Date (Newest First)
- Sorting preserves active search and filter states
- Numeric/date fields use numeric comparison
- String fields use locale-aware string comparison
- Sort order (ascending/descending) is configurable

**Backend**: `backend/src/services/sales.service.js` - `applySorting()` function
**Frontend**: `frontend/src/components/SortingDropdown.jsx` - Sort dropdown component

## Pagination Implementation Summary

Pagination divides results into pages of 10 items each with navigation controls.

**Implementation Details:**
- Fixed page size: 10 items per page
- Pagination metadata includes: current page, total pages, total items, hasNextPage, hasPreviousPage
- Previous/Next buttons for navigation
- Page number buttons for direct navigation (shows up to 5 page numbers)
- Pagination state is preserved during search, filter, and sort operations
- Page resets to 1 when search, filters, or sorting changes

**Backend**: `backend/src/services/sales.service.js` - `applyPagination()` function
**Frontend**: `frontend/src/components/PaginationControls.jsx` - Pagination component

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd trustate
```

2. **Install dependencies**
```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

3. **Add Sales Data**
   - Download the dataset from the provided Google Drive link
   - Convert the data to JSON format if needed (ensure it's an array of objects)
   - Place the file at `backend/data/sales_data.json`
   - The JSON should be an array of objects with the following fields:
     - Customer ID, Customer Name, Phone Number, Gender, Age, Customer Region, Customer Type
     - Product ID, Product Name, Brand, Product Category, Tags
     - Quantity, Price per Unit, Discount Percentage, Total Amount, Final Amount
     - Date, Payment Method, Order Status, Delivery Type
     - Store ID, Store Location, Salesperson ID, Employee Name

4. **Configure Environment Variables** (Optional)
   
   Backend (`backend/.env`):
   ```
   PORT=3001
   ```
   
   Frontend (`frontend/.env`):
   ```
   VITE_API_URL=http://localhost:3001/api
   ```

5. **Start the Application**

   **Option 1: Run separately**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

   **Option 2: Run with concurrently** (from root)
   ```bash
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Development

- Backend runs on port 3001 (configurable via PORT env variable)
- Frontend runs on port 3000
- Backend API is proxied through Vite dev server
- Hot module replacement enabled for both frontend and backend

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Start backend (production)
cd backend
npm start
```

## Project Structure

```
trustate/
├── backend/              # Backend API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── services/    # Business logic
│   │   ├── routes/      # API routes
│   │   ├── utils/       # Utility functions
│   │   └── index.js     # Entry point
│   ├── data/            # Data storage (not in repo)
│   ├── package.json
│   └── README.md
├── frontend/            # Frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   ├── styles/      # CSS styles
│   │   ├── App.jsx      # Main component
│   │   └── main.jsx     # Entry point
│   ├── public/
│   ├── package.json
│   └── README.md
├── docs/
│   └── architecture.md # Architecture documentation
├── package.json         # Root package.json
└── README.md           # This file
```

## API Endpoints

### GET /api/sales
Get paginated sales data with search, filters, sorting, and pagination.

**Query Parameters:**
- `search` - Search term (optional)
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10)
- `sortBy` - Sort field: 'date', 'quantity', 'customerName' (default: 'date')
- `sortOrder` - 'asc' or 'desc' (default: 'desc')
- `regions` - Array of regions to filter
- `genders` - Array of genders to filter
- `categories` - Array of categories to filter
- `tags` - Array of tags to filter
- `paymentMethods` - Array of payment methods to filter
- `ageMin` - Minimum age
- `ageMax` - Maximum age
- `dateStart` - Start date (YYYY-MM-DD)
- `dateEnd` - End date (YYYY-MM-DD)

### GET /api/sales/filter-options
Get all available filter options from the dataset.

## Notes

- The dataset file (`sales_data.json`) is not included in the repository and must be added manually
- All filtering, sorting, and search logic is implemented from scratch (no auto-generated tools)
- The codebase follows clean code principles with clear separation of concerns
- Edge cases are handled (empty results, invalid ranges, missing fields, etc.)

## License

This project is part of the TruEstate assignment submission.

