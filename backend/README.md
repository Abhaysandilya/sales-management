# Retail Sales Backend API

Backend API for the Retail Sales Management System.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Add sales data:
   - Download the dataset from the provided Google Drive link
   - Convert it to JSON format if needed
   - Place it as `backend/data/sales_data.json`

3. Start the server:
```bash
npm run dev
```

The API will run on `http://localhost:3001`

## API Endpoints

### GET /api/sales
Get paginated sales data with search, filters, sorting, and pagination.

**Query Parameters:**
- `search` (string): Search term for customer name or phone number
- `page` (number): Page number (default: 1)
- `pageSize` (number): Items per page (default: 10)
- `sortBy` (string): Sort field - 'date', 'quantity', or 'customerName' (default: 'date')
- `sortOrder` (string): 'asc' or 'desc' (default: 'desc')
- `regions` (array): Filter by customer regions
- `genders` (array): Filter by gender
- `categories` (array): Filter by product categories
- `tags` (array): Filter by tags
- `paymentMethods` (array): Filter by payment methods
- `ageMin` (number): Minimum age
- `ageMax` (number): Maximum age
- `dateStart` (string): Start date (YYYY-MM-DD)
- `dateEnd` (string): End date (YYYY-MM-DD)

**Response:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalItems": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

### GET /api/sales/filter-options
Get all available filter options.

**Response:**
```json
{
  "success": true,
  "regions": [...],
  "genders": [...],
  "categories": [...],
  "tags": [...],
  "paymentMethods": [...],
  "ageRange": { "min": 18, "max": 65 },
  "dateRange": { "min": "2023-01-01", "max": "2023-12-31" }
}
```

