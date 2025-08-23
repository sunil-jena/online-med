"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AnimatePresence, motion, type Transition } from "framer-motion";
import Spinner from "./Spinner";
import BackNext from "./BackNext";
import OtpInput from "./OtpInput";
import { useRouter } from "next/navigation";

export type Step = "email" | "otp";

/** Smooth spring & fade transitions (properly typed) */
const ENTER_SPRING: Transition = { type: "spring", stiffness: 260, damping: 22, mass: 0.9 };
const EXIT_FADE: Transition = { duration: 0.18, ease: [0.2, 0.0, 0.0, 1] };

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

    useEffect(() => {
        if (cooldown <= 0) return;
        const id = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
        return () => clearInterval(id);
    }, [cooldown]);

    const emailForm = useFormik({
        initialValues: { email: "" },
        validationSchema: Yup.object({
            email: Yup.string().trim().email("Enter a valid email address.").required("Email is required."),
        }),
        onSubmit: async (values, helpers) => {
            helpers.setSubmitting(true);
            onSubmitVisuals?.();
            await new Promise((r) => setTimeout(r, 500)); // small pause for nicer feel

            setEmail(values.email.trim());
            setCooldown(30); // UI copy
            setStep("otp");
            onStepChange?.("otp");
            setSheenKey((k) => k + 1);
            helpers.setSubmitting(false);
        },
    });

    const otpForm = useFormik({
        enableReinitialize: true,
        initialValues: { code: "" },
        validationSchema: Yup.object({
            code: Yup.string().matches(/^\d{4}$/, "Enter the 4-digit code.").required("Enter the 4-digit code."),
        }),
        onSubmit: async (_values, helpers) => {
            helpers.setSubmitting(true);
            await new Promise((r) => setTimeout(r, 450)); // smooth verify pause
            // Accept whatever the user typed and go to dashboard
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
        <div className="max-w-2xl">
            <AnimatePresence mode="popLayout" initial={false}>
                {step === "email" && (
                    <motion.div
                        key="email-block"
                        layout
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0, transition: ENTER_SPRING }}
                        exit={{ opacity: 0, y: -8, transition: EXIT_FADE }}
                    >
                        <label className="label" htmlFor="email">
                            Email
                        </label>

                        <motion.div layoutId="emailHeader" className="relative mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className={`input pr-11 ${emailForm.touched.email && emailForm.errors.email ? "input-error" : ""
                                    } ${emailForm.isSubmitting ? "placeholder-brand" : ""}`}
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
                        </motion.div>

                        {emailForm.touched.email && emailForm.errors.email && (
                            <div role="alert" className="mt-3 text-[#dc2626] shake">
                                {emailForm.errors.email}
                            </div>
                        )}

                        <BackNext
                            onBack={() => router.push("/")}
                            onNext={() => emailForm.submitForm()}
                            nextDisabled={!emailForm.isValid || emailForm.isSubmitting}
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence initial={false} mode="popLayout">
                {step === "otp" && (
                    <motion.div
                        key="otp-card"
                        layout
                        className="mt-2 rounded-xl border border-(--color-line) bg-white overflow-hidden shadow-[var(--shadow-card)]"
                        initial={{ opacity: 0, y: 16, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1, transition: ENTER_SPRING }}
                        exit={{ opacity: 0, y: -8, transition: EXIT_FADE }}
                    >
                        <motion.div
                            layoutId="emailHeader"
                            className="flex items-center justify-between px-4 py-3 bg-(--color-brand-tint)"
                        >
                            <div className="flex items-center gap-2">
                                <div className="label">Email</div>
                                <span key={sheenKey} className="font-medium brand-sheen-rtl">
                                    {email}
                                </span>
                            </div>
                            <button type="button" className="dotted-link text-sm" onClick={backToEmail}>
                                Change
                            </button>
                        </motion.div>

                        <div className="border-t border-(--color-line) px-4 py-5">
                            <div className="mb-2 label">Enter verification code</div>
                            <div className="label">
                                Enter the code sent to <span className="font-medium text-(--color-ink)">{email}</span> to use your
                                saved information.
                            </div>

                            <div className="mt-4">
                                <OtpInput
                                    value={otpForm.values.code}
                                    onChange={(v) => otpForm.setFieldValue("code", v)}
                                    error={!!otpForm.errors.code && otpForm.touched.code}
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

                            <BackNext
                                onBack={backToEmail}
                                onNext={() => otpForm.submitForm()}
                                nextDisabled={!otpForm.isValid || otpForm.isSubmitting}
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
