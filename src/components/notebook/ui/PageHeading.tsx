import PencilLine from '../ink/PencilLine';
import type { ChildrenProps } from '../types/notebook.types';

export default function PageHeading({ children }: ChildrenProps) {
	return (
		<h1 className="inline-block font-hand text-[clamp(3.2rem,6.4vw,6rem)] leading-[0.95] tracking-[-0.01em] text-ink">
			{children}
			<PencilLine width={320} seed={4} className="-mt-1" />
		</h1>
	);
}
