import type { ReactNode } from 'react';
import type { PENS } from '../config/pens';
import type { Experience, ExperienceArea, Project, ProjectCategory, contacts } from '@/lib/data';

export type ZoneId = 'lab' | 'studio' | 'workshop';

export type SceneId = 'home' | ZoneId | 'contact';

export type Pen = (typeof PENS)[number];

export type TurnDirection = 'turn-forward' | 'turn-back';

export interface Scene {
	id: SceneId;
	order: number;
	path: string;
	label: string;
	tabLabel: string;
	title: string;
	description: string;
	next: SceneId;
	pen: Pen;
}

export type CategoryZones = Record<ProjectCategory, ZoneId | null>;

export interface ImageAsset {
	src: string;
	width: number;
	height: number;
	alt: string;
}

export interface TimelineRow {
	key: string;
	label: string;
	role: string;
	dates: string;
	areas: ExperienceArea[];
	start: number;
	end: number;
}

export interface TimelineSegment {
	key: string;
	area: ExperienceArea;
	from: number;
	to: number;
}

export interface TimelineStint {
	key: string;
	role: string;
	dates: string;
}

export interface TimelineTrackRow {
	label: string;
	stints: TimelineStint[];
	segments: TimelineSegment[];
}

export interface TimelineLayout {
	rows: TimelineTrackRow[];
	years: { year: number; at: number }[];
}

export interface RoleTimelineProps {
	layout: TimelineLayout;
}

export interface TimelineTrackProps {
	segments: TimelineSegment[];
	years: TimelineLayout['years'];
}

export interface PlotPoint {
	x: number;
	y: number;
}

export type ContactKey = keyof typeof contacts;

export interface ContactEntry {
	key: ContactKey;
	href: string;
	title: string;
	handle: string;
	external: boolean;
}

export type IconComponent = typeof import('@phosphor-icons/react/dist/ssr').FileTextIcon;

export interface ChildrenProps {
	children: ReactNode;
}

export interface PencilLineProps {
	width: number;
	seed: number;
	draw?: boolean;
	className?: string;
}

export interface PageHeadingProps {
	text: string;
}

export interface RiseTextProps {
	text: string;
	delayMs?: number;
}

export interface HandNoteProps {
	lines: readonly string[];
	rotate: number;
	className?: string;
}

export interface MarkerLinkProps {
	href: string;
	children: ReactNode;
	external?: boolean;
	turn?: TurnDirection;
	className?: string;
}

export interface FramedImageProps {
	src: string;
	alt: string;
	width: number;
	height: number;
	tilt: number;
	sizes: string;
	aspect?: string;
	priority?: boolean;
	parallax?: boolean;
	className?: string;
}

export interface ProjectNoteProps {
	project: Project;
	subtitle: string;
	tilt: number;
	sizes: string;
	priority?: boolean;
	headingLevel?: 'h2' | 'h3';
}

export interface ProjectRowProps {
	project: Project;
	icon: IconComponent;
}

export interface IndexTabProps {
	scene: Scene;
	active: boolean;
	turn: TurnDirection;
}

export interface ZoneSpreadProps {
	scene: Scene;
	title: string;
	intro: string;
	children: ReactNode;
}

export interface NextTabCardProps {
	from: SceneId;
}

export interface ContactLineProps {
	entry: ContactEntry;
}

export interface BreadcrumbProps {
	trail: { label: string; href?: string }[];
}

export interface SubHeadingProps {
	id: string;
	children: ReactNode;
}

export interface FeaturedProjectProps {
	project: Project;
}

export interface ExperienceGroupConfig {
	id: string;
	title: string;
	types: Experience['type'][];
}

export interface ExperienceStint {
	key: string;
	role: string;
	dates: string;
}

export interface ExperienceCard {
	key: string;
	org: string;
	descriptions: string[];
	area?: ExperienceArea;
	stints: ExperienceStint[];
}

export interface ExperienceGroup {
	id: string;
	title: string;
	cards: ExperienceCard[];
}

export interface ExperienceCardProps {
	card: ExperienceCard;
}

export interface DotFieldFrame {
	time: number;
	x: number;
	y: number;
	active: number;
	scroll: number;
	velocity: number;
}

export type CoinFace = 'drawing' | 'photo';

export interface CoinPose {
	time: number;
	tiltX: number;
	tiltY: number;
	spin: number;
}

export interface HalftoneFrame {
	time: number;
	reveal: number;
	scatter: number;
	x: number;
	y: number;
	active: number;
}

export interface HalftoneHeroProps {
	name: string;
	before: ReactNode;
	after: ReactNode;
}

export interface DeckCardProps {
	project: Project;
	subtitle: string;
	pen: Pen;
	index: number;
	total: number;
}

export interface Point2 {
	x: number;
	y: number;
}

export type Quad = [Point2, Point2, Point2, Point2];

export interface DevicePose {
	progress: number;
	tiltX: number;
	tiltY: number;
	time: number;
}
