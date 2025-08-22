"use client";

import React, { useEffect, useRef } from "react";

type Props = {
    length?: number;
    value: string;
    onChange: (v: string) => void;
    error?: boolean;
};

export default function OtpInput({ length = 4, value, onChange, error }: Props) {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    useEffect(() => {
        inputs.current[0]?.focus();
    }, []);

    const assignRef = (i: number) => (el: HTMLInputElement | null): void => {
        inputs.current[i] = el;
    };

    const setChar = (i: number, ch: string) => {
        const arr = value.split("");
        arr[i] = ch;
        onChange(arr.join(""));
    };

    const onCell = (i: number, v: string) => {
        const ch = v.replace(/\D/g, "").slice(-1);
        if (!ch) return;
        setChar(i, ch);
        inputs.current[i + 1]?.focus();
    };

    const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            if (value[i]) {
                setChar(i, "");
                return;
            }
            inputs.current[i - 1]?.focus();
        }
        if (e.key === "ArrowLeft") inputs.current[i - 1]?.focus();
        if (e.key === "ArrowRight") inputs.current[i + 1]?.focus();
    };

    const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const d = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
        if (!d) return;
        e.preventDefault();
        const merged = (value + d).slice(0, length).padEnd(length, "");
        onChange(merged);
        const last = Math.min(d.length, length) - 1;
        if (last >= 0) inputs.current[last]?.focus();
    };

    return (
        <div className="flex gap-3">
            {Array.from({ length }).map((_, i) => (
                <input
                    key={i}
                    ref={assignRef(i)}
                    value={value[i] ?? ""}
                    onChange={(e) => onCell(i, e.target.value)}
                    onKeyDown={(e) => onKey(i, e)}
                    onPaste={onPaste}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    aria-label={`Digit ${i + 1}`}
                    className={`size-12 rounded-xl border ${error ? "border-[#f87171]" : "border-(--color-line)"
                        } text-center text-lg font-medium outline-none transition-[box-shadow,border-color] focus:border-(--color-ring) focus:shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-ring)_15%,transparent)]`}
                />
            ))}
        </div>
    );
}
