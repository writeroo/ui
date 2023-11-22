import { twMerge } from "tailwind-merge";

export type ButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
> & {
    loading?: boolean;
    children: React.ReactNode;
    variant?:
    | "accent"
    | "secondary"
    | "hollow"
    | "opaque"
    | "danger"
    | "warning";
}

export default function Button(props: ButtonProps) {
    const {
        loading,
        children,
        variant = "accent",
        className,
        disabled,
        ...rest
    } = props;

    let displayClass = "";

    switch (variant) {
        case "accent":
            displayClass =
                "bg-accent-500 border border-accent-500 text-primary hover:bg-accent-600";
            break;
        case "secondary":
            displayClass =
                "bg-secondary border border-secondary text-primaryFont hover:bg-secondaryActive";
            break;
        case "hollow":
            displayClass = "bg-transparent border border-accent text-accent";
            break;
        case "opaque":
            displayClass =
                "bg-accent-400/10 border border-accent-400/10 text-accent-800 hover:bg-accent-400/20";
            break;
        case "danger":
            displayClass = "bg-red-500 border border-red-500 text-primary hover:bg-red-600";
            break;
        case "warning":
            displayClass =
                "bg-yellow-400 border border-yellow-400 text-primary hover:bg-yellow-500";
            break;
    }

    return (
        <button
            className={twMerge(
                `ripple flex items-center gap-2 font-extrabold justify-center rounded-xl py-2 px-4 transition-all`,
                displayClass,
                className,
                (loading || disabled) ? "grayscale" : ""
            )}
            disabled={loading || disabled}
            {...rest}
        >
            {loading ? (
                <i className="fas fa-spinner-third animate-spin " />
            ) : (
                children
            )}
        </button>
    );
}