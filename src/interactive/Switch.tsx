export type SwitchOption = {
    label: React.ReactNode;
    value: string | null | number;
}

export type SwitchProps = {
    value?: string | null | number;
    onChange?: (value: string | null) => void;
    options: SwitchOption[];
}

export default function Switch(props: SwitchProps) {

    const { value, onChange, options } = props;

    const valueIndex = options.findIndex(option => option.value === value);

    return (
        <div className="flex justify-between items-stretch gap-2 p-2 border border-secondaryActive rounded-lg relative bg-primary">
            {options.map((option, index) => (
                <button
                    type={"button"}
                    className="flex-1 p-6 z-10 ripple rounded-lg"
                    key={index}
                    onClick={() => onChange?.(`${option.value}`)}
                >
                    {option.label}
                </button>
            ))}
            <div
                className="bg-secondary rounded-lg absolute top-2 bottom-2 transition-all border border-secondaryActive"
                style={{
                    width: `calc(${100 / options.length}% - 1rem)`,
                    left: `calc(${valueIndex * 100 / options.length}% + 0.5rem)`,
                }}
            />
        </div>
    )
}