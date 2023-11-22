import { twMerge } from "tailwind-merge";
import PageHeader, { PageHeaderProps } from "./PrimaryPageHeader";

export type PageProps = {
    children: React.ReactNode;
    type?: "sticky" | "fixed";
    headerProps: PageHeaderProps;
    onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
    className?: string;
    containerClassName?: string;
};

export default function Page(props: PageProps) {
    const {
        className,
        children,
        headerProps,
        containerClassName,
        type = "sticky",
        onScroll,
    } = props;
    return (
        <div
            className={twMerge(
                `bg-primary text-primaryFont justify-between h-screen overflow-auto flex flex-col pb-[var(--safe-area-inset-bottom)]`,
                className
            )}
            onScroll={onScroll}
        >
            <PageHeader
                {...headerProps}
                className={twMerge(type, headerProps.className)}
            />
            <div className={twMerge("flex-1", containerClassName)}>
                {children}
            </div>
        </div>
    );
}
