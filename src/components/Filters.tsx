import React from 'react';
import type { CuisineType } from '../services/locations.service';
import './Filters.css';

const priceRanges = ['< 150K', '150K - 250K', '250K - 500K', '500K - 1000K', '> 1000K'];
const suitableFor = [
  'Tiệc/Hội nghị',
  'Hiện đại',
  'Truyền thống',
  'Sang trọng',
  'Cổ điển',
  'Thiên nhiên',
  'Sân vườn',
  'Ăn gia đình',
  'Hẹn hò',
  'Nhóm bạn',
];

interface FiltersProps {
  selectedPriceRange: string;
  selectedCuisine: string[];
  selectedSuitableFor: string[];
  onPriceRangeChange: (range: string) => void;
  onCuisineChange: (cuisineId: string) => void;
  onSuitableForChange: (item: string) => void;
  cuisineTypes?: CuisineType[];
}

const Filters: React.FC<FiltersProps> = ({
  selectedPriceRange,
  selectedCuisine,
  selectedSuitableFor,
  onPriceRangeChange,
  onCuisineChange,
  onSuitableForChange,
  cuisineTypes = [],
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
            <label key={cuisine.id} className="filter-checkbox">
              <input
                type="checkbox"
                checked={selectedCuisine.includes(cuisine.id)}
                onChange={() => onCuisineChange(cuisine.id)}
              />
              <span>{cuisine.name}</span>
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

