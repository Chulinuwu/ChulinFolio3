import PencilLine from '../ink/PencilLine';
import type { PageHeadingProps } from '../types/notebook.types';
import RiseText from './RiseText';

export default function PageHeading({ text }: PageHeadingProps) {
	return (
		<h1 className="font-hand text-ink inline-block text-[clamp(3.2rem,6.4vw,6rem)] leading-[0.95] tracking-[-0.01em]">
			<RiseText text={text} />
			<PencilLine width={320} seed={4} draw className="-mt-1" />
		</h1>
	);
}
