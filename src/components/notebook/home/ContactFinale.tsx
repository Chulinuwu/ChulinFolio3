import { contacts } from '@/lib/data';
import { SCENES } from '../config/scenes';
import { contactEntries } from '../lib/contacts';
import MarkerLink from '../ui/MarkerLink';
import RiseText from '../ui/RiseText';

export default function ContactFinale() {
	return (
		<section
			aria-labelledby="finale"
			className="reveal border-ink-line border-t-[1.5px] pt-16 pb-8"
		>
			<h2 id="finale" className="font-hand text-ink text-[clamp(3rem,9vw,8.5rem)] leading-[0.9]">
				<RiseText text={SCENES.contact.label} />
			</h2>
			<a
				href={contacts.email.href}
				className="font-hand text-pink decoration-pink/40 hover:text-pink-deep hover:decoration-pink-deep mt-8 inline-block text-[clamp(1.8rem,5vw,4.4rem)] leading-none break-all underline decoration-2 underline-offset-[0.2em] transition-colors duration-(--duration-quick)"
			>
				{contacts.email.handle}
			</a>
			<ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
				{contactEntries()
					.filter((c) => c.key !== 'email')
					.map((c) => (
						<li key={c.key}>
							<MarkerLink href={c.href} external>
								{c.title}
							</MarkerLink>
						</li>
					))}
			</ul>
		</section>
	);
}
