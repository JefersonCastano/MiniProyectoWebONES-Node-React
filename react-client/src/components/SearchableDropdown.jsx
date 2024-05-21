import React, { useState, useEffect } from 'react';

const SearchableDropdown = ({ options, value, setValue, disabled, keys }) => {
  const [searchItem, setSearchItem] = useState('');
  const [showOptions, setShowOptions] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  useEffect(() => {
    if(!value) setSearchItem('');
    if (value && value != -1) setSearchItem(getNameById(value));
  }, [value]);

  useEffect(() => {
    setFilteredOptions(
      options.filter(option => {
        const optionName = option[keys.name].toLowerCase();
        const searchWords = searchItem.toLowerCase().split(' ').filter(word => word !== '');

        return searchWords.every(word => optionName.includes(word));
      })
    );
  }, [searchItem, options]);

  const getNameById = (id) => {
    const option = options.find(option => option[keys.id] === id);
    return option ? option[keys.name] : '';
  };

  const handleSearch = (e) => {
    setValue(-1); 
    setSearchItem(e.target.value);
    setShowOptions(true);
  };

  const handleOptionClick = (option) => {
    setValue(option[keys.id]);
    setSearchItem(option[keys.name]);
    setShowOptions(false);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setShowOptions(false);
    }, 200);
  };

  return (
    <div className="position-relative" onBlur={handleBlur}>
      <input
        type="text"
        className="form-control"
        value={searchItem}
        onChange={handleSearch}
        onFocus={() => setShowOptions(true)}
        disabled={disabled}
        placeholder="Buscar..."
      />
      {showOptions && filteredOptions.length > 0 && (
        <div className="card fixed-height-card-dropdown position-absolute w-100 mt-1 zindex-dropdown" style={{ zIndex: 1050 }}>
          <ul className="list-group list-group-flush">
            {filteredOptions.map((option, index) => (
              <button key={index} className="list-group-item list-group-item-action searchable-dropdown-menu p-1" onClick={() => handleOptionClick(option)} >
                {option[keys.name]}
              </button>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchableDropdown;
