import Image from 'next/image';
import { cn } from '@/lib/utils';
import { contacts } from '@/lib/data';
import { AVATAR, AVATAR_OUTLINE } from '../config/assets';
import { ZONE_COPY } from '../config/copy';
import { SCENES } from '../config/scenes';
import { contactEntries } from '../lib/contacts';
import MarkerLink from '../ui/MarkerLink';
import ContactLine from './ContactLine';
import ZoneSpread from './ZoneSpread';

const copy = ZONE_COPY.contact;

export default function ContactPage() {
	return (
		<ZoneSpread scene={SCENES.contact} title={copy.title} intro={copy.intro}>
			<div className="grid grid-cols-[minmax(0,1fr)] items-start gap-x-16 gap-y-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
				<div>
					<MarkerLink
						href={contacts.email.href}
						external
						className="text-[clamp(1.7rem,3vw,2.6rem)] break-all"
					>
						{contacts.email.handle}
					</MarkerLink>
					<ul className="mt-10 max-w-[34rem]">
						{contactEntries()
							.filter((c) => c.key !== 'email')
							.map((entry) => (
								<ContactLine key={entry.key} entry={entry} />
							))}
					</ul>
				</div>
				<div className="hidden justify-self-center lg:block">
					<Image
						src={AVATAR.src}
						alt={AVATAR.alt}
						width={AVATAR.width}
						height={AVATAR.height}
						sizes="20rem"
						priority
						className={cn('h-auto w-[18rem] -rotate-3', AVATAR_OUTLINE)}
					/>
				</div>
			</div>
		</ZoneSpread>
	);
}
