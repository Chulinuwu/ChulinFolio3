import type { Metadata, Viewport } from 'next';
import '@/app.css';
import { cn } from '@/lib/utils';
import { fontVariables } from '@/lib/fonts';
import { SCENES } from '@/components/notebook/config/scenes';
import { siteUrl } from '@/components/notebook/config/site';
import { sceneMetadata } from '@/components/notebook/lib/scenes';
import IndexTabs from '@/components/notebook/nav/IndexTabs';
import DotField from '@/components/notebook/ui/DotField';

export const metadata: Metadata = { metadataBase: new URL(siteUrl), ...sceneMetadata(SCENES.home) };

export const viewport: Viewport = { themeColor: '#ffffff' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={cn(...fontVariables)}>
			<body className="min-h-svh">
				<DotField />
				<IndexTabs />
				{children}
			</body>
		</html>
	);
}
