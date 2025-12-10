import { useState } from 'react';
import '../styles/SearchBar.css';

function SearchBar({ value, onChange, placeholder }) {
  const [localValue, setLocalValue] = useState(value);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={localValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="search-input"
      />
      {localValue && (
        <button onClick={handleClear} className="search-clear" aria-label="Clear search">
          ×
        </button>
      )}
    </div>
  );
}

export default SearchBar;

