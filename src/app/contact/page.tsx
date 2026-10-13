import type { Metadata } from 'next';
import { SCENES } from '@/components/notebook/config/scenes';
import { sceneMetadata } from '@/components/notebook/lib/scenes';
import ContactPage from '@/components/notebook/zones/ContactPage';
import PageTurn from '@/components/notebook/ui/PageTurn';

export const metadata: Metadata = sceneMetadata(SCENES.contact);

export default function ContactRoute() {
	return (
		<PageTurn>
			<ContactPage />
		</PageTurn>
	);
}
