import Image from 'next/image';
import { cn } from '@/lib/utils';
import { heroData } from '@/lib/data';
import { AVATAR, AVATAR_OUTLINE } from '../config/assets';
import { HOME_COPY } from '../config/copy';
import PencilLine from '../ink/PencilLine';

export default function IdentityPanel() {
	return (
		<div className="grid grid-cols-[minmax(0,1fr)] items-center gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8">
			<div className="w-36 sm:w-44 lg:w-[clamp(10rem,15vw,15rem)]">
				<Image
					src={AVATAR.src}
					alt={AVATAR.alt}
					width={AVATAR.width}
					height={AVATAR.height}
					priority
					sizes="(max-width: 640px) 144px, 13vw"
					className={cn('h-auto w-full', AVATAR_OUTLINE)}
				/>
			</div>
			<div>
				<h1 className="font-hand text-ink inline-block text-[clamp(4rem,8vw,8rem)] leading-[0.9] whitespace-nowrap uppercase">
					{heroData.nickname}
					<PencilLine width={260} seed={7} className="-mt-1" />
				</h1>
				<p className="text-ink mt-4 max-w-[44ch] text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug font-medium text-pretty">
					{HOME_COPY.tagline}
				</p>
				<p className="font-hand text-ink mt-3 text-[1.4rem] leading-tight">{heroData.name}</p>
				<p className="text-ink-muted mt-1 text-[0.92rem]">{HOME_COPY.meta.join(' / ')}</p>
			</div>
		</div>
	);
}
