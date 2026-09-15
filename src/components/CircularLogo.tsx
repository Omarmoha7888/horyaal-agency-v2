import React from 'react';

interface CircularLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  withOuterGlow?: boolean;
}

export const CircularLogo: React.FC<CircularLogoProps> = ({
  size = 'md',
  className = '',
  withOuterGlow = false,
}) => {
  const sizeMap = {
    xs: 'w-7 h-7',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full select-none flex-shrink-0 overflow-hidden group
        ${withOuterGlow ? 'ring-2 ring-[#D4AF37]/50 shadow-[0_0_25px_rgba(212,175,55,0.45)]' : 'shadow-[0_2px_12px_rgba(0,0,0,0.8)]'}
        ${sizeMap[size]}
        ${className}
      `}
      aria-label="HD Official Logo"
    >
      {/* 3D Metallic Gold Circular HD Logo matching the official brand identity */}
      <img
        src="/hd-logo.png"
        alt="HORYAAL DIGITAL AGENCY (HD) Official Logo"
        className="w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-300"
        referrerPolicy="no-referrer"
      />

      {/* Subtle outer metallic rim highlight */}
      <div className="absolute inset-0 rounded-full ring-1 ring-[#D4AF37]/40 pointer-events-none" />
    </div>
  );
};
