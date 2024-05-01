import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger
} from "@/components/ui";

interface HintProps {
	children: React.ReactNode;
	description: string;
	side?: "left" | "right" | "top" | "bottom";
	sideOffset?: number;
	delay?:number
	asChild?:boolean
};

export const Hint = ({
	children,
	description,
	side = "bottom",
	sideOffset = 0,
	delay = 300,
	asChild
}: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={delay}>
				<TooltipTrigger asChild={asChild}>
					{children}
				</TooltipTrigger>
				<TooltipContent
					sideOffset={sideOffset}
					side={side}
					className="text-sm font-montserrat font-medium max-w-[220px] break-words"
				>
					{description}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};