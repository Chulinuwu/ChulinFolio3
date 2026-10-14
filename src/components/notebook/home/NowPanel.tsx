import { HOME_CONTACTS, HOME_COPY } from '../config/copy';
import PencilLine from '../ink/PencilLine';
import { contactEntries } from '../lib/contacts';
import { currentRoles } from '../lib/experiences';
import MarkerLink from '../ui/MarkerLink';

export default function NowPanel() {
	const links = contactEntries().filter((c) => HOME_CONTACTS.some((k) => k === c.key));

	return (
		<aside aria-labelledby="right-now" data-pen="orange" className="enter [--enter-delay:700ms]">
			<h2 id="right-now" className="font-hand text-ink text-[1.6rem] leading-none">
				{HOME_COPY.now}
			</h2>
			<PencilLine width={130} seed={41} className="mt-1 max-w-[130px]" />
			<ul className="mt-4 grid gap-3">
				{currentRoles().map((e) => (
					<li key={e.role}>
						<p className="text-ink text-[0.95rem] leading-snug font-medium">{e.role}</p>
						<p className="text-ink-muted text-[0.85rem]">
							{e.short} / since {e.year.replace(/ - now$/, '')}
						</p>
					</li>
				))}
			</ul>
			<div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
				{links.map((c) => (
					<MarkerLink key={c.key} href={c.href} external className="text-[1.15rem]">
						{c.title}
					</MarkerLink>
				))}
			</div>
		</aside>
	);
}
