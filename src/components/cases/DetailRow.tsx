import Image from "next/image";

export const DetailRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="flex items-start gap-3">
                <div className="shrink-0 rounded-xl bg-gray-50 border border-gray-200 w-10 h-10 flex items-center justify-center">
                    <Image src={icon} alt="" width={18} height={18} />
                </div>
                <div>
                    <p className="text-gray-500 text-sm">{label}</p>
                    <p className="text-gray-900 font-medium">{value}</p>
                </div>
            </div>
        </div>
    );
}
