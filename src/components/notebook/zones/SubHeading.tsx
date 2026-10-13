import PencilLine from '../ink/PencilLine';
import type { SubHeadingProps } from '../types/notebook.types';

export default function SubHeading({ id, children }: SubHeadingProps) {
	return (
		<h2
			id={id}
			className="font-hand text-ink inline-block text-[clamp(1.8rem,2.4vw,2.3rem)] leading-none"
		>
			{children}
			<PencilLine width={200} seed={17} />
		</h2>
	);
}
