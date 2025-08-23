'use client';
import * as React from 'react';
import { Button } from '../ui/button';

type Props = {
    open: boolean;
    value: string;
    onClose: () => void;
    onSave: (v: string) => void;
    anchorClassName?: string; // parent should be relative
};

const OPTIONS = ['She/Her/Hers', 'He/Him/His', 'They/Them/Theirs'];

export default function PronounsPopover({ open, value, onClose, onSave }: Props) {
    const [local, setLocal] = React.useState(value);
    const panelRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => setLocal(value), [value]);

    React.useEffect(() => {
        if (!open) return;
        const handle = (e: MouseEvent) => {
            if (!panelRef.current) return;
            if (!panelRef.current.contains(e.target as Node)) onClose();
        };
        document.addEventListener('mousedown', handle);
        return () => document.removeEventListener('mousedown', handle);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            ref={panelRef}
            className="absolute right-0 top-0 mt-2 w-[340px] rounded-2xl border border-gray-200 bg-white shadow-[0_22px_60px_rgba(30,58,138,0.28)]  z-50"
        >

            <div className="space-y-2 p-4">
                <h4 className="text-sm font-medium text-gray-500 mb-3">Edit Preferred Pronouns</h4>
                {OPTIONS.map((opt) => (
                    <label
                        key={opt}
                        className="flex items-center gap-4 cursor-pointer"
                    >
                        <input
                            type="radio"
                            name="pronouns"
                            className="accent-blue-600 h-5 w-5"
                            checked={local === opt}
                            onChange={() => setLocal(opt)}
                        />
                        <span className={`text-sm leading-6 ${local === opt ? 'text-blue-700 font-medium' : 'text-gray-700'}`}>{opt}</span>
                    </label>
                ))}
            </div>

            <div className="mt-4  p-4 flex justify-end gap-2 border-t border-1">
                <Button
                    variant='outline'
                    onClick={onClose}
                    className="rounded-xl px-3 py-2 text-sm border border-gray-200 bg-white hover:bg-gray-50 text-gray-700"
                >
                    Cancel
                </Button>
                <Button variant="gradient" size="sm"
                    className='rounded-xl px-4 py-2 text-sm '
                    onClick={() => {
                        onSave(local);
                        onClose();
                    }}
                >
                    Save
                </Button>
            </div>
        </div>
    );
}
