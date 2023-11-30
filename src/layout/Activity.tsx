import { twMerge } from "tailwind-merge";
import { RouteTree } from "../providers/RouterProvider";
import { useEffect } from "react";

export type ActivityProps = {
    activityIndex: number;
    className?: string;
    routeTree: RouteTree[];
    setRouteTree: React.Dispatch<React.SetStateAction<RouteTree[]>>;
}

export default function Activity(props: ActivityProps) {

    const { activityIndex, className, routeTree, setRouteTree } = props;

    useEffect(() => {
        setRouteTree((prev) => [
            ...prev.slice(0, activityIndex),
            {
                ...prev[activityIndex],
                status: "ready",
            },
            ...prev.slice(activityIndex + 1),
        ]);
    }, []);

    return (
        <div
            style={{ zIndex: 100 + activityIndex }}
            className={twMerge("w-screen-handler-screen h-screen w-screen fixed inset-y-0", className)}
            data-route-index={activityIndex}
        >
            {routeTree[activityIndex].node}
        </div>
    )
}