import React, { useEffect, useState } from 'react';

const useIcon = (icons: string | string[]) => {
	// Ensure icons is treated as an array
	const iconList = Array.isArray(icons) ? icons : [icons];

	// Join icons into a comma-separated string for the URL
	const iconString = iconList.join();
	const [fontLoaded, setFontLoaded] = useState(false);

	useEffect(() => {
		const link = document.createElement('link');
		link.href = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap`;
		link.rel = 'stylesheet';

		document.head.appendChild(link);

		link.onload = () => setFontLoaded(true);

		return () => {
			document.head.removeChild(link);
		};
	}, [iconString]);

	const iconComponents = iconList.reduce<
		Record<string, React.FC<{ className?: string; style?: React.CSSProperties }>>
	>((acc, iconName) => {
		function IconComponent({
			className,
			style,
		}: {
			className?: string;
			style?: React.CSSProperties;
		}) {
			return (
				<span className={`material-symbols-outlined ${className || ''}`} style={style}>
					{fontLoaded ? iconName : ''}
				</span>
			);
		}

		acc[iconName] = IconComponent;
		return acc;
	}, {});

	return iconComponents;
};

export default useIcon;
