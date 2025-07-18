'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubMenuOpen, setIsSubMenuOpen] = useState('');

  const mainNavItems = [
    {
      label: 'Buy',
      submenu: [
        { label: 'Auto', href: '/buy/auto' },
        { label: 'Used Cars', href: '/buy/used' },
        { label: 'Trade-in', href: '/buy/trade-in' },
        { label: 'Buy Car Online with smyle', href: '/buy/online' },
        { label: 'Buy Electric Car', href: '/buy/electric' },
        { label: 'Find Dealer', href: '/dealers' }
      ]
    },
    {
      label: 'Sell',
      submenu: [
        { label: 'Sell Car Free', href: '/sell/free' },
        { label: 'What is my car worth?', href: '/sell/value' }
      ]
    },
    {
      label: 'Flexible Purchase Models',
      submenu: [
        { label: 'Car Leasing Offers', href: '/leasing' },
        { label: 'Car Financing', href: '/financing' }
      ]
    },
    {
      label: 'Decision Help',
      submenu: [
        { label: 'Car Catalog', href: '/catalog/cars' },
        { label: 'Motorcycle Catalog', href: '/catalog/motorcycles' },
        { label: 'Which car suits me?', href: '/car-advisor' },
        { label: 'Auto Magazine', href: '/magazine' },
        { label: 'Guides', href: '/guides' },
        { label: 'Electric Car Advisor', href: '/electric-advisor' },
        { label: 'Safety when buying and selling', href: '/safety' }
      ]
    }
  ];

  return (
    <header className="bg-white">
      {/* Top bar */}
      <div className="bg-[#333f48] text-white px-4 py-1 text-sm">
        <div className="max-w-7xl mx-auto flex justify-end space-x-4">
          <Link href="/auth/signin" className="hover:text-gray-300">Sign in</Link>
          <span>|</span>
          <button className="hover:text-gray-300">Germany</button>
        </div>
      </div>

      {/* Main header */}
      <div className="border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="text-2xl font-bold text-[#333f48]">
                AutoMarket24
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {mainNavItems.map((item) => (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => setIsSubMenuOpen(item.label)}
                  onMouseLeave={() => setIsSubMenuOpen('')}
                >
                  <button className="text-gray-700 hover:text-[#333f48] px-3 py-2 text-sm font-medium">
                    {item.label}
                  </button>
                  
                  {/* Submenu */}
                  {isSubMenuOpen === item.label && (
                    <div className="absolute left-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="py-2">
                        {item.submenu.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Sell Button */}
            <div className="hidden lg:flex items-center">
              <Link
                href="/sell-your-car"
                className="bg-[#ff4c0c] text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-[#e6430b]"
              >
                Sell Car Free
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#333f48] hover:bg-gray-100"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg
                  className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden border-b border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {mainNavItems.map((item) => (
            <div key={item.label} className="space-y-1">
              <button
                className="w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#333f48] hover:bg-gray-50"
                onClick={() => setIsSubMenuOpen(isSubMenuOpen === item.label ? '' : item.label)}
              >
                {item.label}
              </button>
              {isSubMenuOpen === item.label && (
                <div className="pl-4 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.label}
                      href={subItem.href}
                      className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#333f48] hover:bg-gray-50"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/sell-your-car"
            className="block w-full text-center bg-[#ff4c0c] text-white px-4 py-2 rounded-md text-base font-medium hover:bg-[#e6430b]"
          >
            Sell Car Free
          </Link>
        </div>
      </div>
    </header>
  );
}; 