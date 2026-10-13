import { heroData } from '@/lib/data';
import { HOME_COPY } from '../config/copy';
import PencilLine from '../ink/PencilLine';
import AvatarCoin from './AvatarCoin';
import RiseText from '../ui/RiseText';

export default function IdentityPanel() {
	return (
		<div className="grid grid-cols-[minmax(0,1fr)] items-center gap-6 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8">
			<div className="enter w-36 sm:w-44 lg:w-[clamp(10rem,15vw,15rem)]">
				<AvatarCoin />
			</div>
			<div>
				<h1 className="font-hand text-ink inline-block text-[clamp(4rem,8vw,8rem)] leading-[0.9] whitespace-nowrap uppercase">
					<RiseText text={heroData.nickname} delayMs={150} />
					<PencilLine width={260} seed={7} draw className="-mt-1" />
				</h1>
				<p className="enter text-ink mt-4 max-w-[44ch] text-[clamp(1.15rem,1.7vw,1.5rem)] leading-snug font-medium text-pretty [--enter-delay:450ms]">
					{HOME_COPY.tagline}
				</p>
				<p className="enter font-hand text-ink mt-3 text-[1.4rem] leading-tight [--enter-delay:550ms]">
					{heroData.name}
				</p>
				<p className="enter text-ink-muted mt-1 text-[0.92rem] [--enter-delay:620ms]">
					{HOME_COPY.meta.join(' / ')}
				</p>
			</div>
		</div>
	);
}
