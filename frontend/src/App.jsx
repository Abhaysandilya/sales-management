import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import TransactionTable from './components/TransactionTable';
import SortingDropdown from './components/SortingDropdown';
import PaginationControls from './components/PaginationControls';
import { fetchSalesData, fetchFilterOptions } from './services/api';
import './styles/App.css';

function App() {
  const [salesData, setSalesData] = useState([]);
  const [filterOptions, setFilterOptions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for search, filters, sorting, and pagination
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    regions: [],
    genders: [],
    categories: [],
    tags: [],
    paymentMethods: [],
    ageRange: { min: '', max: '' },
    dateRange: { start: '', end: '' }
  });
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState(null);

  const pageSize = 10;

  // Fetch filter options on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await fetchFilterOptions();
        setFilterOptions(options);
      } catch (err) {
        console.error('Error loading filter options:', err);
      }
    };
    loadFilterOptions();
  }, []);

  // Fetch sales data when any parameter changes
  useEffect(() => {
    const loadSalesData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params = {
          search: searchQuery,
          page: currentPage,
          pageSize: pageSize,
          sortBy: sortBy,
          sortOrder: sortOrder,
          ...buildFilterParams()
        };

        const response = await fetchSalesData(params);
        setSalesData(response.data);
        setPagination(response.pagination);
      } catch (err) {
        setError(err.message || 'Failed to load sales data');
        console.error('Error loading sales data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSalesData();
  }, [searchQuery, filters, sortBy, sortOrder, currentPage]);

  const buildFilterParams = () => {
    const params = {};
    
    if (filters.regions.length > 0) params.regions = filters.regions;
    if (filters.genders.length > 0) params.genders = filters.genders;
    if (filters.categories.length > 0) params.categories = filters.categories;
    if (filters.tags.length > 0) params.tags = filters.tags;
    if (filters.paymentMethods.length > 0) params.paymentMethods = filters.paymentMethods;
    if (filters.ageRange.min) params.ageMin = filters.ageRange.min;
    if (filters.ageRange.max) params.ageMax = filters.ageRange.max;
    if (filters.dateRange.start) params.dateStart = filters.dateRange.start;
    if (filters.dateRange.end) params.dateEnd = filters.dateRange.end;
    
    return params;
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'ageRange' || filterType === 'dateRange') {
        newFilters[filterType] = { ...newFilters[filterType], ...value };
      } else {
        newFilters[filterType] = value;
      }
      
      return newFilters;
    });
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleSortChange = (field, order) => {
    setSortBy(field);
    setSortOrder(order);
    setCurrentPage(1); // Reset to first page on sort change
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setFilters({
      regions: [],
      genders: [],
      categories: [],
      tags: [],
      paymentMethods: [],
      ageRange: { min: '', max: '' },
      dateRange: { start: '', end: '' }
    });
    setSearchQuery('');
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Retail Sales Management System</h1>
      </header>

      <main className="app-main">
        <div className="controls-section">
          <div className="search-sort-row">
            <SearchBar 
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by customer name or phone number..."
            />
            <SortingDropdown
              sortBy={sortBy}
              sortOrder={sortOrder}
              onChange={handleSortChange}
            />
          </div>

          <FilterPanel
            filters={filters}
            filterOptions={filterOptions}
            onChange={handleFilterChange}
            onClear={clearFilters}
          />
        </div>

        <div className="table-section">
          {loading && <div className="loading">Loading...</div>}
          {error && <div className="error">Error: {error}</div>}
          {!loading && !error && (
            <>
              <TransactionTable data={salesData} />
              {pagination && (
                <PaginationControls
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;

