import { Routes, usePath, useRoutes } from "raviger";
import AppContainer, { AppContainerProps } from "../layout/AppContainer";
import { RawPage } from "../layout/Page";
import React, { useEffect, useState } from "react";
import Activity from "../layout/Activity";

export type RouterProps = {
    routes: Routes<string>
    notFound?: React.ReactNode,
    routeTree: RouteTree[],
    setRouteTree: React.Dispatch<React.SetStateAction<RouteTree[]>>,
} & Omit<AppContainerProps, "currentPath" | "children" | "routeResult">

export type RouteTree = {
    node: React.ReactNode;
    path: string;
    status?: "ready" | "destroying";
};

export default function Router(props: RouterProps) {
    const path = usePath();
    const { routes, exclusivePaths, baseRoutes, notFound, setRouteTree, routeTree } = props;
    const routeResult = useRoutes(routes) || notFound || <RawPage>Not Found</RawPage>;
    const [direction, setDirection] = useState<"backward" | "forward" | null>(
        null
    );

    const popstateListener = (e: PopStateEvent) => {
        if (e.state === undefined) {
            setDirection("backward");
        } else if (e.state === null) {
            setDirection("forward");
        }
    };

    useEffect(() => {
        window.addEventListener("popstate", popstateListener);
        if (
            !baseRoutes.map(route => route.href).includes(path as string) &&
            !exclusivePaths.includes(path as `/${string}`)
        ) {
            setRouteTree([
                ...routeTree,
                {
                    node: routeResult,
                    path: path as string,
                },
            ]);
        }
        return () => {
            window.removeEventListener("popstate", popstateListener);
        };
    }, []);

    useEffect(() => {
        if (!direction) return;
        const newPath = path;
        const lastPath = routeTree[routeTree.length - 1]?.path;
        if (
            direction === "backward" &&
            !baseRoutes.map(route => route.href).includes(lastPath) &&
            !exclusivePaths.includes(lastPath as `/${string}`)
        ) {
            setRouteTree([
                ...routeTree.slice(0, -1),
                {
                    ...routeTree[routeTree.length - 1],
                    status: "destroying",
                },
            ]);
        } else if (
            direction === "forward" &&
            !baseRoutes.map(route => route.href).includes(newPath as string) &&
            !exclusivePaths.includes(newPath as `/${string}`)
        ) {
            setRouteTree([
                ...routeTree,
                {
                    node: routeResult,
                    path: path as string,
                },
            ]);
        }
        setDirection(null);
    }, [direction]);

    useEffect(() => {
        routeTree.forEach((route, i) => {
            if (route.status === "destroying") {
                const el = document.querySelector(`[data-route-index="${i}"]`);
                if (el) {
                    el.classList.remove(
                        "__kui__screen__handler__screen__ready"
                    );
                }
                setTimeout(() => {
                    setRouteTree((prev) =>
                        prev.filter((_, index) => index !== i)
                    );
                }, 150);
            } else if (route.status === "ready") {
                const el = document.querySelector(`[data-route-index="${i}"]`);
                if (el) {
                    el.classList.add("__kui__screen__handler__screen__ready");
                }
            }
        });
        console.log(routeTree);
    }, [routeTree]);

    return (
        <>
            <AppContainer
                exclusivePaths={exclusivePaths}
                routeResult={routeResult}
                baseRoutes={baseRoutes}
                currentPath={path || ("/" as any)}
            >
                {routeTree.map((_, i) => (
                    <Activity
                        key={i}
                        activityIndex={i}
                        routeTree={routeTree}
                        setRouteTree={setRouteTree}
                    />
                ))}
            </AppContainer>
        </>
    );
}