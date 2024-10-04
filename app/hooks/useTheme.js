import { useEffect, useState } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState(
        typeof window !== 'undefined' ? localStorage.theme || 'light' : 'light'
    );

    useEffect(() => {
        const root = window.document.documentElement;

        // Remove previous theme
        root.classList.remove(theme === 'light' ? 'dark' : 'light');

        // Add current theme
        root.classList.add(theme);

        // Store theme in localStorage
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return { theme, toggleTheme };
};
