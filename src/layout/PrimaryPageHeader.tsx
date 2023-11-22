import { StatusBar, Style } from "@capacitor/status-bar";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Capacitor } from "@capacitor/core";

export type PageHeaderProps = {
    title: React.ReactNode;
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
    className?: string;
    transparent?: boolean;
    primaryBg?: boolean;
    alignment?: "left" | "center";
    onBackPress?: () => void;
};

export default function PageHeader(props: PageHeaderProps) {

    const {
        title,
        leftButton,
        rightButton,
        className,
        transparent,
        primaryBg,
        onBackPress,
    } = props;

    useEffect(() => {
        if (Capacitor.isNativePlatform()) {
            if (transparent && !primaryBg) {
                StatusBar.setStyle({ style: Style.Dark });
            } else {
                StatusBar.setStyle({
                    style: document.documentElement.style.getPropertyValue("--kui-theme-type") !== "dark"
                        ? Style.Dark
                        : Style.Light,
                });
            }
        }
    }, [transparent]);

    useEffect(() => {
        return () => {
            if (Capacitor.isNativePlatform()) {
                StatusBar.setStyle({
                    style: document.documentElement.style.getPropertyValue("--kui-theme-type") !== "dark"
                        ? Style.Dark
                        : Style.Light,
                });
            }
        };
    }, []);

    return (
        <div
            className={twMerge(
                `flex items-center justify-between p-4 text-lg pt-[calc(var(--status-bar-height,0)+1rem)] inset-x-0 top-0 z-30 transition-all ${!primaryBg &&
                (transparent
                    ? "text-white bg-gradient-to-b from-black/50 to-transparent"
                    : "bg-primaryOpaque backdrop-blur-xl")
                } `,
                className
            )}
        >
            <div className="w-20">
                {leftButton || (
                    <button
                        onClick={() => {
                            onBackPress ? onBackPress() : window.history.back();
                        }}
                        className="ripple flex items-center justify-center w-8 h-8 rounded"
                    >
                        <i className="far fa-arrow-left" />
                    </button>
                )}
            </div>
            <div className="font-extrabold text-ellipsis  overflow-hidden flex-nowrap  whitespace-nowrap ">
                {title}
            </div>
            <div className="w-20 flex items-center justify-end">
                {rightButton}
            </div>
        </div>
    );
}

export type PrimaryPageHeaderProps = {
    title: React.ReactNode;
    leftButton?: React.ReactNode;
    rightButton?: React.ReactNode;
    className?: string;
};

export function PrimaryPageHeader(props: PrimaryPageHeaderProps) {
    const { title, rightButton, className, leftButton } = props;

    return (
        <div
            className={twMerge(
                `flex items-center gap-4 justify-between p-4 text-xl pt-[calc(var(--status-bar-height,0)+1rem)] inset-x-0 top-0 z-30 transition-all bg-primaryOpaque backdrop-blur-xl sticky`,
                className
            )}
        >
            {leftButton}
            <div className="flex-1 font-extrabold text-2xl">{title}</div>
            <div className="flex items-center justify-end">{rightButton}</div>
        </div>
    );
}
