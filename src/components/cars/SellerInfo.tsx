import Image from 'next/image';

interface SellerInfoProps {
  seller: {
    id: string;
    name: string | null;
    image: string | null;
  };
}

export function SellerInfo({ seller }: SellerInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
          {seller.image ? (
            <Image
              src={seller.image}
              alt={seller.name || 'Seller'}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        <div>
          <h4 className="font-medium text-[#333f48]">{seller.name || 'Private Seller'}</h4>
          <p className="text-sm text-gray-600">Member since 2023</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-sm">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-600">Verified Seller</span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-gray-600">Location: Germany</span>
        </div>

        <div className="flex items-center space-x-2 text-sm">
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span className="text-gray-600">4.8/5 Rating</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h5 className="font-medium text-[#333f48] mb-2">Response Time</h5>
        <p className="text-sm text-gray-600">Usually responds within 2 hours</p>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <h5 className="font-medium text-[#333f48] mb-2">Seller Information</h5>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• Professional car dealer</p>
          <p>• 15+ years in business</p>
          <p>• 500+ cars sold</p>
          <p>• 98% positive feedback</p>
        </div>
      </div>
    </div>
  );
} 