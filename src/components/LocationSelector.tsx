import React, { useState } from 'react';
import { cities } from '../data/mockData';
import './LocationSelector.css';

interface LocationSelectorProps {
  selectedCity: string;
  selectedDistrict: string;
  onCityChange: (city: string) => void;
  onDistrictChange: (district: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedCity,
  selectedDistrict,
  onCityChange,
  onDistrictChange,
}) => {
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);

  const currentCity = cities.find((c) => c.id === selectedCity);
  const districts = currentCity?.districts || [];

  return (
    <div className="location-selector">
      <div className="location-dropdown">
        <button
          className="location-btn"
          onClick={() => setShowCityDropdown(!showCityDropdown)}
        >
          {currentCity?.name || 'Chọn thành phố'}
          <span className="arrow">▼</span>
        </button>
        {showCityDropdown && (
          <div className="dropdown-menu">
            {cities.map((city) => (
              <div
                key={city.id}
                className="dropdown-item"
                onClick={() => {
                  onCityChange(city.id);
                  setShowCityDropdown(false);
                  onDistrictChange('');
                }}
              >
                {city.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {currentCity && (
        <div className="location-dropdown">
          <button
            className="location-btn"
            onClick={() => setShowDistrictDropdown(!showDistrictDropdown)}
          >
            {selectedDistrict || 'Chọn quận/huyện'}
            <span className="arrow">▼</span>
          </button>
          {showDistrictDropdown && (
            <div className="dropdown-menu">
              {districts.map((district) => (
                <div
                  key={district}
                  className="dropdown-item"
                  onClick={() => {
                    onDistrictChange(district);
                    setShowDistrictDropdown(false);
                  }}
                >
                  {district}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSelector;

