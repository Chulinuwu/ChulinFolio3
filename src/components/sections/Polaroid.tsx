import Image from 'next/image';
import { cn } from '@/lib/utils';

interface PolaroidProps {
	src: string;
	alt: string;
	caption?: string;
	className?: string;
}

export default function Polaroid({ src, alt, caption, className }: PolaroidProps) {
	return (
		<div
			className={cn(
				'relative rounded-[8px] border-2 border-[var(--hd-ink)] bg-white p-3 pb-12 shadow-[0_14px_34px_rgba(204,61,99,0.18)]',
				className
			)}
		>
			<span
				aria-hidden
				className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 border border-black/10 bg-[var(--hd-butter)]/70"
			/>
			<div className="relative aspect-square w-full overflow-hidden rounded-[2px]">
				<Image src={src} alt={alt} fill className="object-cover" sizes="(max-width: 768px) 80vw, 360px" />
			</div>
			{caption && (
				<span className="absolute inset-x-0 bottom-3 text-center font-[family-name:var(--font-hand)] text-xl text-[var(--hd-ink)]">
					{caption}
				</span>
			)}
		</div>
	);
}
