'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const makes = [
  'All Makes', 'Mercedes-Benz', 'BMW', 'Audi', 'Volkswagen', 'Skoda',
  'MINI', 'Ford', 'Porsche', 'Toyota', 'Opel'
];

const bodyTypes = [
  { name: 'Small Car', icon: '🚗' },
  { name: 'SUV & Pick-up', icon: '🚙' },
  { name: 'Van', icon: '🚐' },
  { name: 'Convertible', icon: '🚗' },
  { name: 'Van & Minibus', icon: '🚐' },
  { name: 'Sedan', icon: '🚗' },
  { name: 'Station Wagon', icon: '🚗' },
  { name: 'Coupe', icon: '🚗' }
];

const priceRanges = [
  '500 €', '1,000 €', '1,500 €', '2,000 €', '2,500 €', '3,000 €',
  '4,000 €', '5,000 €', '6,000 €', '7,000 €', '8,000 €', '9,000 €',
  '10,000 €', '12,500 €', '15,000 €', '17,500 €', '20,000 €', '25,000 €',
  '30,000 €', '40,000 €', '50,000 €', '75,000 €', '100,000 €'
];

const years = Array.from({ length: 2025 - 1900 + 1 }, (_, i) => 2025 - i);

export const CarSearch = () => {
  const router = useRouter();
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minYear, setMinYear] = useState('');
  const [selectedBodyType, setSelectedBodyType] = useState('');
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams();
    if (selectedMake) searchParams.append('make', selectedMake);
    if (selectedModel) searchParams.append('model', selectedModel);
    if (maxPrice) searchParams.append('maxPrice', maxPrice);
    if (minYear) searchParams.append('minYear', minYear);
    if (selectedBodyType) searchParams.append('bodyType', selectedBodyType);

    router.push(`/search?${searchParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <form onSubmit={handleSearch} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Make Selection */}
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700 mb-1">
              Make
            </label>
            <select
              id="make"
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff4c0c] focus:ring-[#ff4c0c] sm:text-sm"
            >
              {makes.map((make) => (
                <option key={make} value={make === 'All Makes' ? '' : make}>
                  {make}
                </option>
              ))}
            </select>
          </div>

          {/* Model Input */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 mb-1">
              Model
            </label>
            <input
              type="text"
              id="model"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              placeholder="All Models"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff4c0c] focus:ring-[#ff4c0c] sm:text-sm"
            />
          </div>

          {/* Price Selection */}
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Price up to
            </label>
            <select
              id="price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff4c0c] focus:ring-[#ff4c0c] sm:text-sm"
            >
              <option value="">No maximum</option>
              {priceRanges.map((price) => (
                <option key={price} value={price}>
                  {price}
                </option>
              ))}
            </select>
          </div>

          {/* First Registration From */}
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
              First Registration From
            </label>
            <select
              id="year"
              value={minYear}
              onChange={(e) => setMinYear(e.target.value)}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff4c0c] focus:ring-[#ff4c0c] sm:text-sm"
            >
              <option value="">Any year</option>
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Advanced Search Toggle */}
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
            className="text-[#ff4c0c] hover:text-[#e6430b] text-sm font-medium flex items-center"
          >
            {isAdvancedSearch ? '- Less' : '+ More'} search options
          </button>
        </div>

        {/* Advanced Search Options */}
        {isAdvancedSearch && (
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Body Type</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {bodyTypes.map((type) => (
                <button
                  key={type.name}
                  type="button"
                  onClick={() => setSelectedBodyType(type.name)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm ${
                    selectedBodyType === type.name
                      ? 'bg-[#ff4c0c] text-white'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="mr-2">{type.icon}</span>
                  {type.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="w-full bg-[#ff4c0c] text-white px-4 py-3 rounded-md text-sm font-medium hover:bg-[#e6430b] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff4c0c]"
          >
            Show Results
          </button>
        </div>
      </form>
    </div>
  );
}; 