import { heroData } from '@/lib/data';
import { HOME_COPY } from '../config/copy';
import AvatarCoin from './AvatarCoin';

export default function IdentityPanel() {
	return (
		<div className="flex items-center gap-6">
			<div className="enter w-28 shrink-0 sm:w-32">
				<AvatarCoin />
			</div>
			<div>
				<p className="enter font-hand text-ink text-[1.6rem] leading-tight [--enter-delay:200ms]">
					{heroData.name}
				</p>
				<p className="enter text-ink-muted mt-1 max-w-[30ch] text-[0.92rem] leading-snug [--enter-delay:300ms]">
					{HOME_COPY.meta.join(' / ')}
				</p>
			</div>
		</div>
	);
}
