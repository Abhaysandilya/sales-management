# Retail Sales Frontend

Frontend application for the Retail Sales Management System built with React and Vite.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The application will run on `http://localhost:3000`

## Build

To build for production:
```bash
npm run build
```

## Features

- **Search**: Full-text search across customer names and phone numbers
- **Filters**: Multi-select filters for regions, genders, categories, tags, payment methods, age range, and date range
- **Sorting**: Sort by date, quantity, or customer name
- **Pagination**: Navigate through results with 10 items per page
- **Responsive Design**: Works on desktop and mobile devices

## Environment Variables

Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:3001/api
```

