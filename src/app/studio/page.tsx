import type { Metadata } from 'next';
import { SCENES } from '@/components/notebook/config/scenes';
import { sceneMetadata } from '@/components/notebook/lib/scenes';
import StudioPage from '@/components/notebook/zones/StudioPage';
import PageTurn from '@/components/notebook/ui/PageTurn';

export const metadata: Metadata = sceneMetadata(SCENES.studio);

export default function StudioRoute() {
	return (
		<PageTurn>
			<StudioPage />
		</PageTurn>
	);
}
