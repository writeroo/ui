import { twMerge } from "tailwind-merge";

export type FallBackProps = {
    children?: React.ReactNode;
    loading?: boolean;
    className?: string;
}

export default function FallBack(props: FallBackProps) {

    const { children, loading, className } = props;

    return loading ? (
        <div
            className={twMerge(`__kui__fallback__block h-[28px]`, className)}
        />
    ) : <>{children}</>
}
