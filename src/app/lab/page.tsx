import type { Metadata } from 'next';
import { SCENES } from '@/components/notebook/config/scenes';
import { sceneMetadata } from '@/components/notebook/lib/scenes';
import LabPage from '@/components/notebook/zones/LabPage';
import PageTurn from '@/components/notebook/ui/PageTurn';

export const metadata: Metadata = sceneMetadata(SCENES.lab);

export default function LabRoute() {
	return (
		<PageTurn>
			<LabPage />
		</PageTurn>
	);
}
