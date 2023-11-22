import { useEffect, useRef } from "react";
import { Ripple } from "../utils/ripple";
import "../css/ripple.css";

export type RippleProviderProps = {
    children: React.ReactNode;
}

export default function RippleProvider(props: RippleProviderProps) {

    const { children } = props;

    const handleRipple = (e: any) => {
        Ripple(e);
    };

    const rippleProviderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        rippleProviderRef.current?.addEventListener("click", handleRipple);
        return () => {
            rippleProviderRef.current?.removeEventListener("click", handleRipple);
        };
    }, [rippleProviderRef.current]);

    return (
        <div ref={rippleProviderRef}>
            {children}
        </div>
    )
}
