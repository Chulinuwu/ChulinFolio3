import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AVATAR, AVATAR_OUTLINE } from '@/components/notebook/config/assets';
import { NOT_FOUND_COPY } from '@/components/notebook/config/copy';
import PageHeading from '@/components/notebook/ui/PageHeading';
import MarkerLink from '@/components/notebook/ui/MarkerLink';
import HandNote from '@/components/notebook/ui/HandNote';

export default function NotFound() {
	return (
		<main className="mx-auto flex min-h-svh max-w-[1100px] flex-col items-start justify-center gap-10 py-16 pr-14 pl-5 md:flex-row md:items-center md:pr-28 md:pl-12">
			<div className="relative w-44 shrink-0 md:w-64">
				<Image
					src={AVATAR.src}
					alt={AVATAR.alt}
					width={AVATAR.width}
					height={AVATAR.height}
					priority
					sizes="16rem"
					className={cn('h-auto w-full rotate-3', AVATAR_OUTLINE)}
				/>
				<HandNote
					lines={NOT_FOUND_COPY.note}
					rotate={-10}
					className="absolute -top-6 -right-10 text-[1.3rem]"
				/>
			</div>
			<div>
				<PageHeading>{NOT_FOUND_COPY.title}</PageHeading>
				<p className="text-ink-soft mt-4 max-w-[32rem] text-[1.05rem] leading-relaxed">
					{NOT_FOUND_COPY.body}
				</p>
				<MarkerLink href="/" turn="turn-back" className="mt-6">
					{NOT_FOUND_COPY.cta}
				</MarkerLink>
			</div>
		</main>
	);
}
