import { CONTACT_ICONS } from '../config/icons';
import type { ContactLineProps } from '../types/notebook.types';

export default function ContactLine({ entry }: ContactLineProps) {
	const Icon = CONTACT_ICONS[entry.key];
	return (
		<li>
			<a
				href={entry.href}
				target={entry.external ? '_blank' : undefined}
				rel={entry.external ? 'noreferrer' : undefined}
				className="group border-ink-line/25 flex items-center gap-4 border-b py-4"
			>
				<Icon
					weight="light"
					aria-hidden
					className="text-ink-soft group-hover:text-pink size-7 shrink-0 transition-colors duration-(--duration-quick)"
				/>
				<span className="text-ink w-24 text-[1rem] font-semibold">{entry.title}</span>
				<span className="text-pink decoration-pink/40 group-hover:decoration-pink min-w-0 truncate text-[1rem] underline underline-offset-4">
					{entry.handle}
				</span>
			</a>
		</li>
	);
}
