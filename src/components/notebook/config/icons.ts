import {
	CircuitryIcon,
	CodeIcon,
	DatabaseIcon,
	DiscordLogoIcon,
	EnvelopeSimpleIcon,
	FileTextIcon,
	GameControllerIcon,
	GithubLogoIcon,
	GraphIcon,
	InstagramLogoIcon,
	LinkedinLogoIcon,
	QrCodeIcon,
	UsersThreeIcon
} from '@phosphor-icons/react/dist/ssr';
import type { ContactKey, IconComponent } from '../types/notebook.types';

export const CONTACT_ICONS: Record<ContactKey, IconComponent> = {
	email: EnvelopeSimpleIcon,
	github: GithubLogoIcon,
	linkedin: LinkedinLogoIcon,
	instagram: InstagramLogoIcon,
	discord: DiscordLogoIcon
};

// One drawn glyph per project, so rows without a screenshot still read at a glance.
export const PROJECT_ICONS: Record<string, IconComponent> = {
	'ugc-moderation': FileTextIcon,
	'aurora-ai': GraphIcon,
	'plant-disease': CircuitryIcon,
	'digital-wallet': DatabaseIcon,
	'citation-prediction': FileTextIcon,
	'decision-sql': DatabaseIcon,
	'network-forecast': GraphIcon,
	skillloom: CircuitryIcon,
	uniclub: UsersThreeIcon,
	'erp-system': DatabaseIcon,
	'chula-macaron': CircuitryIcon,
	'dog-vs-monkey': GameControllerIcon,
	'qr-generator': QrCodeIcon
};

export const FALLBACK_PROJECT_ICON: IconComponent = CodeIcon;
