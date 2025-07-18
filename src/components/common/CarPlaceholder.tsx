import { CSSProperties } from 'react';

interface CarPlaceholderProps {
  bodyType?: string;
  className?: string;
  style?: CSSProperties;
}

const bodyTypeColors: Record<string, { bg: string; icon: string }> = {
  sedan: { bg: '#E3F2FD', icon: '🚗' },
  suv: { bg: '#F3E5F5', icon: '🚙' },
  coupe: { bg: '#FBE9E7', icon: '🏎️' },
  convertible: { bg: '#F1F8E9', icon: '🚗' },
  hatchback: { bg: '#FFECB3', icon: '🚗' },
  wagon: { bg: '#E8EAF6', icon: '🚗' },
  van: { bg: '#E0F2F1', icon: '🚐' },
  default: { bg: '#ECEFF1', icon: '🚗' },
};

export function CarPlaceholder({ bodyType = 'default', className = '', style = {} }: CarPlaceholderProps) {
  const { bg, icon } = bodyTypeColors[bodyType.toLowerCase()] || bodyTypeColors.default;

  return (
    <div
      className={`flex items-center justify-center ${className}`}
      style={{
        backgroundColor: bg,
        aspectRatio: '16/9',
        fontSize: '2rem',
        ...style,
      }}
    >
      <span role="img" aria-label={`${bodyType} car`}>
        {icon}
      </span>
    </div>
  );
} 