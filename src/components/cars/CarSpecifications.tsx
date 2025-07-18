'use client';

import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface CarSpecificationsProps {
  car: any;
}

export function CarSpecifications({ car }: CarSpecificationsProps) {
  const specifications = [
    {
      title: 'Basic Information',
      items: [
        { label: 'Body Type', value: car.bodyType },
        { label: 'Doors', value: car.doors },
        { label: 'Seats', value: car.seats },
        { label: 'Color', value: car.color },
        { label: 'First Registration', value: car.firstRegistration.toLocaleDateString() },
        { label: 'Previous Owners', value: car.previousOwners },
      ],
    },
    {
      title: 'Technical Details',
      items: [
        { label: 'Power', value: `${car.power} kW` },
        { label: 'Displacement', value: `${car.displacement} cc` },
        { label: 'Fuel Type', value: car.fuelType },
        { label: 'Transmission', value: car.transmission },
        { label: 'Drive', value: car.drive },
      ],
    },
    {
      title: 'Performance',
      items: [
        { label: 'Acceleration (0-100 km/h)', value: car.acceleration ? `${car.acceleration}s` : 'N/A' },
        { label: 'Top Speed', value: car.topSpeed ? `${car.topSpeed} km/h` : 'N/A' },
        { label: 'Fuel Consumption (Combined)', value: car.fuelConsumptionCombined ? `${car.fuelConsumptionCombined} L/100km` : 'N/A' },
        { label: 'Fuel Consumption (Urban)', value: car.fuelConsumptionUrban ? `${car.fuelConsumptionUrban} L/100km` : 'N/A' },
        { label: 'Fuel Consumption (Extra Urban)', value: car.fuelConsumptionExtraUrban ? `${car.fuelConsumptionExtraUrban} L/100km` : 'N/A' },
        { label: 'CO2 Emissions', value: car.co2Emissions ? `${car.co2Emissions} g/km` : 'N/A' },
      ],
    },
    {
      title: 'Condition',
      items: [
        { label: 'Mileage', value: `${car.mileage.toLocaleString()} km` },
        { label: 'Warranty', value: car.hasWarranty ? 'Yes' : 'No' },
        { label: 'Service History', value: car.hasServiceHistory ? 'Yes' : 'No' },
      ],
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {specifications.map((section) => (
        <div key={section.title}>
          <h3 className="text-lg font-semibold text-[#333f48] mb-3">{section.title}</h3>
          <div className="space-y-2">
            {section.items.map((item) => (
              <div key={item.label} className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium text-[#333f48]">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
} 