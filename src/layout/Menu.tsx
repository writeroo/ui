import { useState } from "react";
import Drawer from "./Drawer";

export type MenuProps = {
    children?: React.ReactNode;
    menu: MenuOption[];
    content?: React.ReactNode;
    title?: React.ReactNode;
}

export type MenuOption = {
    label: React.ReactNode;
    icon?: string;
    onClick?: () => void;
    children?: MenuOption[];
    dangerous?: boolean;
}

export default function Menu(props: MenuProps) {

    const { children, menu, content, title } = props;

    const [show, setShow] = useState(false);

    return (
        <>
            <div
                onClick={() => setShow(true)}
                className="inline-block"
            >
                {children}
            </div>
            <Drawer
                title={title}
                open={show}
                onClose={() => setShow(false)}
            >
                {content}
                <div className="p-2 flex flex-col">
                    {menu.map((option, i) => (
                        <button
                            key={i}
                            className={`flex items-center gap-2 px-2 py-4 ripple ${option.dangerous ? "text-red-500" : ""}`}
                            onClick={() => {
                                option.onClick?.();
                                setShow(false);
                            }}
                        >
                            <i
                                className={`far fa-${option.icon} w-10`}
                            />
                            {option.label}
                        </button>
                    ))}
                </div>
            </Drawer>
        </>
    )
}