import { useEffect, useRef } from "react";
import NavBar, { NavBarButton } from "./NavBar";

export type Path = `/${string}`

export type BaseRoute = NavBarButton & {
    element: React.ReactNode;
    homeRoute?: boolean;
}

export type AppContainerProps = {
    exclusivePaths: Path[];
    currentPath: Path;
    baseRoutes: BaseRoute[];
    children: React.ReactNode;
    routeResult: React.ReactNode;
}

export default function AppContainer(props: AppContainerProps) {

    const { exclusivePaths, currentPath, baseRoutes, children, routeResult } = props;
    const mainRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (mainRef.current && baseRoutes.map(route => route.href).includes(currentPath)) {
            mainRef.current.scrollTo({
                left: (baseRoutes.findIndex(baseRoutes => baseRoutes.href === currentPath)) * window.innerWidth,
            });
        }
    }, [currentPath]);

    useEffect(() => {

        const homeRouteIndex = baseRoutes.findIndex(baseRoutes => baseRoutes.homeRoute);

        if (baseRoutes[homeRouteIndex].href !== currentPath) return;
        mainRef.current?.scrollTo({
            left: homeRouteIndex * window.innerWidth,
        });
    }, []);

    return (
        <div className="bg-primary text-primaryFont">
            {exclusivePaths.includes(currentPath) ? (
                routeResult
            ) : (
                <>
                    <div
                        className="overflow-hidden h-screen w-screen flex items-start snap-x snap-mandatory"
                        ref={mainRef}
                    >
                        {baseRoutes.map((route, index) => (
                            <div
                                key={index}
                                className="w-screen h-screen shrink-0 snap-start overflow-auto"
                            >
                                {route.element}
                            </div>
                        ))}
                    </div>
                    {children}
                    <NavBar
                        buttons={baseRoutes}
                    />
                </>
            )}
        </div>
    )
}