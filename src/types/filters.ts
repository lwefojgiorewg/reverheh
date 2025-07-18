export interface CarFilter {
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  minMileage?: number;
  maxMileage?: number;
  bodyType?: string;
  make?: string;
  model?: string;
  fuelType?: string;
  transmission?: string;
}

export interface PaginationResponse {
  total: number;
  pages: number;
  page: number;
  limit: number;
}

export interface CarListResponse {
  cars: Car[];
  pagination: PaginationResponse;
}

export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  description?: string;
  bodyType: string;
  doors: number;
  seats: number;
  color: string;
  firstRegistration: Date;
  power: number;
  displacement: number;
  fuelType: string;
  transmission: string;
  drive: string;
  acceleration?: number;
  topSpeed?: number;
  fuelConsumptionCombined?: number;
  fuelConsumptionUrban?: number;
  fuelConsumptionExtraUrban?: number;
  co2Emissions?: number;
  previousOwners: number;
  hasWarranty: boolean;
  hasServiceHistory: boolean;
  createdAt: Date;
  updatedAt: Date;
  images: CarImage[];
  seller: Seller;
}

export interface CarImage {
  id: string;
  url: string;
  alt?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Seller {
  id: string;
  name?: string;
  image?: string;
  email?: string;
  createdAt?: Date;
} 