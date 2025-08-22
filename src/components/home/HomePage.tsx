"use client";

import { useEffect, useState } from "react";
import Rail from "./components/Rail";
import StepHeader from "./components/StepHeader";
import SubmitVeil from "./components/SubmitVeil";
import Form, { Step } from "./components/Form";

const HomePage = () => {
    const [step, setStep] = useState<Step>("email");
    const [sweepKey, setSweepKey] = useState(0);

    const triggerSweep = () => setSweepKey((k) => k + 1);
    useEffect(() => triggerSweep(), []);

    return (
        <div className="min-h-screen bg-(--color-rail)">
            <div className="mx-auto max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-[354px_1fr]">
                    <aside className="hidden md:block min-h-screen px-8 py-8">
                        <Rail />
                    </aside>

                    <main className="relative m-3 overflow-hidden rounded-[2rem] bg-white p-6 md:p-16 md:min-h-screen flex">
                        <SubmitVeil triggerKey={sweepKey} />

                        <div className="w-full max-w-3xl mx-auto flex flex-col md:justify-center">
                            <div className="mx-0">
                                <StepHeader step={step} />
                            </div>

                            <div className="mt-6">
                                <Form onStepChange={setStep} onSubmitVisuals={triggerSweep} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
