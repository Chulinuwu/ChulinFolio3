'use client';

import { useDeviceIntro } from '../hooks/useDeviceIntro';
import type { ChildrenProps } from '../types/notebook.types';

export default function DeviceIntro({ children }: ChildrenProps) {
	const { screen, canvas } = useDeviceIntro();

	return (
		<>
			<div aria-hidden className="intro-spacer" />
			<canvas ref={canvas} aria-hidden className="device-canvas" />
			<div ref={screen} className="device-screen">
				{children}
			</div>
		</>
	);
}
