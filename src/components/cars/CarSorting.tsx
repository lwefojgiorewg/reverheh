import { useRouter, useSearchParams } from 'next/navigation';

const sortOptions = [
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'year_desc', label: 'Year: Newest First' },
  { value: 'year_asc', label: 'Year: Oldest First' },
  { value: 'mileage_asc', label: 'Mileage: Low to High' },
  { value: 'mileage_desc', label: 'Mileage: High to Low' },
  { value: 'created_desc', label: 'Newest Listings' },
];

export function CarSorting() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'created_desc';

  const handleSortChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', value);
    router.push(`/cars?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <label className="text-sm font-medium text-[#333f48]">Sort by:</label>
        <select
          value={currentSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="px-3 py-2 border rounded-md bg-white"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
} 