import { ViewTransition } from 'react';
import type { ChildrenProps } from '../types/notebook.types';

// Layouts persist across navigations, so every page wraps itself; untyped navigations (browser back) swap instantly.
export default function PageTurn({ children }: ChildrenProps) {
	return (
		<ViewTransition
			enter={{ 'turn-forward': 'turn-forward', 'turn-back': 'turn-back', default: 'none' }}
			exit={{ 'turn-forward': 'turn-forward', 'turn-back': 'turn-back', default: 'none' }}
			default="none"
		>
			{children}
		</ViewTransition>
	);
}
