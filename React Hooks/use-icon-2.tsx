import React from 'react';

// Utility types for className prop
interface IconComponentProps {
	className?: string;
}

/**
 * Record where the key is the component name (so it can be deconstructed in the component) and the value is a react component that renders a Material Symbols Icon.
 */
type IconComponentRecord<T extends string | string[]> = T extends string[]
	? { [K in T[number] as FormattedIconName<K>]: React.FC<IconComponentProps> }
	: T extends string
		? { [K in FormattedIconName<T>]: React.FC<IconComponentProps> }
		: never;

type FormattedIconName<T extends string> = T extends `${infer First}_${infer Rest}`
	? `${Capitalize<First>}${FormattedIconName<Capitalize<Rest>>}`
	: Capitalize<T>;

export default function useIcon<T extends string | string[]>(icon: T): IconComponentRecord<T> {
	const icons = Array.isArray(icon) ? icon : [icon];
	const iconComponents: Record<string, React.FC<IconComponentProps>> = {};

	icons.forEach((iconName) => {
		Object.assign(iconComponents, iconComponentFactory(iconName as string));
	});

	return iconComponents as IconComponentRecord<T>;
}

function iconComponentFactory(icon: string): Record<string, React.FC<IconComponentProps>> {
	// Define a component that accepts className as a prop
	const component: React.FC<IconComponentProps> = ({ className }) => (
		<span className={`material-symbols-outlined ${className || ''}`}>{icon}</span>
	);

	const name = formatIconName(icon);
	return { [name]: component };
}

function formatIconName(input: string): string {
	return input
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join('');
}
