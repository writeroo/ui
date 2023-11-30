import { useEffect } from "react";
import { Themes, setTheme, useThemeDetector } from "../utils/themes";
import { Theme } from "../types/themes";

export type ThemeProviderProps = {
    children: React.ReactNode;
    accent?: {
        50: string;
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
        900: string;
    },
    theme?: Theme | null;
    onInitialThemeChange?: (theme: Theme) => void;
}

export default function ThemeProvider(props: ThemeProviderProps) {

    const { accent, onInitialThemeChange, children, theme } = props;
    const isDark = useThemeDetector();

    const setDefaultTheme = (updateStorage?: boolean) => {
        const theme = Themes.find((t) => t.name === (isDark ? "dark" : "light"))

        setTheme(theme || Themes[0]);
        updateStorage && onInitialThemeChange && onInitialThemeChange(theme || Themes[0]);
    };

    useEffect(() => {
        theme ? setTheme(theme) : setDefaultTheme(true);
    }, [theme]);

    useEffect(() => {

        if (accent)
            Object.keys(accent).forEach((key) => {
                document.documentElement.style.setProperty(`--kui-accent${key}`, accent[key]);
            });

        return () => {
            if (accent)
                Object.keys(accent).forEach((key) => {
                    document.documentElement.style.removeProperty(`--kui-accent${key}`);
                });
        }
    }, []);

    return <>{children}</>;
}