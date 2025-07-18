import { Header } from '@/components/layout/Header';
import { CarSearch } from '@/components/search/CarSearch';
import Image from 'next/image';
import Link from 'next/link';

const popularBodyTypes = [
  { name: 'Small Car', image: '/body-types/small-car.svg' },
  { name: 'SUV & Off-road', image: '/body-types/suv.svg' },
  { name: 'Van', image: '/body-types/van.svg' },
  { name: 'Convertible', image: '/body-types/convertible.svg' },
  { name: 'Van & Minibus', image: '/body-types/minibus.svg' },
  { name: 'Sedan', image: '/body-types/sedan.svg' },
  { name: 'Station Wagon', image: '/body-types/wagon.svg' },
  { name: 'Coupe', image: '/body-types/coupe.svg' }
];

const mostSearched = [
  {
    title: 'BMW 3 Series',
    price: 35000,
    year: 2020,
    mileage: 25000,
    location: 'Munich',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop'
  },
  {
    title: 'Audi A4',
    price: 32000,
    year: 2019,
    mileage: 35000,
    location: 'Stuttgart',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop'
  },
  {
    title: 'Mercedes C-Class',
    price: 42000,
    year: 2021,
    mileage: 18000,
    location: 'Berlin',
    image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop'
  }
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-gray-50 to-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Find Your Perfect Car
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Browse thousands of cars from trusted dealers and private sellers
            </p>
            <CarSearch />
          </div>
        </div>
      </div>

      {/* Body Types Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Search by Body Type
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {popularBodyTypes.map((type) => (
              <Link
                key={type.name}
                href={`/cars?bodyType=${type.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex flex-col items-center p-6 border border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="w-16 h-16 mb-4 flex items-center justify-center bg-gray-100 rounded-lg group-hover:bg-orange-50 transition-colors">
                  <div className="w-8 h-8 bg-orange-500 rounded"></div>
                </div>
                <span className="text-sm font-medium text-gray-700 text-center group-hover:text-orange-600 transition-colors">
                  {type.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Most Searched Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Most Searched Cars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mostSearched.map((car) => (
              <Link
                key={car.title}
                href={`/cars/${car.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={car.image}
                    alt={car.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {car.title}
                  </h3>
                  <div className="text-2xl font-bold text-orange-600 mb-3">
                    €{car.price.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">
                    {car.year} • {car.mileage.toLocaleString()} km • {car.location}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Why Choose AutoScout24
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Largest Selection
              </h3>
              <p className="text-gray-600">
                Access millions of new and used cars from certified dealers and private sellers.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Safe Purchase
              </h3>
              <p className="text-gray-600">
                Buy with confidence with our secure platform and buyer protection.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Expert Support
              </h3>
              <p className="text-gray-600">
                Get expert advice and support throughout your car buying journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Popular Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Makes</h4>
              <ul className="space-y-3">
                <li><Link href="/cars?make=bmw" className="text-gray-600 hover:text-orange-600 transition-colors">BMW</Link></li>
                <li><Link href="/cars?make=audi" className="text-gray-600 hover:text-orange-600 transition-colors">Audi</Link></li>
                <li><Link href="/cars?make=mercedes" className="text-gray-600 hover:text-orange-600 transition-colors">Mercedes-Benz</Link></li>
                <li><Link href="/cars?make=volkswagen" className="text-gray-600 hover:text-orange-600 transition-colors">Volkswagen</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Body Types</h4>
              <ul className="space-y-3">
                <li><Link href="/cars?bodyType=suv" className="text-gray-600 hover:text-orange-600 transition-colors">SUV</Link></li>
                <li><Link href="/cars?bodyType=sedan" className="text-gray-600 hover:text-orange-600 transition-colors">Sedan</Link></li>
                <li><Link href="/cars?bodyType=wagon" className="text-gray-600 hover:text-orange-600 transition-colors">Station Wagon</Link></li>
                <li><Link href="/cars?bodyType=coupe" className="text-gray-600 hover:text-orange-600 transition-colors">Coupe</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Popular Searches</h4>
              <ul className="space-y-3">
                <li><Link href="/cars?fuelType=electric" className="text-gray-600 hover:text-orange-600 transition-colors">Electric Cars</Link></li>
                <li><Link href="/cars?fuelType=hybrid" className="text-gray-600 hover:text-orange-600 transition-colors">Hybrid Cars</Link></li>
                <li><Link href="/cars?maxPrice=10000" className="text-gray-600 hover:text-orange-600 transition-colors">Cars under €10,000</Link></li>
                <li><Link href="/cars?minYear=2020" className="text-gray-600 hover:text-orange-600 transition-colors">New Cars</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Services</h4>
              <ul className="space-y-3">
                <li><Link href="/financing" className="text-gray-600 hover:text-orange-600 transition-colors">Car Financing</Link></li>
                <li><Link href="/leasing" className="text-gray-600 hover:text-orange-600 transition-colors">Car Leasing</Link></li>
                <li><Link href="/insurance" className="text-gray-600 hover:text-orange-600 transition-colors">Car Insurance</Link></li>
                <li><Link href="/value" className="text-gray-600 hover:text-orange-600 transition-colors">Car Valuation</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
