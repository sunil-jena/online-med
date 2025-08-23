'use client';
import * as React from 'react';
import Image from 'next/image';
import { Button } from '../ui/button';

export default function DotsMenu({
    open,
    onClose,
    patientName,
}: {
    open: boolean;
    onClose: () => void;
    patientName: string;
}) {
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!open) return;
        const handle = (e: MouseEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) onClose();
        };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            ref={ref}
            className="absolute right-0 top-full mt-2 w-[220px] rounded-2xl border border-gray-100 bg-white shadow-[0_22px_60px_rgba(30,58,138,0.28)] p-3 z-50"
        >
            <div className='flex items-center gap-1'>
                <Image src="/Prohibit.svg" alt="" width={24} height={24} className='w-5 h-5' />
                <span className='text-blue-900 text-sm font-medium'>
                    Block {patientName}
                </span>

            </div>
        </div>
    );
}
