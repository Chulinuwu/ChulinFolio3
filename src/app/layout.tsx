import type { Metadata } from 'next';
import '@/app.css';
import { cn } from '@/lib/utils';
import { fontVariables } from '@/lib/fonts';

export const metadata: Metadata = {
	title: 'An-An | Developer, Designer, Data Scientist',
	description:
		'An-An (Jirameth Wannasiwaporn) builds cute, clever and scalable things across software engineering, design and AI.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={cn(...fontVariables)}>
			<body className="hd-scope [font-family:var(--font-body)]">{children}</body>
		</html>
	);
}
