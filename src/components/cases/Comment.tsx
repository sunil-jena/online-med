import Image from "next/image";

export const Comment = ({
    avatar,
    initials,
    name,
    badge,
    time,
    text,
}: {
    avatar?: string;
    initials?: string;
    name: string;
    badge?: string;
    time: string;
    text: string;
    color?: 'blue' | 'purple';
}) => {
    return (
        <div className="flex items-start gap-3">
            {avatar ? (
                <Image src={avatar} alt={name} width={36} height={36} className="rounded-xl object-cover" />
            ) : (
                <div className="h-9 w-9 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
                    {initials}
                </div>
            )}

            <div className="flex-1">
                <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium text-gray-900">{name}</span>
                    {badge && <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-blue-900 text-white">{badge}</span>}
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{time}</span>
                </div>
                <div className="mt-2 rounded-2xl bg-blue-50/60 text-blue-900 p-3 text-sm leading-6">{text}</div>
            </div>
        </div>
    );
}
