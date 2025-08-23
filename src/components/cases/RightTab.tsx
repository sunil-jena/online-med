import Image from "next/image";

export const RightTab = ({
    active,
    onClick,
    icon,
    label,
}: {
    active: boolean;
    onClick: () => void;
    icon: string;
    label: string;
}) => {
    return (
        <button
            onClick={onClick}
            className={[
                'inline-flex items-center gap-2 rounded-xl px-8 py-3 text-md',
                active ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:text-blue-900',
            ].join(' ')}
        >
            <Image src={icon} alt="" width={18} height={18} />
            {label}
        </button>
    );
}

