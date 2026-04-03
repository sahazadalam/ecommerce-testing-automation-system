import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 h-64 rounded-lg mb-4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
    </div>
  );
};

export default ProductSkeleton;