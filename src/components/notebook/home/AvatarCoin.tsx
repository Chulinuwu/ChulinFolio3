'use client';

import { ArrowsClockwiseIcon } from '@phosphor-icons/react';
import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { AVATAR, AVATAR_OUTLINE, PHOTO } from '../config/assets';
import { COIN_LABELS } from '../config/coin';
import { useAvatarCoin } from '../hooks/useAvatarCoin';
import type { CoinFace } from '../types/notebook.types';

export default function AvatarCoin() {
	const [face, setFace] = useState<CoinFace>('drawing');
	const { frame, canvas, live } = useAvatarCoin(face);
	const still = face === 'photo' ? PHOTO : AVATAR;

	return (
		<div ref={frame} className={cn('group relative aspect-square w-full', AVATAR_OUTLINE)}>
			<Image
				src={still.src}
				alt={still.alt}
				width={still.width}
				height={still.height}
				priority
				sizes="(max-width: 640px) 144px, 15vw"
				className={cn(
					'size-full rounded-full object-cover transition-opacity duration-(--duration-fast)',
					live && 'opacity-0'
				)}
			/>
			<canvas
				ref={canvas}
				aria-hidden
				className="pointer-events-none absolute -inset-[12%] size-[124%]"
			/>
			<button
				type="button"
				aria-pressed={face === 'photo'}
				aria-label={COIN_LABELS[face]}
				onClick={() => setFace((f) => (f === 'photo' ? 'drawing' : 'photo'))}
				className="absolute inset-0 cursor-pointer rounded-full"
			>
				<span className="border-pink text-pink absolute right-[2%] bottom-[2%] grid size-9 place-items-center rounded-full border-[1.5px] bg-white transition-transform duration-(--duration-fast) ease-(--ease-smooth-out) group-hover:rotate-180">
					<ArrowsClockwiseIcon weight="bold" aria-hidden className="size-4" />
				</span>
			</button>
		</div>
	);
}
