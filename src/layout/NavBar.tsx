import { Link } from "raviger";
import { usePath } from "raviger";
import { twMerge } from "tailwind-merge";

export type NavBarButton = {
    name: string;
    href: string;
} & (NavBarImageButton | NavBarIconButton);

export type NavBarImageButton = {
    type: "image";
    image: string;
}

export type NavBarIconButton = {
    type: "icon";
    icon: string;
}

export type NavBarProps = {
    buttons: NavBarButton[];
    className?: string;
}

export default function NavBar(props: NavBarProps) {

    const { buttons, className } = props;
    const url = usePath()

    return (
        <nav className={twMerge("fixed bottom-0 inset-x-0 z-20 bg-primaryDarkOpaque backdrop-blur-xl pb-[var(--safe-area-inset-bottom)] flex items-center justify-center gap-1", className)}>
            {buttons.map((navItem, i) => (
                <Link
                    key={i}
                    href={navItem.href}
                    className="flex-1 flex items-center justify-center h-full py-3 ripple"
                >
                    {navItem.type === "image" ?
                        <img
                            src={navItem.image}
                            alt={navItem.name}
                            className={`w-10 h-10 ${url === navItem.href ? "" : "grayscale"
                                }`}
                        />
                        : (
                            <>
                                <i
                                    className={`fa${url === navItem.href
                                        ? "s text-accent-500"
                                        : "r"
                                        } fa-${navItem.icon} text-xl`}
                                />
                                <i
                                    className={`fas fa-${navItem.icon} opacity-0 w-0 h-0 overflow-hidden`}
                                />
                            </>
                        )}
                </Link>
            ))}
        </nav>
    )
}