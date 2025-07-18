'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import RangeInput from './RangeInput';

interface CarFiltersProps {
  makes: string[];
  bodyTypes: string[];
  fuelTypes: string[];
  transmissions: string[];
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function CarFilters({
  makes,
  bodyTypes,
  fuelTypes,
  transmissions,
  searchParams,
}: CarFiltersProps) {
  const router = useRouter();
  const params = useSearchParams();

  const updateFilter = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(params.toString());
    if (value === null) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    router.push(`/cars?${newParams.toString()}`);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Filters</h2>

      <div className="space-y-4">
        {/* Price Range */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-[#ff4c0c] focus-visible:ring-opacity-75">
                <span>Price Range</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2">
                <RangeInput
                  min={0}
                  max={200000}
                  step={1000}
                  value={[
                    parseInt(params.get('minPrice') || '0'),
                    parseInt(params.get('maxPrice') || '200000'),
                  ]}
                  onChange={([min, max]) => {
                    updateFilter('minPrice', min.toString());
                    updateFilter('maxPrice', max.toString());
                  }}
                  formatValue={(value) => `€${value.toLocaleString()}`}
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Make */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-[#ff4c0c] focus-visible:ring-opacity-75">
                <span>Make</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2">
                <select
                  value={params.get('make') || ''}
                  onChange={(e) => updateFilter('make', e.target.value || null)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff4c0c] focus:ring-[#ff4c0c]"
                >
                  <option value="">All Makes</option>
                  {makes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Body Type */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-[#ff4c0c] focus-visible:ring-opacity-75">
                <span>Body Type</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2">
                <div className="space-y-2">
                  {bodyTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="radio"
                        name="bodyType"
                        value={type}
                        checked={params.get('bodyType') === type}
                        onChange={(e) => updateFilter('bodyType', e.target.value)}
                        className="h-4 w-4 text-[#ff4c0c] focus:ring-[#ff4c0c] border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-900">{type}</span>
                    </label>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Year Range */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-[#ff4c0c] focus-visible:ring-opacity-75">
                <span>Year Range</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2">
                <RangeInput
                  min={1990}
                  max={new Date().getFullYear()}
                  step={1}
                  value={[
                    parseInt(params.get('minYear') || '1990'),
                    parseInt(params.get('maxYear') || new Date().getFullYear().toString()),
                  ]}
                  onChange={([min, max]) => {
                    updateFilter('minYear', min.toString());
                    updateFilter('maxYear', max.toString());
                  }}
                  formatValue={(value) => value.toString()}
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Mileage Range */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-[#ff4c0c] focus-visible:ring-opacity-75">
                <span>Mileage Range</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2">
                <RangeInput
                  min={0}
                  max={300000}
                  step={5000}
                  value={[
                    parseInt(params.get('minMileage') || '0'),
                    parseInt(params.get('maxMileage') || '300000'),
                  ]}
                  onChange={([min, max]) => {
                    updateFilter('minMileage', min.toString());
                    updateFilter('maxMileage', max.toString());
                  }}
                  formatValue={(value) => `${value.toLocaleString()} km`}
                />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Fuel Type */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-[#ff4c0c] focus-visible:ring-opacity-75">
                <span>Fuel Type</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2">
                <select
                  value={params.get('fuelType') || ''}
                  onChange={(e) => updateFilter('fuelType', e.target.value || null)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff4c0c] focus:ring-[#ff4c0c]"
                >
                  <option value="">All Fuel Types</option>
                  {fuelTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        {/* Transmission */}
        <Disclosure defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex w-full justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-[#ff4c0c] focus-visible:ring-opacity-75">
                <span>Transmission</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2">
                <select
                  value={params.get('transmission') || ''}
                  onChange={(e) => updateFilter('transmission', e.target.value || null)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-[#ff4c0c] focus:ring-[#ff4c0c]"
                >
                  <option value="">All Transmissions</option>
                  {transmissions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
} 