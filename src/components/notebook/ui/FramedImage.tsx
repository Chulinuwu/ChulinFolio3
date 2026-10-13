import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { FramedImageProps } from '../types/notebook.types';

export default function FramedImage({
	src,
	alt,
	width,
	height,
	tilt,
	sizes,
	aspect,
	priority = false,
	parallax = false,
	className
}: FramedImageProps) {
	return (
		<div
			style={{ rotate: `${tilt}deg`, aspectRatio: aspect }}
			className={cn(
				'border-ink-line relative overflow-hidden rounded-(--radius-frame) border-[1.5px] bg-white',
				className
			)}
		>
			{aspect ? (
				<Image
					src={src}
					alt={alt}
					fill
					sizes={sizes}
					priority={priority}
					className={cn('object-cover', parallax && 'parallax-inner')}
				/>
			) : (
				<Image
					src={src}
					alt={alt}
					width={width}
					height={height}
					sizes={sizes}
					priority={priority}
					className={cn('block h-auto w-full', parallax && 'parallax-inner')}
				/>
			)}
		</div>
	);
}
