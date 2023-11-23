import React from "react";
import { twMerge } from "tailwind-merge";

export type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    right?: React.ReactNode;
    left?: React.ReactNode;
    error?: string;
    label?: React.ReactNode;
}

export default function Input(
    props: InputProps
) {
    const { error, label, className, ...rest } = props;

    return (
        <div className="w-full">
            {label && <div className="text-sm mb-2 text-gray-500">{label}</div>}
            <div
                className="bg-secondary border border-secondaryActive rounded-xl overflow-hidden flex items-stretch"
            >
                {props.left && <div className="bg-secondaryActive border-r border-r-secondaryActive px-4 flex justify-center items-center">{props.left}</div>}
                <input
                    className={twMerge("w-full bg-transparent transition-all p-4 outline-0 focus:ring-2 ring-accent-500 ring-0 disabled:opacity-70")}
                    {...rest}
                />
                {props.right && <div className="bg-secondaryActive border-l border-l-secondaryActive px-4 flex justify-center items-center">{props.right}</div>}
            </div>
            {props.error && <div className="text-red-500 text-sm">{error}</div>}
        </div>
    );
}