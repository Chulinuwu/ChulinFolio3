'use client';

import Image from 'next/image';
import {
	motion,
	useMotionValue,
	useSpring,
	useTransform,
	useReducedMotion,
	type MotionValue
} from 'motion/react';
import { Star, Sparkle, Heart } from './Doodles';

const SPRING = { stiffness: 120, damping: 18, mass: 0.6 };

function useParallax(mv: MotionValue<number>, range: number) {
	return useSpring(useTransform(mv, [-0.5, 0.5], [-range, range]), SPRING);
}

export default function HeroAvatar() {
	const reduce = useReducedMotion();
	const mx = useMotionValue(0);
	const my = useMotionValue(0);

	const charX = useParallax(mx, 18);
	const charY = useParallax(my, 12);
	const blobX = useParallax(mx, -8);
	const starX = useParallax(mx, 28);
	const starY = useParallax(my, 22);

	const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
		if (reduce) return;
		const r = e.currentTarget.getBoundingClientRect();
		mx.set((e.clientX - r.left) / r.width - 0.5);
		my.set((e.clientY - r.top) / r.height - 0.5);
	};
	const onLeave = () => {
		mx.set(0);
		my.set(0);
	};

	return (
		<div
			onPointerMove={onMove}
			onPointerLeave={onLeave}
			className="relative mx-auto aspect-square max-h-[78dvh] w-full max-w-md lg:max-w-xl xl:max-w-2xl"
		>
			{/* soft organic blob backdrop */}
			<motion.div
				style={{ x: blobX }}
				className="absolute inset-x-8 top-8 bottom-16 rounded-[58%_42%_55%_45%/52%_48%_52%_48%] bg-gradient-to-br from-[var(--hd-sky)] via-[var(--hd-lavender)] to-[var(--hd-pink-soft)] opacity-70 blur-xl"
			/>
			<motion.div
				style={{ x: blobX }}
				className="absolute inset-x-12 top-12 bottom-20 rounded-[48%_52%_45%_55%/55%_45%_55%_45%] bg-[var(--hd-pink-soft)] opacity-25 blur-2xl"
			/>

			{/* die-cut character, floats free and overflows the blob */}
			<motion.div
				style={{ x: charX, y: charY }}
				animate={reduce ? undefined : { y: [0, -10, 0] }}
				transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
				className="absolute inset-0"
			>
				<Image
					src="/Chulinpic.png"
					alt="An-An illustrated avatar"
					fill
					priority
					sizes="(max-width: 1024px) 80vw, 38vw"
					className="scale-[1.18] object-contain object-bottom [mask-image:linear-gradient(to_bottom,black_72%,transparent_97%)] [-webkit-mask-image:linear-gradient(to_bottom,black_72%,transparent_97%)]"
				/>
			</motion.div>

			{/* floating doodles */}
			<motion.div style={{ x: starX, y: starY }} className="absolute inset-0 pointer-events-none">
				<motion.div
					animate={reduce ? undefined : { y: [0, -8, 0], rotate: [-12, -4, -12] }}
					transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
					className="absolute left-4 top-10"
				>
					<Star className="h-8 w-8" />
				</motion.div>
				<motion.div
					animate={reduce ? undefined : { y: [0, 8, 0], scale: [1, 1.15, 1] }}
					transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
					className="absolute right-6 top-16"
				>
					<Sparkle className="h-7 w-7" color="var(--hd-lavender)" />
				</motion.div>
				<motion.div
					animate={reduce ? undefined : { y: [0, -6, 0], rotate: [12, 4, 12] }}
					transition={{ duration: 4.6, repeat: Infinity, ease: 'easeInOut' }}
					className="absolute right-2 top-1/2"
				>
					<Heart className="h-7 w-7" />
				</motion.div>
			</motion.div>

			{/* now sticker */}
			<div className="absolute -bottom-2 left-0 -rotate-6 rounded-full border-2 border-[var(--hd-ink)] bg-[var(--hd-surface)] px-4 py-2 shadow-[0_6px_16px_rgba(204,61,99,0.12)]">
				<span className="flex items-center gap-2">
					<span className="relative flex h-2.5 w-2.5">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--hd-mint)] opacity-75" />
						<span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[var(--hd-mint)]" />
					</span>
					<span className="font-[family-name:var(--font-mono-hd)] text-xs text-[var(--hd-ink)]">
						now: developing Nubsatang
					</span>
				</span>
			</div>
		</div>
	);
}
