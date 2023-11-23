import Button from "../interactive/buttons/Button";

export type DrawerProps = {
    open: boolean;
    onClose: () => void;
    children?: React.ReactNode;
    title?: React.ReactNode;
}

export type WarningDrawerProps = {
    onConfirm?: () => void;
    onCancel: () => void;
    content: React.ReactNode;
} & Omit<DrawerProps, "children" | "onClose">

export default function Drawer(props: DrawerProps) {

    const { open, onClose, children, title } = props;

    return (
        <div className={`fixed flex flex-col z-50 inset-0 transition-all ${open ? "opacity-100 visible" : "opacity-0 invisible"} bg-primaryOpaque`}>
            <div
                className="flex-1"
                onClick={onClose}
            />
            <div className={`shrink-0 max-h-[90%] flex flex-col pb-[var(--safe-area-inset-bottom)] bg-secondary rounded-t-[30px] transition-all ${open ? "translate-y-0" : "translate-y-full"}`}>
                <div className="p-4 flex items-center justify-center shrink-0">
                    <div
                        className="w-20 h-1 bg-primaryLightfont rounded-lg"
                    />
                </div>
                {title && (
                    <h2 className="text-center font-extrabold text-xl shrink-0">
                        {title}
                    </h2>
                )}
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}

export function WarningDrawer(props: WarningDrawerProps) {

    const { onConfirm, onCancel, content, title, ...rest } = props;

    return (
        <Drawer
            {...rest}
            onClose={onCancel}
            title={<>
                <i className="fas fa-exclamation-triangle text-5xl text-yellow-500 mt-4 mb-2" />
                <div>
                    {title}
                </div>
            </>}
        >
            <div className="p-4 text-center">
                {content}
                <br />
                <br />
                {onConfirm && (
                    <Button
                        variant="warning"
                        className="w-full mb-2"
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                )}
                <Button
                    variant="secondary"
                    className="w-full"
                    onClick={onCancel}
                >
                    Cancel
                </Button>
            </div>
        </Drawer>
    )
}