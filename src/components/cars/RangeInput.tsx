'use client';

import { useState, useEffect } from 'react';

interface RangeInputProps {
  min: number;
  max: number;
  step: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue: (value: number) => string;
}

export default function RangeInput({
  min,
  max,
  step,
  value,
  onChange,
  formatValue,
}: RangeInputProps) {
  const [localValue, setLocalValue] = useState<[number, number]>(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = (index: number, newValue: number) => {
    const updatedValue: [number, number] = [...localValue] as [number, number];
    updatedValue[index] = newValue;

    // Ensure min <= max
    if (index === 0 && newValue > localValue[1]) {
      updatedValue[1] = newValue;
    } else if (index === 1 && newValue < localValue[0]) {
      updatedValue[0] = newValue;
    }

    setLocalValue(updatedValue);
  };

  const handleBlur = () => {
    onChange(localValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-gray-500">
        <span>{formatValue(localValue[0])}</span>
        <span>{formatValue(localValue[1])}</span>
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
          <div className="h-1 w-full bg-gray-200 rounded">
            <div
              className="h-1 bg-[#ff4c0c] rounded"
              style={{
                width: `${((localValue[1] - localValue[0]) / (max - min)) * 100}%`,
                marginLeft: `${((localValue[0] - min) / (max - min)) * 100}%`,
              }}
            />
          </div>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[0]}
          onChange={(e) => handleChange(0, parseInt(e.target.value))}
          onBlur={handleBlur}
          className="absolute w-full h-1 opacity-0 cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={localValue[1]}
          onChange={(e) => handleChange(1, parseInt(e.target.value))}
          onBlur={handleBlur}
          className="absolute w-full h-1 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
} 