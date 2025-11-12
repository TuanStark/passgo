import React from 'react';
import { priceRanges, cuisineTypes, suitableFor } from '../data/mockData';
import './Filters.css';

interface FiltersProps {
  selectedPriceRange: string;
  selectedCuisine: string[];
  selectedSuitableFor: string[];
  onPriceRangeChange: (range: string) => void;
  onCuisineChange: (cuisine: string) => void;
  onSuitableForChange: (item: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedPriceRange,
  selectedCuisine,
  selectedSuitableFor,
  onPriceRangeChange,
  onCuisineChange,
  onSuitableForChange,
}) => {
  return (
    <div className="filters">
      <div className="filter-section">
        <h3 className="filter-title">Giá trung bình</h3>
        <div className="filter-options">
          {priceRanges.map((range) => (
            <label key={range} className="filter-checkbox">
              <input
                type="radio"
                name="priceRange"
                value={range}
                checked={selectedPriceRange === range}
                onChange={() => onPriceRangeChange(range)}
              />
              <span>{range}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Đồ ăn chính</h3>
        <div className="filter-options">
          {cuisineTypes.map((cuisine) => (
            <label key={cuisine} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedCuisine.includes(cuisine)}
                onChange={() => onCuisineChange(cuisine)}
              />
              <span>{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Phù hợp</h3>
        <div className="filter-options">
          {suitableFor.map((item) => (
            <label key={item} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedSuitableFor.includes(item)}
                onChange={() => onSuitableForChange(item)}
              />
              <span>{item}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;

