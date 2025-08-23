"use client";

import Image from "next/image";

export default function BackNext({
    onBack,
    onNext,
    nextDisabled
}: {
    onBack?: () => void;
    onNext?: () => void;
    nextDisabled?: boolean;
}) {
    return (
        <div className="actions">
            <button type="button" className="link flex items-center cursor-pointer" onClick={onBack}>
                <Image src="/CaretLeft.svg" alt="Button" width={20} height={20} priority />
                Back</button>
            <button type="button" className="btn min-w-32" disabled={!!nextDisabled} onClick={onNext}>
                Next
            </button>
        </div>
    );
}
