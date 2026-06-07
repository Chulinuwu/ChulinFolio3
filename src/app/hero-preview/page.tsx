import { Fredoka, Shantell_Sans, Nunito, JetBrains_Mono } from 'next/font/google';
import { cn } from '@/lib/utils';
import HeroPreview from '@/components/hero/HeroPreview';
import HandDrawnNav from '@/components/hero/HandDrawnNav';

const display = Fredoka({ subsets: ['latin'], variable: '--font-display' });
const hand = Shantell_Sans({ subsets: ['latin'], variable: '--font-hand' });
const body = Nunito({ subsets: ['latin'], variable: '--font-body' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono-hd' });

export default function HeroPreviewPage() {
	return (
		<main
			id="top"
			className={cn(
				'hd-scope [font-family:var(--font-body)]',
				display.variable,
				hand.variable,
				body.variable,
				mono.variable
			)}
		>
			<HandDrawnNav />
			<HeroPreview />
		</main>
	);
}
