import { SvgIcon } from '@/components/common';
import { cn } from '@/lib';
import styles from './Rating.module.scss';

interface IRatingProps {
  value: number;
  className?: string;
  color: string;
}

export const Rating = ({ className, value, color }: IRatingProps) => {
  const percentage = Math.round((value / 5) * 100);

  const arrayLength = Math.ceil(percentage / 20);

  return (
    <div className={cn(styles.container, className)}>
      {Array.from(Array(arrayLength).keys()).map((_, i) => (
        <SvgIcon
          name="star"
          key={i}
          className={styles.star}
          width={13.3}
          height={16}

          fill={color}
          stroke={color}
        />
      ))}

      <div
        className={styles.overlay}
        style={{ width: `${100 - percentage}%` }}
      />
    </div>
  );
};
