"use client";

import { useEffect, useState, useRef } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Spinner from "./Spinner";
import BackNext from "./BackNext";
import OtpInput from "./OtpInput";
import { useRouter } from "next/navigation";

export type Step = "email" | "transitioning" | "otp";

function HeaderBar({
    email,
    onChange,
    animate = false,
    sheenKey,
    onAnimationEnd,
    step = 'email'
}: {
    email: string;
    onChange: () => void;
    animate?: boolean;
    sheenKey?: number;
    onAnimationEnd?: React.AnimationEventHandler<HTMLDivElement>;
    step?: string
}) {
    return (
        <div
            className={[
                `${step === 'otp' ? 'rounded-t-xl' : 'rounded-xl'}  border bg-white overflow-hidden shadow-[var(--shadow-card)]`,
                animate ? "animate-slide-up-visible animation-delay-150 animation-fill-mode-both motion-smooth" : "",
            ].join(" ")}
            style={{ borderColor: "var(--color-line)" }}
            onAnimationEnd={onAnimationEnd}
        >
            <div
                className="flex items-center justify-between px-4 py-3 border-b"
                style={{ background: "var(--color-rail)", borderColor: "var(--color-line)" }}
            >
                <div className="flex items-center gap-2">
                    <div className="label">Email</div>
                    <span key={sheenKey} className="font-medium text-(--color-brand)">
                        {email}
                    </span>
                </div>
                <button type="button" className="dotted-link text-sm" onClick={onChange}>
                    Change
                </button>
            </div>
        </div>
    );
}


export default function Form({
    onStepChange,
    onSubmitVisuals,
}: {
    onStepChange?: (s: Step) => void;
    onSubmitVisuals?: () => void;
}) {
    const router = useRouter();

    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [cooldown, setCooldown] = useState(0);
    const [sheenKey, setSheenKey] = useState(0);

    const frameRef = useRef<HTMLDivElement | null>(null);
    const [lockedHeight, setLockedHeight] = useState<number | null>(null);
    const lockFrameHeight = () => {
        const el = frameRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        setLockedHeight(rect.height);
    };
    const unlockFrameHeight = () => setLockedHeight(null);

    useEffect(() => {
        if (cooldown <= 0) return;
        const id = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
        return () => clearInterval(id);
    }, [cooldown]);

    const emailForm = useFormik({
        initialValues: { email: "" },
        validateOnMount: true,
        validationSchema: Yup.object({
            email: Yup.string().trim().email("Enter a valid email address.").required("Email is required."),
        }),
        onSubmit: async (values, helpers) => {
            helpers.setSubmitting(true);
            onSubmitVisuals?.();
            const trimmed = values.email.trim();
            setEmail(trimmed);
            setCooldown(30);
            setSheenKey((k) => k + 1);
            helpers.setSubmitting(false);
            lockFrameHeight();
            setStep("transitioning");
            onStepChange?.("transitioning");
        },
    });

    const otpForm = useFormik({
        enableReinitialize: true,
        validateOnMount: true,
        initialValues: { code: "" },
        validationSchema: Yup.object({
            code: Yup.string().matches(/^\d{6}$/, "Enter the 6-digit code.").required("Enter the 6-digit code."),
        }),
        onSubmit: async (_values, helpers) => {
            helpers.setSubmitting(true);
            router.push("/dashboard");
            helpers.setSubmitting(false);
        },
    });

    const resend = () => {
        if (cooldown > 0) return;
        setCooldown(30);
    };

    const backToEmail = () => {
        setStep("email");
        onStepChange?.("email");
    };

    return (
        <div
            className="max-w-2xl"
            ref={frameRef}
            style={lockedHeight != null ? { height: lockedHeight, transition: "height 240ms ease" } : undefined}
        >
            {step === "email" && (
                <div className="animate-fade-in" key="email-block">
                    <div className="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            className={[
                                "input pr-11",
                                emailForm.touched.email && emailForm.errors.email ? "input-error" : "",
                                emailForm.isSubmitting ? "placeholder-brand" : "",
                            ].join(" ")}
                            value={emailForm.values.email}
                            onChange={emailForm.handleChange}
                            onBlur={emailForm.handleBlur}
                            onKeyDown={(e) => e.key === "Enter" && emailForm.submitForm()}
                            inputMode="email"
                            autoFocus
                        />
                        {emailForm.isSubmitting && (
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-(--color-brand)">
                                <Spinner />
                            </span>
                        )}
                        {emailForm.isSubmitting && <span className="input-halo animate-inputGlow" aria-hidden />}
                    </div>

                    {emailForm.touched.email && emailForm.errors.email && (
                        <div role="alert" className="mt-3 text-[#dc2626] animate-shake">
                            {emailForm.errors.email}
                        </div>
                    )}

                    <BackNext
                        onBack={() => router.push("/")}
                        onNext={() => emailForm.submitForm()}
                        nextDisabled={!emailForm.isValid || emailForm.isSubmitting}
                    />
                </div>
            )}

            {step === "transitioning" && (
                <div className="relative" key={`transition-${sheenKey}`}>
                    <HeaderBar
                        email={email}
                        sheenKey={sheenKey}
                        animate
                        onChange={backToEmail}
                        step={'transitioning'}
                        onAnimationEnd={(e) => {
                            if (e.currentTarget !== e.target) return;
                            if (step !== "transitioning") return;
                            setStep("otp");
                            onStepChange?.("otp");
                            // allow next layout to settle, then unlock height
                            requestAnimationFrame(() => unlockFrameHeight());
                        }}
                    />
                </div>
            )}

            {step === "otp" && (
                <>
                    <HeaderBar email={email} onChange={backToEmail} sheenKey={sheenKey} step={step} />
                    <div
                        key="otp-card"
                        className="
               rounded-b-xl border bg-white overflow-hidden shadow-[var(--shadow-card)]
              animate-slide-down animation-delay-150 animation-fill-mode-both motion-smooth
            "
                        style={{ borderColor: "var(--color-line)" }}
                    >
                        <div className="px-4 py-5">
                            <div className="mb-2 label">Enter verification code</div>
                            <div className="label">
                                Enter the code sent to <span className="font-medium text-(--color-ink)">{email}</span> to use your saved information.
                            </div>

                            <div className="mt-4">
                                <OtpInput
                                    value={otpForm.values.code}
                                    onChange={(v: string) => otpForm.setFieldValue("code", v)}
                                    error={!!otpForm.errors.code && otpForm.touched.code}
                                    length={4}
                                />
                                <input type="hidden" name="code" value={otpForm.values.code} />
                            </div>

                            <div className="mt-4 text-sm text-(--color-ink-muted)">
                                {cooldown === 0 ? (
                                    <>
                                        Didn’t receive a code?{" "}
                                        <button className="link" onClick={resend}>
                                            Send again
                                        </button>
                                    </>
                                ) : (
                                    <span className="cursor-pointer">Send again in 00:{String(cooldown).padStart(2, "0")}</span>
                                )}
                            </div>

                            {otpForm.isSubmitting && (
                                <div className="mt-3 inline-flex items-center gap-2 text-(--color-ink-muted)">
                                    <Spinner /> Verifying…
                                </div>
                            )}

                        </div>
                    </div>
                    <BackNext
                        onBack={backToEmail}
                        onNext={() => otpForm.submitForm()}
                        nextDisabled={!otpForm.isValid || otpForm.isSubmitting}
                    />
                </>
            )}
        </div>
    );
}
