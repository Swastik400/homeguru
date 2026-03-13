import React from 'react';

interface LoadingSkeletonProps {
  className?: string;
  height?: string;
  width?: string;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = '', 
  height = 'h-4', 
  width = 'w-full' 
}) => (
  <div className={`${height} ${width} bg-gray-200 rounded animate-pulse ${className}`} />
);

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white rounded-[16px] border border-[#E5E7EB] p-6 animate-pulse ${className}`}>
    <div className="space-y-4">
      <LoadingSkeleton height="h-6" width="w-3/4" />
      <LoadingSkeleton height="h-4" width="w-1/2" />
      <div className="space-y-2">
        <LoadingSkeleton height="h-3" />
        <LoadingSkeleton height="h-3" width="w-5/6" />
        <LoadingSkeleton height="h-3" width="w-4/6" />
      </div>
    </div>
  </div>
);

export const TableSkeleton: React.FC<{ rows?: number; className?: string }> = ({ 
  rows = 5, 
  className = '' 
}) => (
  <div className={`bg-white rounded-[16px] border border-[#E5E7EB] overflow-hidden ${className}`}>
    <div className="p-4 border-b border-gray-100">
      <LoadingSkeleton height="h-6" width="w-1/3" />
    </div>
    <div className="divide-y divide-gray-100">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 flex items-center space-x-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
          <div className="flex-1 space-y-2">
            <LoadingSkeleton height="h-4" width="w-1/2" />
            <LoadingSkeleton height="h-3" width="w-1/3" />
          </div>
          <LoadingSkeleton height="h-4" width="w-16" />
        </div>
      ))}
    </div>
  </div>
);

export default LoadingSkeleton;