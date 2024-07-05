import { SvgIcon } from "@/components/common"

interface StarProps {
  filled: number;
  fillColor?: string;

	width: number
	height: number
}

export const Star: React.FC<StarProps> = ({ filled, fillColor = 'black', width, height }) => {
  if(filled === 100) {
    return   <SvgIcon  name='star' width={width} height={height} fill={fillColor} />
  }

  if(filled === 0) {
    return <SvgIcon name="star" width={width} height={height} fill="var(--secondary-200)" />
  }

 return (
    <div
      className="relative "
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <SvgIcon name="star" width={width} height={height} className="absolute top-0 left-0" fill="var(--secondary-200)" />
      <div
        className="overflow-hidden absolute top-0 left-0"
        style={{
          width: `${filled}%`,
        }}
      >
        <SvgIcon  name='star' width={width} height={height} fill={fillColor} />
      </div>
    </div>
  );
}