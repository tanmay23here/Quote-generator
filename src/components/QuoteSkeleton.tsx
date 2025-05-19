import React from 'react';
import bgImage from '../assets/bg.png'

const QuoteSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse w-full max-w-3xl mx-auto">
      <div className="relative rounded-lg overflow-hidden shadow-xl" 
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '400px',
          minWidth: '100%'
        }}
      >
        <div className="absolute inset-0 bg-amber-900 bg-opacity-60"></div>
        
        <div className="relative p-4 md:p-6 h-full">
          {/* Sanskrit Text Skeleton */}
          <div className="text-center mb-4">
            <div className="h-6 w-24 bg-amber-200 rounded mx-auto mb-2"></div>
            <div className="space-y-3 max-w-2xl mx-auto">
              <div className="h-6 w-3/4 bg-amber-200 rounded mx-auto"></div>
              <div className="h-6 w-2/3 bg-amber-200 rounded mx-auto"></div>
              <div className="h-6 w-1/2 bg-amber-200 rounded mx-auto"></div>
            </div>
            <div className="mt-2 h-4 w-32 bg-amber-200 rounded mx-auto"></div>
          </div>
          
          {/* English Translation Skeleton */}
          <div className="text-center mb-4">
            <div className="h-6 w-24 bg-amber-200 rounded mx-auto mb-2"></div>
            <div className="space-y-3 max-w-2xl mx-auto">
              <div className="h-6 w-3/4 bg-amber-200 rounded mx-auto"></div>
              <div className="h-6 w-2/3 bg-amber-200 rounded mx-auto"></div>
            </div>
          </div>
          
          {/* Language Selector Skeleton */}
          <div className="flex justify-center mb-3">
            <div className="h-10 w-48 bg-amber-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteSkeleton; 
