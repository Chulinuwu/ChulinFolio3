'use client';

import { useEffect, useState, useRef } from 'react';

interface TypingTextProps {
	text: string;
	speed?: number;
	delay?: number;
	className?: string;
	cursorClassName?: string;
	showCursor?: boolean;
}

export function TypingText({
	text,
	speed = 80,
	delay = 500,
	className = '',
	cursorClassName = '',
	showCursor = true,
}: TypingTextProps) {
	const [displayed, setDisplayed] = useState('');
	const [started, setStarted] = useState(false);
	const [done, setDone] = useState(false);
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) setStarted(true);
			},
			{ threshold: 0.1 }
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!started) return;
		const timeout = setTimeout(() => {
			let i = 0;
			const interval = setInterval(() => {
				i++;
				setDisplayed(text.slice(0, i));
				if (i >= text.length) {
					clearInterval(interval);
					setTimeout(() => setDone(true), 1500);
				}
			}, speed);
			return () => clearInterval(interval);
		}, delay);
		return () => clearTimeout(timeout);
	}, [started, text, speed, delay]);

	return (
		<span ref={ref} className={className}>
			{displayed}
			{showCursor && (
				<span
					className={`inline-block w-[3px] translate-y-[2px] ${done ? 'animate-pulse' : 'animate-[blink_0.6s_step-end_infinite]'} ${cursorClassName}`}
					style={{ height: '1em', background: 'currentColor', marginLeft: '2px' }}
				/>
			)}
		</span>
	);
}
