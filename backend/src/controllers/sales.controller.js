import { readSalesData } from '../utils/dataLoader.js';
import {
  applySearch,
  applyFilters,
  applySorting,
  applyPagination,
  getFilterOptions as getFilterOptionsService
} from '../services/sales.service.js';

/**
 * Get paginated sales data with search, filters, and sorting
 */
export async function getSales(req, res) {
  try {
    const {
      search = '',
      page = 1,
      pageSize = 10,
      sortBy = 'date',
      sortOrder = 'desc',
      ...filterParams
    } = req.query;

    // Read all sales data
    let data = await readSalesData();

    // Apply search
    data = applySearch(data, search);

    // Build filters object
    const filters = {};
    
    if (filterParams.regions) {
      filters.regions = Array.isArray(filterParams.regions) 
        ? filterParams.regions 
        : [filterParams.regions];
    }
    
    if (filterParams.genders) {
      filters.genders = Array.isArray(filterParams.genders)
        ? filterParams.genders
        : [filterParams.genders];
    }
    
    if (filterParams.categories) {
      filters.categories = Array.isArray(filterParams.categories)
        ? filterParams.categories
        : [filterParams.categories];
    }
    
    if (filterParams.tags) {
      filters.tags = Array.isArray(filterParams.tags)
        ? filterParams.tags
        : [filterParams.tags];
    }
    
    if (filterParams.paymentMethods) {
      filters.paymentMethods = Array.isArray(filterParams.paymentMethods)
        ? filterParams.paymentMethods
        : [filterParams.paymentMethods];
    }
    
    if (filterParams.ageMin || filterParams.ageMax) {
      filters.ageRange = {};
      if (filterParams.ageMin) filters.ageRange.min = filterParams.ageMin;
      if (filterParams.ageMax) filters.ageRange.max = filterParams.ageMax;
    }
    
    if (filterParams.dateStart || filterParams.dateEnd) {
      filters.dateRange = {};
      if (filterParams.dateStart) filters.dateRange.start = filterParams.dateStart;
      if (filterParams.dateEnd) filters.dateRange.end = filterParams.dateEnd;
    }

    // Apply filters
    data = applyFilters(data, filters);

    // Apply sorting
    data = applySorting(data, sortBy, sortOrder);

    // Apply pagination
    const result = applyPagination(data, parseInt(page), parseInt(pageSize));

    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error fetching sales:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching sales data',
      error: error.message
    });
  }
}

/**
 * Get available filter options
 */
export async function getFilterOptions(req, res) {
  try {
    const options = await getFilterOptionsService();
    res.json({
      success: true,
      ...options
    });
  } catch (error) {
    console.error('Error fetching filter options:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching filter options',
      error: error.message
    });
  }
}

