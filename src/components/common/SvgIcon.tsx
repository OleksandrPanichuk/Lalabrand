interface SvgIconProps {
  name: string;
  width?: number;
  height?: number;
  fill?: string;
  stroke?: string;
}

export const SvgIcon = ({
  name,
  width = 24,
  height = 24,
  fill = 'transparent',
  stroke = 'transparent',
  ...props
}: SvgIconProps) => {
  return (
    <svg width={width} height={height} {...props} fill={fill} stroke={stroke}>
      <use xlinkHref={`icons.svg#${name}`} />
    </svg>
  );
};
