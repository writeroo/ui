import { useEffect, useState } from "react";
import { StatusBar, Style } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
import { Theme } from "../types/themes";
import { Capacitor } from "@capacitor/core";

export const themeCommons = {
    font: "manrope",
    warning: "yellow",
};

export const Themes: Theme[] = [
    {
        name: "light",
        displayName: "Light",
        scheme: {
            ...themeCommons,
            primary: "white",
            primaryFont: "black",
            primaryLightfont: "#464646",
            secondary: "#e9e9e9",
            secondaryActive: "#dbdbdb",
            primaryOpaque: "rgba(255, 255, 255, 0.5)",
            primaryDarkOpaque: "rgba(255, 255, 255, 0.7)",
            lightOpaque: "rgba(0, 0, 0, 0.05)",
            opaque: "rgba(0, 0, 0, 0.2)",
            opaqueActive: "rgba(0, 0, 0, 0.3)",
        },
        lowHardware: {
            backdropFilter: "none",
            primaryOpaque: "rgba(255, 255, 255, 0.950)",
        },
        type: "light",
    },
    {
        name: "dark",
        displayName: "Dark",
        scheme: {
            ...themeCommons,
            primary: "#000",
            primaryFont: "#eeeeee",
            primaryLightfont: "#b8b8b8",
            secondary: "#181818",
            secondaryActive: "#292929",
            primaryOpaque: "rgba(0, 0, 0, 0.5)",
            primaryDarkOpaque: "rgba(0, 0, 0, 0.7)",
            lightOpaque: "rgba(255, 255, 255, 0.05)",
            opaque: "rgba(255, 255, 255, 0.200)",
            opaqueActive: "rgba(255, 255, 255, 0.300)",
        },
        lowHardware: {
            backdropFilter: "none",
            primaryOpaque: "rgba(8, 8, 8, 0.95)",
        },
        type: "dark",
    },
];

export const setTheme = (themeMain: Theme) => {

    const theme = {
        ...themeMain.scheme,
        ...themeCommons,
    };
    for (const property in theme) {
        const val = theme[property as keyof typeof theme];
        document.documentElement.style.setProperty("--kui-" + property, val);
    }

    document.documentElement.style.setProperty("--kui-theme-type", themeMain.type)

    if (Capacitor.isNativePlatform()) {
        StatusBar.setStyle({
            style: themeMain.type === "dark" ? Style.Dark : Style.Light,
        });
        NavigationBar.setColor({
            darkButtons: themeMain.type === "dark",
            color: theme.primary,
        });
    }
};

export const useThemeDetector = () => {
    const getCurrentTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
    const mqListener = (e: any) => {
        setIsDarkTheme(e.matches);
    };

    useEffect(() => {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        darkThemeMq.addListener(mqListener);
        return () => darkThemeMq.removeListener(mqListener);
    }, []);
    return isDarkTheme;
};
