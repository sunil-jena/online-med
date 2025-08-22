"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = {
    id: number;
    name: string;
    role: string;
    location: string;
    avatar?: string;
    rating: number;
    timeAgo: string;
    text: string;
};

const testimonials: Testimonial[] = [
    {
        id: 1,
        name: "Nick P.",
        role: "Student",
        location: "New York",
        avatar: "NP",
        rating: 5,
        timeAgo: "1 week ago",
        text:
            "Woke up with severe stomach flu and needed documentation for work. The doctor was thorough, professional, and I had my note in minutes.",
    },
    {
        id: 2,
        name: "Sarah M.",
        role: "Teacher",
        location: "California",
        avatar: "SM",
        rating: 5,
        timeAgo: "3 days ago",
        text:
            "Quick and professional service. Got my work note fast when I was too sick to go to the office. Highly recommend!",
    },
    {
        id: 3,
        name: "Mike R.",
        role: "Developer",
        location: "Texas",
        avatar: "MR",
        rating: 5,
        timeAgo: "5 days ago",
        text:
            "Super convenient and legitimate. The whole process was smooth and my employer accepted the note without any issues.",
    },
];

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

const getInitials = (name: string, fallback?: string) => {
    if (fallback && fallback.trim()) return fallback.trim().slice(0, 2).toUpperCase();
    const parts = name.split(" ").filter(Boolean);
    const first = parts[0]?.[0] ?? "";
    const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + last).toUpperCase() || "•";
};

const Star = () => (
    <Image src="/Vector.svg" alt="Star" width={20} height={20} priority />
);

const Rail = () => {
    const [current, setCurrent] = useState(0);

    // Auto-rotate only after mount (no SSR difference)
    useEffect(() => {
        const id = setInterval(() => {
            setCurrent((p) => (p + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(id);
    }, []);

    const t = testimonials[current];
    const rating = clamp(t.rating, 0, 5);

    return (
        <div className="flex h-full flex-col justify-between">
            <div>
                <div className="text-xl font-semibold">OnlineMed</div>

                <div className="mt-6 inline-flex items-center gap-2 text-sm">
                    <Image src="/approved.svg" alt="Approved" width={24} height={24} priority />
                    <span className="font-medium">Money Back Guarantee</span>
                </div>

                <h2 className="mt-6 text-2xl font-bold leading-snug">
                    Your <span className="text-(--color-brand)">Work</span> Note
                    <br /> is Minutes Away
                </h2>

                <p className="mt-3 text-sm">
                    Note: Due to capacity we are currently only able to provide a limited number of notes per day.
                    To see if you qualify please fill out the following short survey!
                </p>
            </div>

            <div className="flex flex-col">
                <div className="rounded-xl bg-white p-4 shadow-[var(--shadow-card)]">
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                            <div className="flex size-10 items-center justify-center rounded-full bg-(--color-rail) font-semibold">
                                {getInitials(t.name, t.avatar)}
                            </div>
                            <div className="leading-tight">
                                <div className="text-sm font-semibold">{t.name}</div>
                                <div className="text-xs text-(--color-ink-muted)">
                                    {t.role} • {t.location}
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-(--color-ink-muted) whitespace-nowrap">{t.timeAgo}</div>
                    </div>

                    <div className="mt-2 flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} />
                        ))}
                    </div>

                    <p className="mt-2 text-sm text-(--color-ink-muted)">{t.text}</p>
                </div>

                <div className="mt-3 flex items-center gap-2">
                    {testimonials.map((_, i) => {
                        const active = i === current;
                        return (
                            // No dynamic/random attributes; deterministic classes only
                            <button
                                key={i}
                                onClick={() => setCurrent(i)}
                                aria-label={`Show testimonial ${i + 1}`}
                                aria-pressed={active}
                                className={`h-2.5 w-2.5 rounded-full transition-all ${active ? "bg-blue-600 scale-110" : "bg-blue-200 hover:bg-blue-300"
                                    }`}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Rail;
