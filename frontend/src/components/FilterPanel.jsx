import '../styles/FilterPanel.css';

function FilterPanel({ filters, filterOptions, onChange, onClear }) {
  if (!filterOptions) {
    return <div className="filter-panel loading">Loading filter options...</div>;
  }

  const handleMultiSelectChange = (filterType, value, checked) => {
    const currentValues = filters[filterType] || [];
    let newValues;
    
    if (checked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(item => item !== value);
    }
    
    onChange(filterType, newValues);
  };

  const handleRangeChange = (filterType, field, value) => {
    onChange(filterType, { [field]: value });
  };

  const hasActiveFilters = () => {
    return (
      filters.regions.length > 0 ||
      filters.genders.length > 0 ||
      filters.categories.length > 0 ||
      filters.tags.length > 0 ||
      filters.paymentMethods.length > 0 ||
      filters.ageRange.min !== '' ||
      filters.ageRange.max !== '' ||
      filters.dateRange.start !== '' ||
      filters.dateRange.end !== ''
    );
  };

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3>Filters</h3>
        {hasActiveFilters() && (
          <button onClick={onClear} className="clear-filters-btn">
            <span>✕</span>
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="filter-sections">
        {/* Customer Region */}
        <div className="filter-section">
          <label className="filter-label">Customer Region</label>
          <div className="filter-checkboxes">
            {filterOptions.regions.map(region => (
              <label key={region} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.regions.includes(region)}
                  onChange={(e) => handleMultiSelectChange('regions', region, e.target.checked)}
                />
                <span>{region}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Gender */}
        <div className="filter-section">
          <label className="filter-label">Gender</label>
          <div className="filter-checkboxes">
            {filterOptions.genders.map(gender => (
              <label key={gender} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.genders.includes(gender)}
                  onChange={(e) => handleMultiSelectChange('genders', gender, e.target.checked)}
                />
                <span>{gender}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Age Range */}
        <div className="filter-section">
          <label className="filter-label">Age Range</label>
          <div className="filter-range">
            <input
              type="number"
              placeholder={`Min (${filterOptions.ageRange.min})`}
              value={filters.ageRange.min}
              onChange={(e) => handleRangeChange('ageRange', 'min', e.target.value)}
              min={filterOptions.ageRange.min}
              max={filterOptions.ageRange.max}
            />
            <span>to</span>
            <input
              type="number"
              placeholder={`Max (${filterOptions.ageRange.max})`}
              value={filters.ageRange.max}
              onChange={(e) => handleRangeChange('ageRange', 'max', e.target.value)}
              min={filterOptions.ageRange.min}
              max={filterOptions.ageRange.max}
            />
          </div>
        </div>

        {/* Product Category */}
        <div className="filter-section">
          <label className="filter-label">Product Category</label>
          <div className="filter-checkboxes">
            {filterOptions.categories.map(category => (
              <label key={category} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={(e) => handleMultiSelectChange('categories', category, e.target.checked)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="filter-section">
          <label className="filter-label">Tags</label>
          <div className="filter-checkboxes">
            {filterOptions.tags.map(tag => (
              <label key={tag} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.tags.includes(tag)}
                  onChange={(e) => handleMultiSelectChange('tags', tag, e.target.checked)}
                />
                <span>{tag}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="filter-section">
          <label className="filter-label">Payment Method</label>
          <div className="filter-checkboxes">
            {filterOptions.paymentMethods.map(method => (
              <label key={method} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={filters.paymentMethods.includes(method)}
                  onChange={(e) => handleMultiSelectChange('paymentMethods', method, e.target.checked)}
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Date Range */}
        <div className="filter-section">
          <label className="filter-label">Date Range</label>
          <div className="filter-range">
            <input
              type="date"
              placeholder="Start Date"
              value={filters.dateRange.start}
              onChange={(e) => handleRangeChange('dateRange', 'start', e.target.value)}
              min={filterOptions.dateRange.min}
              max={filterOptions.dateRange.max}
            />
            <span>to</span>
            <input
              type="date"
              placeholder="End Date"
              value={filters.dateRange.end}
              onChange={(e) => handleRangeChange('dateRange', 'end', e.target.value)}
              min={filterOptions.dateRange.min}
              max={filterOptions.dateRange.max}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;

