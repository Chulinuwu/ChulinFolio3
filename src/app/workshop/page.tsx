import type { Metadata } from 'next';
import { SCENES } from '@/components/notebook/config/scenes';
import { sceneMetadata } from '@/components/notebook/lib/scenes';
import WorkshopPage from '@/components/notebook/zones/WorkshopPage';
import PageTurn from '@/components/notebook/ui/PageTurn';

export const metadata: Metadata = sceneMetadata(SCENES.workshop);

export default function WorkshopRoute() {
	return (
		<PageTurn>
			<WorkshopPage />
		</PageTurn>
	);
}
