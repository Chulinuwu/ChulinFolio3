import Image from 'next/image';
import { cn } from '@/lib/utils';
import type { FramedImageProps } from '../types/notebook.types';

export default function FramedImage({ src, alt, width, height, tilt, sizes, aspect, priority = false, className }: FramedImageProps) {
	return (
		<div
			style={{ rotate: `${tilt}deg`, aspectRatio: aspect }}
			className={cn('relative overflow-hidden rounded-(--radius-frame) border-[1.5px] border-ink-line bg-white', className)}
		>
			{aspect ? (
				<Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
			) : (
				<Image src={src} alt={alt} width={width} height={height} sizes={sizes} priority={priority} className="block h-auto w-full" />
			)}
		</div>
	);
}
