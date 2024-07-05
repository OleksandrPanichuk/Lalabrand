import { cn } from '@/lib'
import { Star } from './Star'

interface RatingProps {
  value: number;

  starWidth?: number;
  starHeight?: number;


  fillColor?: string;

  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  fillColor = 'black',
  starWidth = 16,
  starHeight = 16,
 className,
}) => {
  const totalStars = 5;
  const stars = [];

  for (let i = 0; i < totalStars; i++) {
    const starValue = i + 1;
    let filled = 0;

    if (value >= starValue) {
      filled = 100;
    } else if (value + 1 > starValue) {
      filled = (value % 1) * 100;
    }

    stars.push(
      <Star
        key={i}
        filled={filled}
        fillColor={fillColor}
        width={starWidth}
        height={starHeight}
      />,
    );
  }

  return <div className={cn('flex gap-[4.67px]', className)}>{stars}</div>;
};
