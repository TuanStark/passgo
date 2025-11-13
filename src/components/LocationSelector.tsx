import React, { useState, useEffect } from 'react';
import { locationsService, type City, type District } from '../services/locations.service';
import './LocationSelector.css';

interface LocationSelectorProps {
  selectedCity: string;
  selectedDistrict: string;
  onCityChange: (city: string) => void;
  onDistrictChange: (district: string) => void;
  cities?: City[];
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedCity,
  selectedDistrict,
  onCityChange,
  onDistrictChange,
  cities: citiesProp,
}) => {
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showDistrictDropdown, setShowDistrictDropdown] = useState(false);
  const [cities, setCities] = useState<City[]>(citiesProp || []);
  const [districts, setDistricts] = useState<District[]>([]);

  useEffect(() => {
    if (citiesProp) {
      setCities(citiesProp);
    } else {
      // Load cities if not provided
      locationsService.getCities().then(setCities).catch(console.error);
    }
  }, [citiesProp]);

  useEffect(() => {
    if (selectedCity) {
      locationsService.getDistricts(selectedCity).then(setDistricts).catch(console.error);
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  const currentCity = cities.find((c) => c.id === selectedCity);
  const selectedDistrictName = districts.find((district) => district.id === selectedDistrict)?.name;

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
            {selectedDistrictName || 'Chọn quận/huyện'}
            <span className="arrow">▼</span>
          </button>
          {showDistrictDropdown && (
            <div className="dropdown-menu">
            {districts.map((district) => (
              <div
                key={district.id}
                className="dropdown-item"
                onClick={() => {
                  onDistrictChange(district.id);
                  setShowDistrictDropdown(false);
                }}
              >
                {district.name}
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

