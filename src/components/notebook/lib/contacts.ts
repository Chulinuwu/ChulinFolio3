import { contacts } from '@/lib/data';
import type { ContactEntry, ContactKey } from '../types/notebook.types';

const isContactKey = (key: string): key is ContactKey => key in contacts;

export const contactEntries = (): ContactEntry[] =>
	Object.keys(contacts)
		.filter(isContactKey)
		.map((key) => {
			const c = contacts[key];
			return {
				key,
				href: c.href,
				title: c.title,
				handle: c.handle,
				external: c.target === '_blank'
			};
		});
