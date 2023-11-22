import { twMerge } from "tailwind-merge";

export type ActivityProps = {
    activityIndex: number;
    className?: string;
    children: React.ReactNode;
}

export default function Activity(props: ActivityProps) {

    const { activityIndex, className, children } = props;

    return (
        <div
            style={{ zIndex: 100 + activityIndex }}
            className={twMerge("w-screen-handler-screen h-screen w-screen fixed inset-y-0", className)}
        >
            {children}
        </div>
    )
}