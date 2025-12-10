import { readSalesData } from '../utils/dataLoader.js';

/**
 * Apply search filter to sales data
 * @param {Array} data - Sales data array
 * @param {string} searchQuery - Search term
 * @returns {Array} Filtered data
 */
export function applySearch(data, searchQuery) {
  if (!searchQuery || searchQuery.trim() === '') {
    return data;
  }

  const query = searchQuery.toLowerCase().trim();
  
  return data.filter(item => {
    const customerName = (item['Customer Name'] || '').toLowerCase();
    const phoneNumber = (item['Phone Number'] || '').toLowerCase();
    
    return customerName.includes(query) || phoneNumber.includes(query);
  });
}

/**
 * Apply filters to sales data
 * @param {Array} data - Sales data array
 * @param {Object} filters - Filter object
 * @returns {Array} Filtered data
 */
export function applyFilters(data, filters) {
  let filtered = [...data];

  // Customer Region filter
  if (filters.regions && filters.regions.length > 0) {
    filtered = filtered.filter(item => 
      filters.regions.includes(item['Customer Region'])
    );
  }

  // Gender filter
  if (filters.genders && filters.genders.length > 0) {
    filtered = filtered.filter(item => 
      filters.genders.includes(item['Gender'])
    );
  }

  // Age Range filter
  if (filters.ageRange && (filters.ageRange.min !== undefined || filters.ageRange.max !== undefined)) {
    filtered = filtered.filter(item => {
      const age = parseInt(item['Age']) || 0;
      const min = filters.ageRange.min !== undefined ? parseInt(filters.ageRange.min) : 0;
      const max = filters.ageRange.max !== undefined ? parseInt(filters.ageRange.max) : Infinity;
      return age >= min && age <= max;
    });
  }

  // Product Category filter
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(item => 
      filters.categories.includes(item['Product Category'])
    );
  }

  // Tags filter (multi-select - item must have at least one of the selected tags)
  if (filters.tags && filters.tags.length > 0) {
    filtered = filtered.filter(item => {
      const itemTags = (item['Tags'] || '').split(',').map(tag => tag.trim());
      return filters.tags.some(tag => itemTags.includes(tag));
    });
  }

  // Payment Method filter
  if (filters.paymentMethods && filters.paymentMethods.length > 0) {
    filtered = filtered.filter(item => 
      filters.paymentMethods.includes(item['Payment Method'])
    );
  }

  // Date Range filter
  if (filters.dateRange && (filters.dateRange.start || filters.dateRange.end)) {
    filtered = filtered.filter(item => {
      const itemDate = new Date(item['Date']);
      if (isNaN(itemDate.getTime())) return false;
      
      if (filters.dateRange.start) {
        const startDate = new Date(filters.dateRange.start);
        if (itemDate < startDate) return false;
      }
      
      if (filters.dateRange.end) {
        const endDate = new Date(filters.dateRange.end);
        endDate.setHours(23, 59, 59, 999); // Include entire end date
        if (itemDate > endDate) return false;
      }
      
      return true;
    });
  }

  return filtered;
}

/**
 * Apply sorting to sales data
 * @param {Array} data - Sales data array
 * @param {string} sortBy - Sort field
 * @param {string} sortOrder - 'asc' or 'desc'
 * @returns {Array} Sorted data
 */
export function applySorting(data, sortBy, sortOrder = 'desc') {
  const sorted = [...data];
  
  sorted.sort((a, b) => {
    let aValue, bValue;

    switch (sortBy) {
      case 'date':
        aValue = new Date(a['Date']);
        bValue = new Date(b['Date']);
        break;
      case 'quantity':
        aValue = parseFloat(a['Quantity']) || 0;
        bValue = parseFloat(b['Quantity']) || 0;
        break;
      case 'customerName':
        aValue = (a['Customer Name'] || '').toLowerCase();
        bValue = (b['Customer Name'] || '').toLowerCase();
        break;
      default:
        return 0;
    }

    if (sortBy === 'date' || sortBy === 'quantity') {
      // Numeric/Date comparison
      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    } else {
      // String comparison
      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }
  });

  return sorted;
}

/**
 * Apply pagination to sales data
 * @param {Array} data - Sales data array
 * @param {number} page - Page number (1-indexed)
 * @param {number} pageSize - Items per page
 * @returns {Object} Paginated result with data and metadata
 */
export function applyPagination(data, page = 1, pageSize = 10) {
  const pageNum = Math.max(1, parseInt(page) || 1);
  const size = Math.max(1, parseInt(pageSize) || 10);
  
  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / size);
  const startIndex = (pageNum - 1) * size;
  const endIndex = startIndex + size;
  
  const paginatedData = data.slice(startIndex, endIndex);

  return {
    data: paginatedData,
    pagination: {
      currentPage: pageNum,
      pageSize: size,
      totalItems,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPreviousPage: pageNum > 1
    }
  };
}

/**
 * Get all unique filter options from sales data
 * @returns {Object} Filter options
 */
export async function getFilterOptions() {
  const data = await readSalesData();
  
  const regions = [...new Set(data.map(item => item['Customer Region']).filter(Boolean))].sort();
  const genders = [...new Set(data.map(item => item['Gender']).filter(Boolean))].sort();
  const categories = [...new Set(data.map(item => item['Product Category']).filter(Boolean))].sort();
  const paymentMethods = [...new Set(data.map(item => item['Payment Method']).filter(Boolean))].sort();
  
  // Extract all unique tags
  const allTags = new Set();
  data.forEach(item => {
    const tags = (item['Tags'] || '').split(',').map(tag => tag.trim()).filter(Boolean);
    tags.forEach(tag => allTags.add(tag));
  });
  const tags = [...allTags].sort();

  // Get age range
  const ages = data.map(item => parseInt(item['Age'])).filter(age => !isNaN(age));
  const ageRange = {
    min: ages.length > 0 ? Math.min(...ages) : 0,
    max: ages.length > 0 ? Math.max(...ages) : 100
  };

  // Get date range
  const dates = data
    .map(item => new Date(item['Date']))
    .filter(date => !isNaN(date.getTime()));
  
  const dateRange = {
    min: dates.length > 0 ? new Date(Math.min(...dates)).toISOString().split('T')[0] : null,
    max: dates.length > 0 ? new Date(Math.max(...dates)).toISOString().split('T')[0] : null
  };

  return {
    regions,
    genders,
    categories,
    tags,
    paymentMethods,
    ageRange,
    dateRange
  };
}

