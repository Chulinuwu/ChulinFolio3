'use client';

import { usePathname } from 'next/navigation';
import { SCENES, TAB_SCENES } from '../config/scenes';
import { sceneForPath, turnBetween } from '../lib/scenes';
import IndexTab from './IndexTab';

export default function IndexTabs() {
	const current = sceneForPath(usePathname());

	return (
		<nav
			aria-label="Notebook tabs"
			style={{ viewTransitionName: 'index-tabs' }}
			className="fixed top-3 right-0 z-50 md:top-5"
		>
			<ul className="flex flex-col items-end gap-[clamp(0.25rem,0.8vh,0.5rem)]">
				{TAB_SCENES.map((id) => (
					<li key={id}>
						<IndexTab
							scene={SCENES[id]}
							active={current.id === id}
							turn={turnBetween(current, SCENES[id])}
						/>
					</li>
				))}
			</ul>
		</nav>
	);
}
